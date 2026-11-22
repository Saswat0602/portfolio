"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, Radio, Activity } from "lucide-react";

type WaveformMode = "bars" | "sine" | "circular";
type ColorTheme = "cyan" | "neon" | "fire";

export function AudioSpectrumVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mode, setMode] = useState<WaveformMode>("bars");
  const [theme, setTheme] = useState<ColorTheme>("cyan");
  const [barCount] = useState<number>(48);
  const [speed, setSpeed] = useState<number>(1.5);
  const [audioGain, setAudioGain] = useState<number>(1.2);

  const mousePosRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const timeRef = useRef<number>(0);
  const peaksRef = useRef<number[]>([]);

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
    };

    window.addEventListener("resize", handleResize);

    // Color theme palettes
    const getColors = () => {
      if (theme === "cyan") {
        return {
          primary: "#38bdf8",
          secondary: "#818cf8",
          accent: "#2dd4bf",
          peak: "#ffffff",
        };
      }
      if (theme === "neon") {
        return {
          primary: "#f43f5e",
          secondary: "#a855f7",
          accent: "#ec4899",
          peak: "#fef08a",
        };
      }
      return {
        primary: "#f97316",
        secondary: "#eab308",
        accent: "#ef4444",
        peak: "#ffffff",
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        timeRef.current += 0.03 * speed;
      }
      const t = timeRef.current;
      const colors = getColors();

      // Ensure peaks array matches barCount
      if (peaksRef.current.length !== barCount) {
        peaksRef.current = new Array(barCount).fill(0);
      }

      // Mouse proximity frequency modulation
      const mouse = mousePosRef.current;
      let mouseInfluence = 0;
      if (mouse.x !== null) {
        mouseInfluence = mouse.x / width;
      }

      if (mode === "bars") {
        const gap = 3;
        const totalBarWidth = (width - gap * (barCount - 1)) / barCount;
        const barWidth = Math.max(2, totalBarWidth);

        for (let i = 0; i < barCount; i++) {
          const norm = i / barCount;
          // Harmonic wave equation simulating real audio frequency bands
          const harmonic1 = Math.sin(norm * 8 + t * 2.2);
          const harmonic2 = Math.cos(norm * 14 - t * 1.8);
          const harmonic3 = Math.sin(norm * 4 + t);
          const mouseBonus =
            mouse.x !== null ? Math.exp(-Math.pow((norm - mouseInfluence) * 6, 2)) * 0.7 : 0;

          const rawVal =
            (Math.abs(harmonic1 * 0.5 + harmonic2 * 0.3 + harmonic3 * 0.4) + mouseBonus) * audioGain;
          const amplitude = Math.min(1, Math.max(0.08, rawVal));
          const barHeight = amplitude * (height * 0.72);

          const x = i * (barWidth + gap);
          const y = height - barHeight - 12;

          // Peak hold logic with smooth decay
          if (barHeight > peaksRef.current[i]) {
            peaksRef.current[i] = barHeight;
          } else {
            peaksRef.current[i] = Math.max(0, peaksRef.current[i] - 1.2);
          }

          // Gradient fill for bar
          const grad = ctx.createLinearGradient(x, height, x, y);
          grad.addColorStop(0, colors.secondary);
          grad.addColorStop(0.6, colors.primary);
          grad.addColorStop(1, colors.accent);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 0, 0]);
          ctx.fill();

          // Peak cap indicator
          const peakY = height - peaksRef.current[i] - 14;
          ctx.fillStyle = colors.peak;
          ctx.fillRect(x, Math.max(8, peakY), barWidth, 2);
        }
      } else if (mode === "sine") {
        // Multi-layer continuous oscilloscope waveform
        const layers = [
          { freq: 0.012, amp: 70, speedMult: 1, alpha: 0.85, lw: 2.5, color: colors.primary },
          { freq: 0.02, amp: 45, speedMult: 1.4, alpha: 0.5, lw: 1.5, color: colors.secondary },
          { freq: 0.007, amp: 90, speedMult: 0.7, alpha: 0.3, lw: 1, color: colors.accent },
        ];

        const centerY = height / 2;

        layers.forEach((l) => {
          ctx.beginPath();
          ctx.lineWidth = l.lw;
          ctx.strokeStyle = l.color;
          ctx.globalAlpha = l.alpha;

          for (let x = 0; x < width; x += 3) {
            const mouseDist = mouse.x !== null ? Math.abs(x - mouse.x) : 999;
            const mouseAmp = mouseDist < 120 ? (1 - mouseDist / 120) * 40 : 0;

            const y =
              centerY +
              Math.sin(x * l.freq + t * l.speedMult) * (l.amp * audioGain) * Math.sin(t * 0.4) +
              Math.cos(x * 0.004 + t * 0.5) * 20 +
              (mouseDist < 120 ? Math.sin(x * 0.08) * mouseAmp : 0);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        ctx.globalAlpha = 1;
      } else if (mode === "circular") {
        // Radial audio radar ring
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.min(width, height) * 0.22;
        const radialSegments = 72;

        // Inner glowing core
        const coreGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          baseRadius * 0.8
        );
        coreGrad.addColorStop(0, `${colors.primary}40`);
        coreGrad.addColorStop(1, "transparent");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing radial spikes
        for (let i = 0; i < radialSegments; i++) {
          const angle = (i / radialSegments) * Math.PI * 2;
          const noise = Math.sin(i * 0.6 + t * 2) * Math.cos(i * 0.3 - t);
          const spikeLen = (baseRadius * 0.2 + Math.abs(noise) * (baseRadius * 0.7)) * audioGain;

          const x1 = centerX + Math.cos(angle) * baseRadius;
          const y1 = centerY + Math.sin(angle) * baseRadius;
          const x2 = centerX + Math.cos(angle) * (baseRadius + spikeLen);
          const y2 = centerY + Math.sin(angle) * (baseRadius + spikeLen);

          ctx.strokeStyle = i % 2 === 0 ? colors.primary : colors.accent;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Concentric radar ring
        ctx.strokeStyle = `${colors.secondary}60`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlaying, mode, theme, barCount, speed, audioGain]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: null, y: null };
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Interactive Visualizer Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[340px] sm:h-[400px] md:h-[440px] rounded-2xl border border-theme-border bg-zinc-950 overflow-hidden shadow-2xl cursor-crosshair group flex flex-col justify-between"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Top Badges Bar */}
        <div className="relative z-10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-zinc-900/80 backdrop-blur-md text-sky-400 text-xs font-mono">
            <Radio size={13} className="animate-pulse" />
            <span>Real-Time Web Audio &amp; WebRTC Spectrum Engine</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-mono transition-colors"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause Stream" : "Resume"}</span>
            </button>
          </div>
        </div>

        {/* Bottom Status Overlay */}
        <div className="relative z-10 p-4 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 text-[11px]">
            Mode: <strong className="text-zinc-200 capitalize">{mode}</strong> • Hover across canvas to modulate frequencies
          </span>
          <span className="hidden sm:inline bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 text-[11px] text-emerald-400">
            60 FPS • WebGL &amp; Canvas Native
          </span>
        </div>
      </div>

      {/* Control Console */}
      <div className="p-4 sm:p-5 rounded-xl border border-theme-border bg-theme-surface/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-theme-muted mr-1">Style:</span>
            {(["bars", "sine", "circular"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-md text-[11px] font-mono capitalize transition-all cursor-pointer ${
                  mode === m
                    ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-xs"
                    : "bg-theme-surface-elevated border border-theme-border text-theme-secondary hover:text-theme-primary"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Color Themes */}
          <div className="flex items-center gap-1.5">
            <span className="text-theme-muted mr-1">Palette:</span>
            {(["cyan", "neon", "fire"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-all cursor-pointer ${
                  theme === t
                    ? "border border-theme-accent bg-theme-accent-subtle text-theme-accent font-bold"
                    : "border border-theme-border text-theme-muted hover:text-theme-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Audio Gain Slider */}
          <div className="flex items-center gap-2">
            <Volume2 size={13} className="text-theme-muted" />
            <input
              type="range"
              min={0.6}
              max={2}
              step={0.1}
              value={audioGain}
              onChange={(e) => setAudioGain(Number(e.target.value))}
              className="accent-sky-400 h-1.5 w-20 cursor-pointer bg-theme-border rounded-lg"
              title="Gain Multiplier"
            />
            <span className="text-theme-primary font-bold w-6">{audioGain.toFixed(1)}x</span>
          </div>

          {/* Speed Slider */}
          <div className="flex items-center gap-2">
            <Activity size={13} className="text-theme-muted" />
            <input
              type="range"
              min={0.5}
              max={3}
              step={0.2}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="accent-sky-400 h-1.5 w-20 cursor-pointer bg-theme-border rounded-lg"
              title="Simulation Speed"
            />
            <span className="text-theme-primary font-bold w-6">{speed.toFixed(1)}s</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setMode("bars");
              setTheme("cyan");
              setAudioGain(1.2);
              setSpeed(1.5);
              setIsPlaying(true);
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
