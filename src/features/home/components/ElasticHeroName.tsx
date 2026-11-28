"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeContext";

interface GlyphMetric {
  w: number;
  h: number;
  advance: number;
  left: number;
  ascent: number;
}

interface ShockWave {
  r: number;
  c: number;
  age: number;
}

export interface ElasticHeroNameProps {
  name: string;
  onRippleClick?: () => void;
}

const LINES = ["SASWAT RANJAN", "MOHANTY"] as const;

export function ElasticHeroName({ name, onRippleClick }: ElasticHeroNameProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const simRef = useRef({
    w: 0,
    h: 0,
    rowOffsets: [0, 0],
    rowVels: [0, 0],
    charScales: LINES.map((line) => new Array<number>(line.length).fill(1)),
    charVels: LINES.map((line) => new Array<number>(line.length).fill(0)),
    pointer: { x: 0, y: 0, active: false },
    shocks: [{ r: 0, c: 6, age: 0 }] as ShockWave[],
    glyphMetrics: {} as Record<string, GlyphMetric>,
  });

  const themeColorsRef = useRef({
    isDark: true,
    inkTop: "#FFFFFF",
    inkBottom: "#CBD5E1",
    accentStart: "#38BDF8",
    accentEnd: "#818CF8",
  });
  const wakeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const isDark = theme === "dark";
    const styles = getComputedStyle(document.documentElement);
    const inkTop = styles.getPropertyValue("--color-text-primary").trim() || (isDark ? "#F8FAFC" : "#0B1727");
    const accentStart = styles.getPropertyValue("--color-accent").trim() || (isDark ? "#38BDF8" : "#0284C7");

    themeColorsRef.current = {
      isDark,
      inkTop,
      inkBottom: isDark ? "#94A3B8" : "#334155",
      accentStart,
      accentEnd: isDark ? "#818CF8" : "#4F46E5",
    };
    wakeRef.current?.();
  }, [theme]);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const REF_SIZE = 120;
    const FONT_SPEC = `800 ${REF_SIZE}px "Outfit", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif`;

    const measureGlyphTable = () => {
      const table: Record<string, GlyphMetric> = {};
      ctx.save();
      ctx.font = FONT_SPEC;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const m = ctx.measureText(ch);
        const left = m.actualBoundingBoxLeft ?? 0;
        const right = m.actualBoundingBoxRight ?? m.width;
        const ascent = m.actualBoundingBoxAscent ?? REF_SIZE * 0.74;
        const descent = m.actualBoundingBoxDescent ?? 0;
        table[ch] = {
          w: Math.max(10, left + right),
          h: Math.max(10, ascent + descent),
          advance: Math.max(12, m.width),
          left,
          ascent,
        };
      }
      table[" "] = {
        w: REF_SIZE * 0.34,
        h: REF_SIZE * 0.74,
        advance: REF_SIZE * 0.34,
        left: 0,
        ascent: REF_SIZE * 0.74,
      };
      ctx.restore();
      simRef.current.glyphMetrics = table;
    };

    let rafId = 0;
    let last = performance.now();
    let disposed = false;

    const startLoop = () => {
      if (disposed || rafId || document.hidden) return;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    wakeRef.current = startLoop;

    const resize = () => {
      if (disposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.parentElement?.clientWidth || 720;
      const h = canvas.parentElement?.clientHeight || 190;
      simRef.current.w = w;
      simRef.current.h = h;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureGlyphTable();
      startLoop();
    };

    const tick = (now: number) => {
      rafId = 0;
      if (disposed || document.hidden) return;
      const dt = Math.min(0.032, Math.max(0.001, (now - last) / 1000));
      last = now;

      const sim = simRef.current;
      const { w, h, rowOffsets, rowVels, charScales, charVels, pointer, shocks, glyphMetrics } = sim;
      if (w <= 0 || h <= 0) return;

      for (let i = shocks.length - 1; i >= 0; i--) {
        shocks[i].age += dt * 2.2;
        if (shocks[i].age > 2.3) shocks.splice(i, 1);
      }

      const nRows = LINES.length;
      const ptrRowFloat = pointer.active ? (pointer.y / h) * nRows - 0.5 : -99;
      let maxMotion = shocks.length > 0 || pointer.active ? 1 : 0;

      // Subtle vertical breathing on row hover/shock
      for (let r = 0; r < nRows; r++) {
        let targetY = 0;
        if (pointer.active) {
          const distR = r - ptrRowFloat;
          targetY = Math.exp(-(distR * distR) * 1.8) * (r === 0 ? -2.5 : 2.5);
        }
        const acc = (targetY - rowOffsets[r]) * 140 - rowVels[r] * 18;
        rowVels[r] += acc * dt;
        rowOffsets[r] += rowVels[r] * dt;
        maxMotion = Math.max(maxMotion, Math.abs(rowVels[r]), Math.abs(targetY - rowOffsets[r]));
      }

      ctx.clearRect(0, 0, w, h);
      ctx.font = FONT_SPEC;
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      const { isDark, inkTop, inkBottom, accentStart, accentEnd } = themeColorsRef.current;
      const letterGapRef = REF_SIZE * 0.055;

      // Compute natural reference widths for each line to preserve authentic typography proportions
      const lineRefWidths = LINES.map((word) => {
        let sum = 0;
        for (let c = 0; c < word.length; c++) {
          const gm = glyphMetrics[word[c]] || { advance: REF_SIZE * 0.65 };
          sum += gm.advance + (c < word.length - 1 ? letterGapRef : 0);
        }
        return sum;
      });

      const maxLineRefW = Math.max(...lineRefWidths, 1);
      const rowHeight = h / nRows;
      // Fit both lines comfortably with breathing room for elastic pop
      const baseScale = Math.min((w * 0.92) / maxLineRefW, (rowHeight * 0.72) / REF_SIZE);

      for (let r = 0; r < nRows; r++) {
        const word = LINES[r];
        const nChars = word.length;
        const cScales = charScales[r];
        const cVels = charVels[r];
        const rowProx = pointer.active ? Math.exp(-Math.pow(r - ptrRowFloat, 2) * 1.6) : 0;

        const rowScale = r === 1 ? baseScale * 1.08 : baseScale * 0.96;
        const rowCenterY = (r + 0.5) * rowHeight + rowOffsets[r];

        // 1. Update elastic spring weights per character (accordion squash & stretch)
        let dynamicLineRefW = 0;
        let peakIdx = -1;
        let peakWeight = 0;
        const baseLineW = lineRefWidths[r] * rowScale;
        const baseStartX = (w - baseLineW) * 0.5;

        let probeX = baseStartX;
        for (let c = 0; c < nChars; c++) {
          const ch = word[c];
          const gm = glyphMetrics[ch] || { advance: 78 };
          const advPx = gm.advance * rowScale;
          const restCenterX = probeX + advPx * 0.5;
          probeX += advPx + letterGapRef * rowScale;

          let targetW = 1.0;
          if (pointer.active) {
            const distPx = Math.abs(pointer.x - restCenterX);
            const sigma = Math.max(44, w * 0.075);
            const u = distPx / sigma;
            // Mexican-hat / elastic ripple: hovered letter swells, adjacent letters compress slightly
            const boost = Math.exp(-u * u * 0.85) * (0.22 + rowProx * 0.58);
            const pinch = Math.exp(-Math.pow(u - 1.55, 2) * 1.4) * (0.06 + rowProx * 0.14);
            targetW = 1.0 + boost - pinch;
          }

          for (let s = 0; s < shocks.length; s++) {
            const sh = shocks[s];
            const d = Math.hypot(c - sh.c, (r - sh.r) * 2.1);
            const front = sh.age * 5.8;
            const env = Math.exp(-Math.pow(d - front, 2) * 1.0) * Math.exp(-sh.age * 1.25);
            targetW += Math.sin((d - front) * 4.0) * env * 0.52;
          }

          targetW = Math.max(0.58, Math.min(1.85, targetW));
          const acc = (targetW - cScales[c]) * 165 - cVels[c] * 12.5;
          cVels[c] += acc * dt;
          cScales[c] = Math.max(0.52, cScales[c] + cVels[c] * dt);
          maxMotion = Math.max(maxMotion, Math.abs(cVels[c]), Math.abs(targetW - cScales[c]));

          dynamicLineRefW += gm.advance * cScales[c] + (c < nChars - 1 ? letterGapRef : 0);

          if (ch !== " " && cScales[c] > peakWeight) {
            peakWeight = cScales[c];
            peakIdx = c;
          }
        }

        // Clamp total line expansion softly so it never overflows the canvas edges
        const dynamicLineW = dynamicLineRefW * rowScale;
        const fitClamp = dynamicLineW > w * 0.96 ? (w * 0.96) / dynamicLineW : 1;
        const effectiveRowScale = rowScale * fitClamp;
        const clampedLineW = dynamicLineRefW * effectiveRowScale;
        const startX = (w - clampedLineW) * 0.5;

        // 2. Render each glyph with elastic squash/stretch & neighbor displacement
        let curX = startX;
        for (let c = 0; c < nChars; c++) {
          const ch = word[c];
          const gm = glyphMetrics[ch] || {
            w: 75,
            h: 88,
            advance: 78,
            left: 0,
            ascent: 88,
          };

          const wMul = cScales[c];
          const advPx = gm.advance * wMul * effectiveRowScale;
          const charCenterX = curX + advPx * 0.5;

          if (ch !== " ") {
            const stretchX = wMul;
            const stretchY = 1 + (wMul - 1) * 0.42;
            const liftY = -(wMul - 1) * 14;
            const isHeroLetter = pointer.active && rowProx > 0.55 && c === peakIdx && peakWeight > 1.15;
            const isHighlighted = pointer.active && wMul > 1.12;

            ctx.save();
            ctx.translate(charCenterX, rowCenterY + liftY);
            ctx.scale(effectiveRowScale * stretchX, effectiveRowScale * stretchY);

            if (r === 1 || isHeroLetter || isHighlighted) {
              ctx.shadowColor = isDark ? "rgba(56, 189, 248, 0.48)" : "rgba(2, 132, 199, 0.3)";
              ctx.shadowBlur = isHeroLetter ? 22 : isHighlighted ? 16 : 10;
            }

            if (isHeroLetter && r === 0) {
              ctx.fillStyle = accentStart;
            } else {
              const localStartX = (startX - charCenterX) / (effectiveRowScale * stretchX);
              const localEndX = (startX + clampedLineW - charCenterX) / (effectiveRowScale * stretchX);
              const grad = ctx.createLinearGradient(localStartX, -gm.ascent * 0.5, localEndX, gm.ascent * 0.5);
              if (r === 0) {
                grad.addColorStop(0, inkTop);
                grad.addColorStop(0.55, inkTop);
                grad.addColorStop(1, inkBottom);
              } else {
                grad.addColorStop(0, accentStart);
                grad.addColorStop(0.55, isDark ? "#7DD3FC" : "#0EA5E9");
                grad.addColorStop(1, accentEnd);
              }
              ctx.fillStyle = grad;
            }

            ctx.fillText(ch, -gm.advance * 0.5, gm.ascent * 0.48);
            ctx.restore();
          }

          curX += advPx + letterGapRef * effectiveRowScale;
        }
      }

      if (maxMotion > 0.002) {
        rafId = requestAnimationFrame(tick);
      }
    };

    resize();
    tick(performance.now());
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (disposed) return;
        measureGlyphTable();
        tick(performance.now());
        startLoop();
      });
    }
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onVis = () => {
      if (!document.hidden) startLoop();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      wakeRef.current = null;
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-sans tracking-tight text-theme-primary mb-3 sm:mb-4 break-words">
        {name}
      </h1>
    );
  }

  return (
    <div className="relative w-full max-w-[920px] mx-auto h-[128px] sm:h-[164px] md:h-[196px] mb-3 sm:mb-4">
      <h1 className="sr-only">{name}</h1>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          simRef.current.pointer.x = e.clientX - rect.left;
          simRef.current.pointer.y = e.clientY - rect.top;
          simRef.current.pointer.active = true;
          wakeRef.current?.();
        }}
        onPointerDown={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect || rect.height === 0) return;
          const sim = simRef.current;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const r = Math.min(LINES.length - 1, Math.max(0, Math.floor((y / rect.height) * LINES.length)));
          const c = Math.min(LINES[r].length - 1, Math.max(0, Math.floor((x / rect.width) * LINES[r].length)));
          sim.shocks.push({ r, c, age: 0 });
          wakeRef.current?.();
          onRippleClick?.();
        }}
        onPointerLeave={() => {
          simRef.current.pointer.active = false;
          wakeRef.current?.();
        }}
        className="w-full h-full block touch-none cursor-pointer"
      />
    </div>
  );
}
