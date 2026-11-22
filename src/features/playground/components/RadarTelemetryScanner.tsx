"use client";

import { useEffect, useRef, useState } from "react";
import { Radar, RotateCcw, ShieldCheck } from "lucide-react";

interface RadarTarget {
  id: string;
  name: string;
  region: string;
  angle: number; // in radians
  distanceRatio: number; // 0 to 1
  latency: number; // in ms
  status: "optimal" | "nominal" | "high";
  protocol: string;
  lastPingTime: number;
}

const INITIAL_TARGETS: RadarTarget[] = [
  {
    id: "bbsr",
    name: "Bhubaneswar Edge (Primary)",
    region: "India East",
    angle: 0.85,
    distanceRatio: 0.22,
    latency: 4,
    status: "optimal",
    protocol: "HTTP/3 • QUIC",
    lastPingTime: 0,
  },
  {
    id: "sgp",
    name: "Singapore AWS Gateway",
    region: "Asia Pacific",
    angle: 2.1,
    distanceRatio: 0.42,
    latency: 38,
    status: "optimal",
    protocol: "TLS 1.3 • WebSocket",
    lastPingTime: 0,
  },
  {
    id: "nrt",
    name: "Tokyo WebRTC Mesh Peer",
    region: "East Asia",
    angle: 3.4,
    distanceRatio: 0.62,
    latency: 82,
    status: "nominal",
    protocol: "WebRTC • SRTP",
    lastPingTime: 0,
  },
  {
    id: "fra",
    name: "Frankfurt pgvector Replica",
    region: "Europe Central",
    angle: 4.8,
    distanceRatio: 0.78,
    latency: 116,
    status: "nominal",
    protocol: "PostgreSQL Wire v3",
    lastPingTime: 0,
  },
  {
    id: "iad",
    name: "US-East AWS Bedrock Cluster",
    region: "North America",
    angle: 5.9,
    distanceRatio: 0.88,
    latency: 142,
    status: "nominal",
    protocol: "gRPC • HTTP/2",
    lastPingTime: 0,
  },
];

export function RadarTelemetryScanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [sweepSpeed, setSweepSpeed] = useState<number>(1.2);
  const [activeTargetId, setActiveTargetId] = useState<string>("bbsr");
  const [isDDoSSimulating, setIsDDoSSimulating] = useState<boolean>(false);
  const [targets, setTargets] = useState<RadarTarget[]>(INITIAL_TARGETS);

  const sweepAngleRef = useRef<number>(0);

  const activeTarget =
    targets.find((t) => t.id === activeTargetId) || targets[0];

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

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.44;

      sweepAngleRef.current = (sweepAngleRef.current + 0.02 * sweepSpeed) % (Math.PI * 2);
      const sweepAngle = sweepAngleRef.current;

      // 1. Draw Concentric Radar Grid Rings (Latency ranges: 25ms, 50ms, 100ms, 150ms)
      const rings = [0.25, 0.5, 0.75, 1.0];
      const ringLabels = ["25ms", "50ms", "100ms", "150ms"];

      rings.forEach((r, idx) => {
        const rad = maxRadius * r;
        ctx.beginPath();
        ctx.arc(centerX, centerY, rad, 0, Math.PI * 2);
        ctx.strokeStyle = idx === rings.length - 1 ? "#0284c7" : "rgba(56, 189, 248, 0.18)";
        ctx.lineWidth = idx === rings.length - 1 ? 1.5 : 0.8;
        ctx.stroke();

        // Range labels
        ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
        ctx.font = "9px monospace";
        ctx.fillText(ringLabels[idx], centerX + 6, centerY - rad + 12);
      });

      // 2. Draw Crosshairs & Diagonal Coordinate Rays
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 0.8;

      // Horizontal & Vertical
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.stroke();

      // Diagonal 45°
      const diag = maxRadius * 0.7071;
      ctx.beginPath();
      ctx.moveTo(centerX - diag, centerY - diag);
      ctx.lineTo(centerX + diag, centerY + diag);
      ctx.moveTo(centerX + diag, centerY - diag);
      ctx.lineTo(centerX - diag, centerY + diag);
      ctx.stroke();

      // 3. Draw Sweeping Sonar Beam with Smooth Gradient Tail
      const sweepTailAngle = 0.5; // arc length of the fading tail
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, "rgba(56, 189, 248, 0.25)");
      gradient.addColorStop(1, "rgba(56, 189, 248, 0.02)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, sweepAngle - sweepTailAngle, sweepAngle, false);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Leading beam ray
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(sweepAngle) * maxRadius,
        centerY + Math.sin(sweepAngle) * maxRadius
      );
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // 4. Render Detected Edge Targets
      const now = Date.now();

      targets.forEach((target) => {
        const targetRadius = maxRadius * target.distanceRatio;
        const tx = centerX + Math.cos(target.angle) * targetRadius;
        const ty = centerY + Math.sin(target.angle) * targetRadius;

        // Check if sweeping beam just crossed this target
        const angleDiff = Math.abs((sweepAngle - target.angle + Math.PI * 2) % (Math.PI * 2));
        if (angleDiff < 0.08) {
          target.lastPingTime = now;
        }

        const timeSincePing = now - target.lastPingTime;
        const isPingedRecently = timeSincePing < 1200;

        // Expanding shockwave ripple if pinged recently
        if (isPingedRecently) {
          const pingProgress = timeSincePing / 1200;
          const rippleRadius = 6 + pingProgress * 28;
          ctx.beginPath();
          ctx.arc(tx, ty, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${1 - pingProgress})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Draw Target Blip Node
        const isCurrent = target.id === activeTargetId;
        ctx.beginPath();
        ctx.arc(tx, ty, isCurrent ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? "#38bdf8" : target.latency < 50 ? "#2dd4bf" : "#f59e0b";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = isCurrent ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label beside target
        ctx.fillStyle = isCurrent ? "#ffffff" : "rgba(226, 232, 240, 0.75)";
        ctx.font = isCurrent ? "bold 10px monospace" : "9px monospace";
        ctx.fillText(`${target.name.split(" ")[0]} (${target.latency}ms)`, tx + 8, ty + 3);
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [sweepSpeed, activeTargetId, targets]);

  const handleSimulateSpike = () => {
    setIsDDoSSimulating(true);
    setTargets((prev) =>
      prev.map((t) => ({
        ...t,
        latency: t.latency * 2.8,
        status: t.id === "iad" ? "high" : "nominal",
      }))
    );

    setTimeout(() => {
      setTargets(INITIAL_TARGETS);
      setIsDDoSSimulating(false);
    }, 3200);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Radar Screen (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            ref={containerRef}
            className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-2xl border border-sky-950/80 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

            {/* Top HUD Overlay */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-zinc-900/80 backdrop-blur-md text-sky-400 text-xs font-mono">
                <Radar size={13} className="animate-spin" />
                <span>Global Edge Telemetry &amp; Sonar HUD</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
                <ShieldCheck size={13} />
                <span>TLS 1.3 Strict • 0.0% Packet Drop</span>
              </div>
            </div>

            {/* Bottom HUD Quick Status */}
            <div className="relative z-10 p-4 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 text-[11px]">
                Active Edge Sweep: <strong className="text-sky-400">360° Synchronous</strong>
              </span>
              <span className="bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 text-[11px] text-zinc-300">
                5 PoPs Online
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="p-4 rounded-xl border border-theme-border bg-theme-surface/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-theme-muted">Sweep Velocity:</span>
              <input
                type="range"
                min={0.6}
                max={2.4}
                step={0.2}
                value={sweepSpeed}
                onChange={(e) => setSweepSpeed(Number(e.target.value))}
                className="accent-sky-400 h-1.5 w-24 cursor-pointer bg-theme-border rounded-lg"
              />
              <span className="text-theme-primary font-bold w-6">{sweepSpeed.toFixed(1)}x</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSimulateSpike}
                disabled={isDDoSSimulating}
                className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all font-mono text-xs cursor-pointer disabled:opacity-50"
              >
                {isDDoSSimulating ? "Rerouting Traffic..." : "⚡ Simulate Traffic Spike"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSweepSpeed(1.2);
                  setTargets(INITIAL_TARGETS);
                }}
                className="p-1.5 rounded-md border border-theme-border hover:bg-theme-hover text-theme-muted hover:text-theme-primary transition-colors"
                title="Reset Defaults"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Selected Node Telemetry Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted font-semibold block px-1">
            Active Edge Gateway Inspector
          </span>

          {/* Target List */}
          <div className="flex flex-col gap-2">
            {targets.map((t) => {
              const isSelected = t.id === activeTargetId;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTargetId(t.id)}
                  className={`p-3 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "border-sky-400 bg-theme-surface shadow-md"
                      : "border-theme-border bg-theme-surface/50 hover:bg-theme-surface hover:border-theme-border-strong"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        t.latency < 50
                          ? "bg-emerald-400"
                          : t.latency < 100
                          ? "bg-sky-400"
                          : "bg-amber-400"
                      } ${isSelected ? "animate-ping" : ""}`}
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold font-sans text-theme-primary truncate">
                        {t.name}
                      </h4>
                      <span className="text-[10px] font-mono text-theme-muted truncate block">
                        {t.region} • {t.protocol}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      t.latency < 50
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : t.latency < 100
                        ? "text-sky-400 bg-sky-500/10 border border-sky-500/20"
                        : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                    }`}
                  >
                    {t.latency}ms
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector Box */}
          <div className="p-4 sm:p-5 rounded-2xl border border-theme-border bg-theme-surface/80 backdrop-blur-xl flex flex-col gap-3 mt-1 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-theme-border pb-2.5">
              <span className="text-theme-primary font-bold">{activeTarget.name}</span>
              <span className="text-theme-accent">{activeTarget.region}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-theme-muted block">Observed Latency:</span>
                <span className="text-theme-primary font-bold text-sm">{activeTarget.latency}ms</span>
              </div>
              <div>
                <span className="text-theme-muted block">Transport Protocol:</span>
                <span className="text-theme-primary font-bold">{activeTarget.protocol}</span>
              </div>
            </div>

            <div className="text-[11px] text-theme-secondary pt-2 border-t border-theme-border/60 leading-relaxed font-sans">
              Distributed edge node synchronizing background tasks, WebRTC signals, and RAG vector cache layers with sub-millisecond local dispatch.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
