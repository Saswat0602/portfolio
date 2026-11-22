"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Sliders, RotateCcw } from "lucide-react";
import { userData } from "@/lib/data";

interface TiltCardProps {
  title: string;
  category: string;
  metrics: string;
  image: string;
  technologies: string[];
  maxTilt: number;
  glareEnabled: boolean;
}

function InteractiveTiltCard({
  title,
  category,
  metrics,
  image,
  technologies,
  maxTilt,
  glareEnabled,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>("");
  const [glareStyle, setGlareStyle] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateX = -percentY * maxTilt;
    const rotateY = percentX * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    if (glareEnabled) {
      setGlareStyle({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.35,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.18s cubic-bezier(0.2, 0, 0, 1)",
        transformStyle: "preserve-3d",
      }}
      className="relative rounded-2xl border border-theme-border bg-theme-surface/90 overflow-hidden shadow-xl hover:shadow-2xl hover:border-theme-accent cursor-pointer group flex flex-col justify-between select-none"
    >
      {/* Glare Reflection Layer */}
      {glareEnabled && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle 350px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.25), transparent 70%)`,
          }}
        />
      )}

      {/* Card Header & Media */}
      <div>
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/40">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/40 to-transparent" />

          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full border border-theme-border bg-theme-surface/85 backdrop-blur-md text-theme-accent font-mono font-medium">
              {category}
            </span>
            <span className="p-1.5 rounded-full bg-theme-surface/80 border border-theme-border text-theme-muted group-hover:text-theme-accent transition-colors">
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-theme-accent-subtle border border-theme-border text-[10px] font-mono text-theme-accent font-medium mb-2.5">
            <Sparkles size={11} className="flex-shrink-0" />
            <span className="truncate">{metrics}</span>
          </div>

          <h4 className="text-base sm:text-lg font-bold font-sans text-theme-primary mb-2 group-hover:text-theme-accent transition-colors">
            {title}
          </h4>

          <div className="flex flex-wrap gap-1 mt-3">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-theme-surface-elevated text-theme-secondary border border-theme-border/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-theme-border flex items-center justify-between text-[11px] font-mono text-theme-muted">
        <span>3D Physics Active</span>
        <span className="text-theme-accent font-semibold">Hover to Tilt</span>
      </div>
    </div>
  );
}

export function TiltCardShowcase() {
  const [maxTilt, setMaxTilt] = useState<number>(14);
  const [glareEnabled, setGlareEnabled] = useState<boolean>(true);

  const showcaseProjects = userData.Projects.slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Controls Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-theme-border bg-theme-surface/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-theme-primary font-semibold">
          <Sliders size={14} className="text-theme-accent" />
          <span>Interactive 3D Perspective Controls</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-theme-muted">Tilt Angle:</span>
            <input
              type="range"
              min={6}
              max={26}
              value={maxTilt}
              onChange={(e) => setMaxTilt(Number(e.target.value))}
              className="accent-sky-400 h-1.5 w-24 sm:w-28 cursor-pointer bg-theme-border rounded-lg"
            />
            <span className="text-theme-primary font-bold w-6">{maxTilt}°</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-theme-muted">Specular Glare:</span>
            <button
              type="button"
              onClick={() => setGlareEnabled(!glareEnabled)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                glareEnabled
                  ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                  : "bg-theme-surface-elevated border border-theme-border text-theme-muted"
              }`}
            >
              {glareEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMaxTilt(14);
              setGlareEnabled(true);
            }}
            className="p-1.5 rounded-md border border-theme-border hover:bg-theme-hover text-theme-muted hover:text-theme-primary transition-colors"
            title="Reset Defaults"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* 3D Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {showcaseProjects.map((project) => (
          <InteractiveTiltCard
            key={project.slug}
            title={project.project_name}
            category={project.category}
            metrics={project.metrics || "Production System"}
            image={project.image}
            technologies={project.technologies}
            maxTilt={maxTilt}
            glareEnabled={glareEnabled}
          />
        ))}
      </div>
    </div>
  );
}
