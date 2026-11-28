"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Split,
  Terminal,
  Zap,
  Layers,
  ArrowLeft,
  Compass,
  Bot,
} from "lucide-react";
import { EngineeringComparisonSandbox } from "./EngineeringComparisonSandbox";
import { DevTerminalRunner } from "./DevTerminalRunner";
import { NeuralParticleCanvas } from "./NeuralParticleCanvas";
import { TiltCardShowcase } from "./TiltCardShowcase";
import { CompanionStudio } from "@/features/companion/components/CompanionStudio";

type LabTab =
  | "all"
  | "companion"
  | "scrubber"
  | "terminal"
  | "mesh"
  | "tilt";

const VALID_TABS = new Set<LabTab>([
  "all",
  "companion",
  "scrubber",
  "terminal",
  "mesh",
  "tilt",
]);

export function PlaygroundHub() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as LabTab | null;
  const initialTab: LabTab = tabParam && VALID_TABS.has(tabParam) ? tabParam : "all";
  const [selectedTab, setActiveTab] = useState<LabTab | null>(null);
  const activeTab = selectedTab ?? initialTab;

  const tabs: Array<{ id: LabTab; label: string; icon: React.ElementType; badge: string }> = [
    { id: "all", label: "All Styles (5)", icon: Sparkles, badge: "Full Suite" },
    { id: "companion", label: "MOCHI-04 Companion", icon: Bot, badge: "60fps Physics" },
    { id: "scrubber", label: "Before / After Scrubber", icon: Split, badge: "UX & Engineering" },
    { id: "terminal", label: "Dev Zsh Terminal", icon: Terminal, badge: "Interactive CLI" },
    { id: "mesh", label: "Neural Particle Mesh", icon: Zap, badge: "60fps Canvas" },
    { id: "tilt", label: "3D Perspective Tilt", icon: Layers, badge: "Gyroscope" },
  ];

  return (
    <div className="w-full flex flex-col gap-10 sm:gap-14">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-theme-muted hover:text-theme-primary transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio Home</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-theme-secondary">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Developer Graphics &amp; Engineering Laboratory</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col items-start max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4 font-medium">
          <Compass size={13} className="flex-shrink-0" />
          <span>Engineering Aesthetics &amp; Interaction Laboratory</span>
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-sans text-theme-primary tracking-tight mb-4 break-words">
          Developer <span className="text-theme-accent">Style Playground</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-theme-secondary font-light leading-relaxed">
          Explore production-grade developer graphic styles: from razor-sharp Before/After comparison scrubbers and raw Neo-Brutalist kinetic physics to Swiss architectural minimalism, Git DAG diff inspectors, and live API benchmark stress testers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl border border-theme-border bg-theme-surface/70 backdrop-blur-xl max-w-full">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${isSelected
                ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
                }`}
            >
              <Icon size={13} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] hidden md:inline px-1.5 py-0.2 rounded ${isSelected
                  ? "bg-black/20 text-white dark:text-zinc-950"
                  : "bg-theme-surface text-theme-muted"
                  }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Module 0: MOCHI-04 Interactive AI Companion Studio */}
      {(activeTab === "all" || activeTab === "companion") && (
        <section id="companion" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF6B4A] font-semibold block mb-0.5">
                Interactive Studio • 60fps RK4 Physics &amp; Canvas FX
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                MOCHI-04 Playful Multi-Style AI Companion
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              4 chassis styles, 12 reactive moods, throwable snacks, portal gun &amp; Web Audio SFX
            </span>
          </div>

          <CompanionStudio />
        </section>
      )}

      {/* Module 1: Clean Before / After Draggable Scrubber */}
      {(activeTab === "all" || activeTab === "scrubber") && (
        <section id="scrubber" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-0.5">
                Developer Style 01 • Engineering Impact Scrubber
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Clean Before / After Draggable Scrubber
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Hairline vertical divider handle with pure CSS clip-path &amp; pointer drag
            </span>
          </div>

          <EngineeringComparisonSandbox />
        </section>
      )}




      {/* Module 6: Dev Terminal Runner */}
      {(activeTab === "all" || activeTab === "terminal") && (
        <section id="terminal" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Developer Style 06 • Interactive CLI
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Developer Terminal &amp; AI Command Runner
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Zsh CLI environment with interactive commands &amp; easter eggs
            </span>
          </div>

          <DevTerminalRunner />
        </section>
      )}

      {/* Module 7: Neural Particle Mesh */}
      {(activeTab === "all" || activeTab === "mesh") && (
        <section id="mesh" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Developer Style 07 • 60fps Canvas
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Interactive Neural Particle Mesh
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Cursor gravitational physics &amp; dynamic proximity hairlines
            </span>
          </div>

          <NeuralParticleCanvas />
        </section>
      )}

      {/* Module 8: 3D Perspective Tilt Showcase */}
      {(activeTab === "all" || activeTab === "tilt") && (
        <section id="tilt" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Developer Style 08 • 3D Physics
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                3D Spring-Physics Gyroscopic Tilt &amp; Glare
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Perspective transform matrix with dynamic specular light reflection
            </span>
          </div>

          <TiltCardShowcase />
        </section>
      )}
    </div>
  );
}
