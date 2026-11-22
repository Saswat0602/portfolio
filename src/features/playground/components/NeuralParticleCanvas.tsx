"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, RotateCcw, Play, Pause } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export function NeuralParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [particleCount, setParticleCount] = useState<number>(65);
  const [connectDistance, setConnectDistance] = useState<number>(130);
  const [mouseMode, setMouseMode] = useState<"repel" | "attract" | "none">("repel");
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 140,
  });

  const initParticles = useCallback(
    (width: number, height: number, count: number) => {
      const colors = ["#38bdf8", "#818cf8", "#2dd4bf", "#94a3b8"];
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 1.2;
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          radius,
          alpha: Math.random() * 0.6 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      particlesRef.current = newParticles;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      initParticles(width, height, particleCount);
    };

    window.addEventListener("resize", handleResize);
    initParticles(width, height, particleCount);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isRunning) {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off boundary edges
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse physics
          if (mouse.x !== null && mouse.y !== null && mouseMode !== "none") {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              const angle = Math.atan2(dy, dx);
              const dir = mouseMode === "repel" ? 1 : -1;

              p.x += Math.cos(angle) * force * 3 * dir;
              p.y += Math.sin(angle) * force * 3 * dir;
            }
          }
        }

        // Draw individual particle with subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles with hairlines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            const lineAlpha = (1 - dist / connectDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, connectDistance, mouseMode, isRunning, initParticles]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = null;
    mouseRef.current.y = null;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Live Interactive Canvas Window */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] rounded-2xl border border-theme-border bg-zinc-950 overflow-hidden shadow-2xl cursor-crosshair group"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-zinc-900/80 backdrop-blur-md text-sky-400 text-xs font-mono">
          <Sparkles size={13} className="animate-spin-slow" />
          <span>Interactive Neural Canvas • 60fps</span>
        </div>

        {/* Center overlay hint that fades out */}
        <div className="absolute bottom-4 left-4 z-10 text-[11px] font-mono text-zinc-400 bg-zinc-900/70 px-3 py-1 rounded-md border border-zinc-800">
          Move your cursor inside to interact with particles
        </div>

        {/* Quick Pause / Play button */}
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-mono transition-colors"
        >
          {isRunning ? <Pause size={13} /> : <Play size={13} />}
          <span>{isRunning ? "Pause" : "Resume"}</span>
        </button>
      </div>

      {/* Control Console */}
      <div className="p-4 sm:p-5 rounded-xl border border-theme-border bg-theme-surface/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Particle Count Slider */}
          <div className="flex items-center gap-2.5">
            <span className="text-theme-muted">Nodes:</span>
            <input
              type="range"
              min={25}
              max={110}
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              className="accent-sky-400 h-1.5 w-24 sm:w-28 cursor-pointer bg-theme-border rounded-lg"
            />
            <span className="text-theme-primary font-bold w-6">{particleCount}</span>
          </div>

          {/* Connection Distance */}
          <div className="flex items-center gap-2.5">
            <span className="text-theme-muted">Reach:</span>
            <input
              type="range"
              min={80}
              max={180}
              value={connectDistance}
              onChange={(e) => setConnectDistance(Number(e.target.value))}
              className="accent-sky-400 h-1.5 w-24 sm:w-28 cursor-pointer bg-theme-border rounded-lg"
            />
            <span className="text-theme-primary font-bold w-7">{connectDistance}px</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mouse Mode Toggle */}
          <span className="text-theme-muted mr-1">Cursor:</span>
          {(["repel", "attract", "none"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setMouseMode(mode)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-all cursor-pointer ${
                mouseMode === mode
                  ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                  : "bg-theme-surface-elevated border border-theme-border text-theme-secondary hover:text-theme-primary"
              }`}
            >
              {mode}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setParticleCount(65);
              setConnectDistance(130);
              setMouseMode("repel");
              setIsRunning(true);
            }}
            className="p-1.5 rounded-md border border-theme-border hover:bg-theme-hover text-theme-muted hover:text-theme-primary transition-colors ml-1"
            title="Reset Settings"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
