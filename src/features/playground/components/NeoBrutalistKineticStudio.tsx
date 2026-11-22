"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Zap,
  RotateCcw,
  Sparkles,
  Move,
  Flame,
  ArrowRight,
  Gauge,
  Sliders,
  CheckCircle,
} from "lucide-react";

interface TechBadge {
  id: string;
  name: string;
  color: string;
  textColor: string;
  x: number;
  y: number;
  isDragging: boolean;
  vx: number;
  vy: number;
}

const INITIAL_BADGES: Omit<TechBadge, "isDragging" | "vx" | "vy">[] = [
  { id: "next", name: "Next.js 16", color: "bg-[#E2F952]", textColor: "text-zinc-950", x: 20, y: 30 },
  { id: "claude", name: "Claude 3.7 Tool-Use", color: "bg-[#3B82F6]", textColor: "text-white", x: 170, y: 30 },
  { id: "ts", name: "Strict TypeScript", color: "bg-[#FF4D4D]", textColor: "text-white", x: 360, y: 30 },
  { id: "pgvector", name: "pgvector RAG", color: "bg-[#06B6D4]", textColor: "text-zinc-950", x: 20, y: 100 },
  { id: "ffmpeg", name: "FFmpeg Pipeline", color: "bg-[#F59E0B]", textColor: "text-zinc-950", x: 170, y: 100 },
  { id: "docker", name: "Docker Compose", color: "bg-[#A855F7]", textColor: "text-white", x: 340, y: 100 },
  { id: "webrtc", name: "WebRTC Audio/Video", color: "bg-[#10B981]", textColor: "text-zinc-950", x: 80, y: 170 },
  { id: "redis", name: "Redis Cache Queue", color: "bg-[#E11D48]", textColor: "text-white", x: 280, y: 170 },
];

export function NeoBrutalistKineticStudio() {
  const [badges, setBadges] = useState<TechBadge[]>(() =>
    INITIAL_BADGES.map((b) => ({ ...b, isDragging: false, vx: 0, vy: 0 }))
  );
  const [activeBadgeId, setActiveBadgeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tickerSpeed, setTickerSpeed] = useState<number>(1);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [isOverdrive, setIsOverdrive] = useState<boolean>(false);
  const [slamCount, setSlamCount] = useState<number>(42);
  const [isSlamming, setIsSlamming] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Drag Start
  const handleMouseDown = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const badge = badges.find((b) => b.id === id);
    if (!badge || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    setActiveBadgeId(id);
    setDragOffset({
      x: mouseX - badge.x,
      y: mouseY - badge.y,
    });

    setBadges((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isDragging: true } : b))
    );
  };

  // Handle Drag Move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!activeBadgeId || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      const maxX = containerRect.width - 120;
      const maxY = containerRect.height - 40;

      const newX = Math.max(10, Math.min(maxX, mouseX - dragOffset.x));
      const newY = Math.max(10, Math.min(maxY, mouseY - dragOffset.y));

      setBadges((prev) =>
        prev.map((b) =>
          b.id === activeBadgeId ? { ...b, x: newX, y: newY } : b
        )
      );
    },
    [activeBadgeId, dragOffset]
  );

  // Handle Drag End
  const handleMouseUp = useCallback(() => {
    if (activeBadgeId) {
      setBadges((prev) =>
        prev.map((b) => (b.id === activeBadgeId ? { ...b, isDragging: false } : b))
      );
      setActiveBadgeId(null);
    }
  }, [activeBadgeId]);

  useEffect(() => {
    if (activeBadgeId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [activeBadgeId, handleMouseMove, handleMouseUp]);

  // Scatter Action
  const handleScatter = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = Math.max(100, rect.width - 150);
    const maxY = Math.max(100, rect.height - 50);

    setBadges((prev) =>
      prev.map((b) => ({
        ...b,
        x: Math.floor(Math.random() * maxX) + 10,
        y: Math.floor(Math.random() * maxY) + 10,
      }))
    );
  };

  // Reset Badges to Grid
  const handleReset = () => {
    setBadges(INITIAL_BADGES.map((b) => ({ ...b, isDragging: false, vx: 0, vy: 0 })));
  };

  // Slam Button Action
  const handleSlamAction = () => {
    setIsSlamming(true);
    setSlamCount((prev) => prev + 1);
    setTimeout(() => setIsSlamming(false), 200);
  };

  const tickerItems = [
    "NEO-BRUTALIST ARCHITECTURE",
    "ZERO TRANSLUCENCY",
    "HARD-SNAP PRESS PHYSICS",
    "SOLID 3PX BORDERS",
    "HIGH-CONTRAST ACCENTS",
    "PRODUCTION SPEED",
    "ACID LIME #E2F952",
    "ELECTRIC COBALT #3B82F6",
  ];

  return (
    <div
      className={`w-full flex flex-col gap-6 p-4 sm:p-6 md:p-8 rounded-none border-[3px] border-zinc-950 dark:border-white transition-colors duration-150 ${
        isOverdrive
          ? "bg-[#E2F952] text-zinc-950"
          : "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white"
      } shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]`}
    >
      {/* Brutalist Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-zinc-950 dark:border-white pb-5">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono font-black text-xs uppercase tracking-wider border-2 border-zinc-950 dark:border-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
            STYLE // 01
          </div>
          <span className="font-mono text-xs uppercase tracking-widest font-bold">
            NEO-BRUTALIST KINETIC STUDIO
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOverdrive(!isOverdrive)}
            className={`px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider border-2 border-zinc-950 dark:border-white transition-all duration-75 cursor-pointer flex items-center gap-1.5 ${
              isOverdrive
                ? "bg-zinc-950 text-white shadow-[2px_2px_0px_#fff]"
                : "bg-[#FAFF00] text-zinc-950 hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000]"
            }`}
          >
            <Flame size={13} />
            <span>{isOverdrive ? "OVERDRIVE: ON" : "OVERDRIVE: OFF"}</span>
          </button>

          <button
            type="button"
            onClick={handleScatter}
            className="px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border-2 border-zinc-950 dark:border-white hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000] transition-all duration-75 cursor-pointer flex items-center gap-1"
          >
            <Move size={13} />
            <span>Scatter Badges</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border-2 border-zinc-950 dark:border-white hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000] transition-all duration-75 cursor-pointer"
            title="Reset Grid Layout"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Grid: Kinetic Drag Arena & Brutalist Feature Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Arena: Draggable / Tossable Physics Badges (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs uppercase font-black tracking-wider flex items-center gap-2">
              <Sparkles size={13} />
              <span>Interactive Physics Sandbox (Drag &amp; Toss)</span>
            </span>
            <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
              Pointer-reactive drag
            </span>
          </div>

          <div
            ref={containerRef}
            className="relative w-full h-[280px] sm:h-[320px] bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white overflow-hidden shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] select-none cursor-crosshair"
          >
            {/* Structural Background Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

            {/* Instruction watermark */}
            <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-600 pointer-events-none">
              GRAB &amp; TOSS BADGES ANYWHERE
            </div>

            {/* Badges */}
            {badges.map((b) => (
              <div
                key={b.id}
                onMouseDown={(e) => handleMouseDown(b.id, e)}
                style={{
                  transform: `translate3d(${b.x}px, ${b.y}px, 0px)`,
                  zIndex: b.isDragging ? 50 : 10,
                }}
                className={`absolute top-0 left-0 px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider border-2 border-zinc-950 dark:border-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] cursor-grab active:cursor-grabbing transition-shadow duration-75 ${
                  b.color
                } ${b.textColor} ${
                  b.isDragging ? "scale-105 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]" : ""
                }`}
              >
                {b.name}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arena: Brutalist Tactile Hard-Snap Blocks (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="font-mono text-xs uppercase font-black tracking-wider px-1">
            Tactile Hard-Snap Physics Demo
          </span>

          {/* Hard-Snap Action Card */}
          <div
            className={`p-4 sm:p-5 border-2 border-zinc-950 dark:border-white bg-[#3B82F6] text-white shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#fff] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] dark:hover:shadow-[7px_7px_0px_#fff] transition-transform duration-75 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase font-black tracking-widest bg-black text-white px-2 py-0.5">
                  HARD OFFSET SHADOW
                </span>
                <Zap size={16} />
              </div>
              <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight mb-2">
                ZERO BLUR. ZERO GRADIENT.
              </h3>
              <p className="font-mono text-xs leading-relaxed text-blue-100 mb-4">
                Cards slam diagonally into their solid offset shadow on hover and click with instantaneous feedback.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSlamAction}
              className={`w-full py-2.5 px-4 font-mono text-xs font-black uppercase tracking-wider bg-[#FAFF00] text-zinc-950 border-2 border-zinc-950 shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-75 cursor-pointer flex items-center justify-center gap-2 ${
                isSlamming ? "translate-x-1 translate-y-1 shadow-none" : ""
              }`}
            >
              <span>SLAM IMPACT COUNTER</span>
              <span className="bg-black text-white px-2 py-0.5 text-xs font-bold font-mono">
                {slamCount}
              </span>
            </button>
          </div>

          {/* Sub Feature Blocks */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border-2 border-zinc-950 dark:border-white bg-[#FF4D4D] text-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] transition-all duration-75">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider block mb-1">
                SPECS
              </span>
              <span className="font-mono font-black text-base sm:text-lg block">
                3PX SOLID
              </span>
              <span className="font-mono text-[10px] text-red-100">Zero border-radius</span>
            </div>

            <div className="p-3 border-2 border-zinc-950 dark:border-white bg-[#10B981] text-zinc-950 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] transition-all duration-75">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider block mb-1">
                PERFORMANCE
              </span>
              <span className="font-mono font-black text-base sm:text-lg block">
                0MS BLUR
              </span>
              <span className="font-mono text-[10px] text-zinc-800">Pure CSS compositing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Velocity-Reactive Marquee Ribbon with Interactive Speed Controls */}
      <div className="flex flex-col gap-2 pt-2 border-t-[3px] border-zinc-950 dark:border-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gauge size={14} />
            <span className="font-mono text-xs font-black uppercase tracking-wider">
              Velocity-Reactive Marquee Ribbon
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Sliders size={13} />
            <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">Speed:</span>
            {[0.5, 1, 2, 4].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => setTickerSpeed(speed)}
                className={`px-2 py-0.5 font-mono text-[10px] font-bold border border-zinc-950 dark:border-white cursor-pointer ${
                  tickerSpeed === speed
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {speed}x
              </button>
            ))}

            <button
              type="button"
              onClick={() => setIsReversed(!isReversed)}
              className="ml-2 px-2 py-0.5 font-mono text-[10px] font-bold border border-zinc-950 dark:border-white bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {isReversed ? "← REVERSE" : "FORWARD →"}
            </button>
          </div>
        </div>

        {/* Marquee Banner Track */}
        <div className="relative w-full overflow-hidden border-2 border-zinc-950 dark:border-white bg-black text-[#FAFF00] py-2.5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
          <div
            className="flex whitespace-nowrap will-change-transform"
            style={{
              animation: `marquee ${18 / tickerSpeed}s linear infinite ${isReversed ? "reverse" : "normal"}`,
            }}
          >
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span
                key={idx}
                className="font-mono font-black text-xs sm:text-sm uppercase tracking-widest px-4 flex items-center gap-3"
              >
                <span>{item}</span>
                <span className="text-white">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Style Metadata Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2 border-zinc-950 dark:border-white font-mono text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <CheckCircle size={14} className="text-emerald-500" />
          <span>Recommended for: Startups, Creative Agencies &amp; High-Impact Showcase</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-zinc-950 dark:text-white">
          <span>Design Tokens: Acid Yellow #E2F952 // Cobalt #3B82F6 // 3px Hairline</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
}
