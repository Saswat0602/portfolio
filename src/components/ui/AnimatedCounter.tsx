"use client";

import { useEffect, useRef, useState } from "react";

export interface AnimatedCounterProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

function parseValue(value: number | string, propPrefix?: string, propSuffix?: string) {
  let targetNum = 0;
  let prefix = propPrefix || "";
  let suffix = propSuffix || "";

  if (typeof value === "number") {
    targetNum = value;
  } else {
    const raw = String(value).trim();
    if (raw.startsWith("-") && !prefix) {
      prefix = "-";
    } else if (raw.startsWith("+") && !prefix) {
      prefix = "+";
    }
    const match = raw.match(/-?([0-9]+(?:\.[0-9]+)?)/);
    if (match) {
      targetNum = parseFloat(match[1]);
      if (!suffix) {
        const afterMatch = raw.slice(match.index! + match[0].length).trim();
        if (afterMatch) suffix = afterMatch;
      }
    }
  }

  const isDecimal = targetNum % 1 !== 0;
  return { targetNum, prefix, suffix, isDecimal };
}

export function AnimatedCounter({
  value,
  prefix: propPrefix,
  suffix: propSuffix,
  duration = 1600,
  className = "",
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { targetNum, prefix, suffix, isDecimal } = parseValue(value, propPrefix, propSuffix);

  // Initialize with targetNum so SSR and search engines render real metric
  const [displayNum, setDisplayNum] = useState<number>(targetNum);
  const isIntersectingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const currentNumRef = useRef<number>(targetNum);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const startAnimation = (fromVal: number, toVal: number) => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      let startTime: number | null = null;
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = fromVal + (toVal - fromVal) * easedProgress;

        currentNumRef.current = current;
        setDisplayNum(current);

        if (progress < 1) {
          animFrameRef.current = window.requestAnimationFrame(animate);
        } else {
          currentNumRef.current = toVal;
          setDisplayNum(toVal);
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isIntersectingRef.current = true;
          startAnimation(0, targetNum);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (isIntersectingRef.current) {
      // If already in viewport and targetNum changes, animate from current to new target
      startAnimation(currentNumRef.current, targetNum);
    } else {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [targetNum, duration]);

  const formattedValue = isDecimal ? displayNum.toFixed(1) : Math.round(displayNum).toString();

  return (
    <span ref={containerRef} className={`tabular-nums ${className}`} suppressHydrationWarning>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
