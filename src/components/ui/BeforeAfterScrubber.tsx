"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { GripVertical, SlidersHorizontal } from "lucide-react";

interface BeforeAfterScrubberProps {
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  beforeBadge?: string;
  afterBadge?: string;
  initialPosition?: number;
  className?: string;
  showControls?: boolean;
}

export function BeforeAfterScrubber({
  beforeContent,
  afterContent,
  beforeBadge = "Before",
  afterBadge = "After",
  initialPosition = 50,
  className = "",
  showControls = true,
}: BeforeAfterScrubberProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update slider position based on clientX
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  // Pointer Down handler
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  // Window pointer listeners while dragging
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, updatePosition]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      setSliderPosition(0);
    } else if (e.key === "End") {
      setSliderPosition(100);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {/* Interactive Quick Presets Bar */}
      {showControls && (
        <div className="flex items-center justify-between gap-2 px-1 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal size={13} className="text-theme-muted" />
            <span className="text-theme-secondary font-medium hidden sm:inline">Scrubber Control:</span>
            <div className="inline-flex items-center rounded-lg border border-theme-border bg-theme-surface p-0.5">
              <button
                type="button"
                onClick={() => setSliderPosition(80)}
                className={`px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                  sliderPosition >= 75
                    ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                    : "text-theme-secondary hover:text-theme-primary"
                }`}
              >
                Before (80%)
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className={`px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                  Math.abs(sliderPosition - 50) < 5
                    ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                    : "text-theme-secondary hover:text-theme-primary"
                }`}
              >
                50 / 50 Split
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(20)}
                className={`px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                  sliderPosition <= 25
                    ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                    : "text-theme-secondary hover:text-theme-primary"
                }`}
              >
                After (80%)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-theme-muted font-mono">
            <span>Drag slider to scrub</span>
            <span className="px-1.5 py-0.5 rounded border border-theme-border bg-theme-surface-elevated font-semibold text-theme-primary">
              {Math.round(sliderPosition)}%
            </span>
          </div>
        </div>
      )}

      {/* Main Scrubber Frame */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative w-full rounded-2xl border border-theme-border bg-zinc-950 text-white overflow-hidden shadow-2xl select-none cursor-ew-resize group"
        style={{ touchAction: "none" }}
      >
        {/* Layer 1 (Underneath): AFTER CONTENT */}
        <div className="relative w-full h-full min-h-[380px] sm:min-h-[420px] p-4 sm:p-6 md:p-8 bg-zinc-950 text-white">
          {/* After Badge (Top Right) */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] sm:text-xs font-semibold backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{afterBadge}</span>
            </span>
          </div>

          {afterContent}
        </div>

        {/* Layer 2 (Clipped Overlay): BEFORE CONTENT */}
        <div
          className="absolute inset-0 w-full h-full min-h-[380px] sm:min-h-[420px] p-4 sm:p-6 md:p-8 bg-zinc-950/98 text-white overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          {/* Before Badge (Top Left) */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-300 font-mono text-[11px] sm:text-xs font-medium backdrop-blur-md">
              <span>{beforeBadge}</span>
            </span>
          </div>

          {beforeContent}
        </div>

        {/* Razor-Thin Hairline Divider Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{
            left: `${sliderPosition}%`,
            transform: "translateX(-50%)",
          }}
        >
          {/* 1.5px Razor Hairline Line with subtle glow */}
          <div className="w-[1.5px] h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />

          {/* Centered Circular Handle Pill */}
          <div
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Comparison Scrubber"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-[0.75px] w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 bg-zinc-900 text-white shadow-2xl flex items-center justify-center cursor-ew-resize transition-transform pointer-events-auto select-none ${
              isDragging ? "scale-115 ring-2 ring-theme-accent" : "hover:scale-108"
            }`}
          >
            <GripVertical size={15} className="text-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
