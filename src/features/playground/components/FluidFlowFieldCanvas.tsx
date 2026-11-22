"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Waves, RotateCcw, Play, Pause, Wind } from "lucide-react";

interface FlowParticle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
  angle: number;
  color: string;
  age: number;
  maxAge: number;
}

type PaletteType = "blueprint" | "aurora" | "amber";

export function FluidFlowFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [palette, setPalette] = useState<PaletteType>("blueprint");
  const [particleDensity, setParticleDensity] = useState<number>(380);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.4);
  const [trailPersistence, setTrailPersistence] = useState<number>(0.07);

  const particlesRef = useRef<FlowParticle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null; vx: number; vy: number }>({
    x: null,
    y: null,
    vx: 0,
    vy: 0,
  });

  const getPaletteColors = useCallback((pal: PaletteType) => {
    if (pal === "blueprint") {
      return ["#38bdf8", "#818cf8", "#0284c7", "#2dd4bf", "#93c5fd"];
    }
    if (pal === "aurora") {
      return ["#10b981", "#06b6d4", "#a855f7", "#ec4899", "#34d399"];
    }
    return ["#f59e0b", "#fb923c", "#ef4444", "#f43f5e", "#fde047"];
  }, []);

  const spawnParticle = useCallback(
    (width: number, height: number, colors: string[]): FlowParticle => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        prevX: x,
        prevY: y,
        speed: Math.random() * 1.5 + 0.8,
        angle: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        age: 0,
        maxAge: Math.floor(Math.random() * 220 + 80),
      };
    },
    []
  );

  const initParticles = useCallback(
    (width: number, height: number, count: number, pal: PaletteType) => {
      const colors = getPaletteColors(pal);
      const list: FlowParticle[] = [];
      for (let i = 0; i < count; i++) {
        list.push(spawnParticle(width, height, colors));
      }
      particlesRef.current = list;
    },
    [getPaletteColors, spawnParticle]
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
      initParticles(width, height, particleDensity, palette);
    };

    window.addEventListener("resize", handleResize);
    initParticles(width, height, particleDensity, palette);

    let step = 0;
    const colors = getPaletteColors(palette);

    const render = () => {
      // Semi-transparent overlay creating silky fading vector trails
      ctx.fillStyle = `rgba(9, 9, 11, ${trailPersistence})`;
      ctx.fillRect(0, 0, width, height);

      if (isRunning) {
        step += 0.003 * speedMultiplier;
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isRunning) {
          p.prevX = p.x;
          p.prevY = p.y;

          // Mathematical vector force field (multiscale trigonometric harmonics)
          const scale = 0.0035;
          const noiseAngle =
            Math.sin(p.x * scale + step) * 2.5 +
            Math.cos(p.y * scale - step * 1.4) * 2.5 +
            Math.sin((p.x + p.y) * 0.002) * 1.5;

          p.angle = noiseAngle;

          // Cursor vortex swirl influence
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180 && dist > 2) {
              const mouseAngle = Math.atan2(dy, dx) + Math.PI / 2; // Tangential vortex
              const force = (1 - dist / 180) * 1.8;
              p.angle = p.angle * (1 - force) + mouseAngle * force;
            }
          }

          p.x += Math.cos(p.angle) * p.speed * speedMultiplier;
          p.y += Math.sin(p.angle) * p.speed * speedMultiplier;

          p.age++;

          // Reset particle if out of bounds or expired
          if (
            p.x < 0 ||
            p.x > width ||
            p.y < 0 ||
            p.y > height ||
            p.age >= p.maxAge
          ) {
            particles[i] = spawnParticle(width, height, colors);
            continue;
          }
        }

        // Render sleek fluid stroke
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.1;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    isRunning,
    palette,
    particleDensity,
    speedMultiplier,
    trailPersistence,
    getPaletteColors,
    initParticles,
    spawnParticle,
  ]);

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
      {/* Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-2xl border border-theme-border bg-zinc-950 overflow-hidden shadow-2xl cursor-crosshair group flex flex-col justify-between"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Top Badges */}
        <div className="relative z-10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-zinc-900/80 backdrop-blur-md text-sky-400 text-xs font-mono">
            <Waves size={13} className="animate-pulse" />
            <span>Fluid Vector Flowfield • Generative Math Art</span>
          </div>

          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-mono transition-colors"
          >
            {isRunning ? <Pause size={13} /> : <Play size={13} />}
            <span>{isRunning ? "Freeze" : "Flow"}</span>
          </button>
        </div>

        {/* Bottom Status */}
        <div className="relative z-10 p-4 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 text-[11px]">
            Drag cursor across canvas to spawn dynamic vortex ripples
          </span>
          <span className="hidden sm:inline bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 text-[11px] text-cyan-400">
            {particleDensity} Vector Strands Active
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-4 sm:p-5 rounded-xl border border-theme-border bg-theme-surface/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Palette Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-theme-muted mr-1">Palette:</span>
            {(["blueprint", "aurora", "amber"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPalette(p)}
                className={`px-3 py-1 rounded-md text-[11px] font-mono capitalize transition-all cursor-pointer ${
                  palette === p
                    ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-xs"
                    : "bg-theme-surface-elevated border border-theme-border text-theme-secondary hover:text-theme-primary"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Density Slider */}
          <div className="flex items-center gap-2">
            <span className="text-theme-muted">Density:</span>
            <input
              type="range"
              min={150}
              max={600}
              step={50}
              value={particleDensity}
              onChange={(e) => setParticleDensity(Number(e.target.value))}
              className="accent-sky-400 h-1.5 w-20 cursor-pointer bg-theme-border rounded-lg"
            />
            <span className="text-theme-primary font-bold w-7">{particleDensity}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Velocity Speed Slider */}
          <div className="flex items-center gap-2">
            <Wind size={13} className="text-theme-muted" />
            <input
              type="range"
              min={0.6}
              max={2.6}
              step={0.2}
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
              className="accent-sky-400 h-1.5 w-20 cursor-pointer bg-theme-border rounded-lg"
            />
            <span className="text-theme-primary font-bold w-6">{speedMultiplier.toFixed(1)}x</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setPalette("blueprint");
              setParticleDensity(380);
              setSpeedMultiplier(1.4);
              setTrailPersistence(0.07);
              setIsRunning(true);
            }}
            className="p-1.5 rounded-md border border-theme-border hover:bg-theme-hover text-theme-muted hover:text-theme-primary transition-colors"
            title="Reset Settings"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
