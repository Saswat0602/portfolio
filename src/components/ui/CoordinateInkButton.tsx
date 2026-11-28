"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
  PointerEvent,
  ReactNode,
} from "react";
import Link from "next/link";

export interface CoordinateInkButtonProps {
  label?: string;
  activeLabel?: string | null;
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  showArrow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "accent" | "secondary" | "outline" | "ghost" | "ink";
  size?: "sm" | "md" | "lg";
  rounded?: "full" | "xl" | "lg" | "md";
  primary?: boolean;
  magnetic?: boolean;
  reduceMotion?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  overlayClassName?: string;
  "aria-label"?: string;
}

function DefaultArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path d="M3.5 8h9M9.2 4.6 12.5 8l-3.3 3.4" />
    </svg>
  );
}

export function CoordinateInkButton({
  label = "Start a Conversation",
  activeLabel = null,
  children,
  icon,
  iconPosition = "right",
  showArrow = false,
  href,
  target,
  rel,
  onClick,
  onMouseEnter,
  onMouseLeave,
  variant,
  size = "md",
  rounded = "xl",
  primary = false,
  magnetic = true,
  reduceMotion = false,
  disabled = false,
  type = "button",
  className = "",
  overlayClassName = "",
  "aria-label": ariaLabel,
}: CoordinateInkButtonProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const magRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });
  const [hovered, setHovered] = useState(false);
  const [isPrefersReduced, setIsPrefersReduced] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setIsPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const shouldReduceMotion = reduceMotion || isPrefersReduced;

  const wakeMag = useCallback(() => {
    const s = magRef.current;
    if (s.raf) return;
    const step = () => {
      s.x += (s.tx - s.x) * 0.22;
      s.y += (s.ty - s.y) * 0.22;
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
      }
      if (Math.hypot(s.tx - s.x, s.ty - s.y) > 0.05) {
        s.raf = requestAnimationFrame(step);
      } else {
        s.x = s.tx;
        s.y = s.ty;
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
        }
        s.raf = 0;
      }
    };
    s.raf = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const mag = magRef.current;
    return () => {
      if (mag.raf) cancelAnimationFrame(mag.raf);
    };
  }, []);

  const setOriginFromEvent = (e: PointerEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${(e.clientX - r.left).toFixed(1)}px`);
    el.style.setProperty("--y", `${(e.clientY - r.top).toFixed(1)}px`);
  };

  const handlePointerEnter = (e: PointerEvent<HTMLElement>) => {
    if (disabled) return;
    setOriginFromEvent(e);
    setHovered(true);
    onMouseEnter?.(e as unknown as MouseEvent<HTMLElement>);
  };

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (disabled) return;
    setOriginFromEvent(e);
    if (shouldReduceMotion || !magnetic || e.pointerType === "touch") return;
    const r = containerRef.current?.getBoundingClientRect();
    if (!r || r.width === 0) return;
    const rx = (e.clientX - (r.left + r.width * 0.5)) / (r.width * 0.5);
    const ry = (e.clientY - (r.top + r.height * 0.5)) / (r.height * 0.5);
    magRef.current.tx = Math.max(-1, Math.min(1, rx)) * 8;
    magRef.current.ty = Math.max(-1, Math.min(1, ry)) * 8;
    wakeMag();
  };

  const handlePointerLeave = (e: PointerEvent<HTMLElement>) => {
    if (disabled) return;
    setOriginFromEvent(e);
    setHovered(false);
    if (!shouldReduceMotion && magnetic) {
      magRef.current.tx = 0;
      magRef.current.ty = 0;
      wakeMag();
    }
    onMouseLeave?.(e as unknown as MouseEvent<HTMLElement>);
  };

  const resolvedVariant = variant || (primary ? "primary" : "accent");

  // Size styling
  const sizeClasses = {
    sm: "px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-medium",
    md: "px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold",
    lg: "px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold",
  }[size];

  // Rounded corners styling
  const roundedClasses = {
    full: "rounded-full",
    xl: "rounded-xl",
    lg: "rounded-lg",
    md: "rounded-md",
  }[rounded];

  // Variant styling for base resting state and ink flood overlay
  let baseColorClasses = "";
  let overlayColorClasses = "";

  switch (resolvedVariant) {
    case "primary":
      // Solid accent base with contrasting obsidian ink flood
      baseColorClasses =
        "bg-theme-accent text-white dark:text-zinc-950 border border-theme-accent shadow-sm hover:shadow-md";
      overlayColorClasses =
        "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border border-zinc-900 dark:border-white shadow-md";
      break;

    case "accent":
      // Blueprint surface base with electric cyan ink flood
      baseColorClasses =
        "bg-theme-surface/85 border border-theme-border text-theme-primary hover:border-theme-accent/60 shadow-xs";
      overlayColorClasses =
        "bg-theme-accent text-white dark:text-zinc-950 font-semibold border border-theme-accent shadow-md";
      break;

    case "secondary":
    case "outline":
      // Technical hairline border with sleek surface flood
      baseColorClasses =
        "bg-theme-surface/70 border border-theme-border text-theme-secondary hover:text-theme-primary shadow-xs";
      overlayColorClasses =
        "bg-theme-hover border border-theme-border-strong text-theme-primary";
      break;

    case "ink":
      // Strict high-contrast monochromatic ink flood (matches user reference)
      baseColorClasses =
        "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-xs";
      overlayColorClasses =
        "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border border-zinc-950 dark:border-zinc-100 shadow-md";
      break;

    case "ghost":
      baseColorClasses =
        "bg-transparent text-theme-secondary hover:text-theme-primary border border-transparent";
      overlayColorClasses =
        "bg-theme-hover text-theme-primary border border-theme-border";
      break;
  }

  const commonClass = `group relative inline-flex items-center justify-center gap-2 overflow-hidden cursor-pointer select-none will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200 active:scale-[0.98] ${
    disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
  } ${sizeClasses} ${roundedClasses} ${baseColorClasses} ${className}`;

  const displayLabel = activeLabel || label;
  const resolvedIcon = icon || (showArrow ? <DefaultArrowIcon /> : null);

  const innerContent = children ? (
    children
  ) : (
    <>
      {iconPosition === "left" && resolvedIcon}
      <span>{displayLabel}</span>
      {iconPosition === "right" && resolvedIcon}
    </>
  );

  const overlayContent = (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-2 whitespace-nowrap select-none ${roundedClasses} ${overlayColorClasses} ${overlayClassName}`}
      style={{
        clipPath: hovered
          ? "circle(155% at var(--x, 50%) var(--y, 50%))"
          : "circle(0% at var(--x, 50%) var(--y, 50%))",
        transition: shouldReduceMotion
          ? "none"
          : "clip-path 440ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
        {innerContent}
      </span>
    </span>
  );

  const baseContent = (
    <span className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap">
      {innerContent}
    </span>
  );

  // Next.js internal link
  if (href && !href.startsWith("http") && !href.endsWith(".pdf") && target !== "_blank") {
    return (
      <Link
        ref={(el) => {
          containerRef.current = el;
        }}
        href={href}
        onClick={onClick}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={ariaLabel}
        className={commonClass}
      >
        {baseContent}
        {overlayContent}
      </Link>
    );
  }

  // External anchor / PDF download link
  if (href) {
    return (
      <a
        ref={(el) => {
          containerRef.current = el;
        }}
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        onClick={onClick}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={ariaLabel}
        className={commonClass}
      >
        {baseContent}
        {overlayContent}
      </a>
    );
  }

  // Native button element
  return (
    <button
      ref={(el) => {
        containerRef.current = el;
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={ariaLabel}
      className={commonClass}
    >
      {baseContent}
      {overlayContent}
    </button>
  );
}

export default CoordinateInkButton;
