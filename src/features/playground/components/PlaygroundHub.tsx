"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Split,
  Flame,
  FileText,
  GitBranch,
  Activity,
  Terminal,
  Zap,
  Layers,
  ArrowLeft,
  Compass,
} from "lucide-react";
import { EngineeringComparisonSandbox } from "./EngineeringComparisonSandbox";
import { NeoBrutalistKineticStudio } from "./NeoBrutalistKineticStudio";
import { SwissEditorialSpec } from "./SwissEditorialSpec";
import { GitDiffVisualizer } from "./GitDiffVisualizer";
import { ApiBenchmarkSandbox } from "./ApiBenchmarkSandbox";
import { DevTerminalRunner } from "./DevTerminalRunner";
import { NeuralParticleCanvas } from "./NeuralParticleCanvas";
import { TiltCardShowcase } from "./TiltCardShowcase";

type LabTab =
  | "all"
  | "scrubber"
  | "brutalist"
  | "swiss"
  | "git"
  | "benchmark"
  | "terminal"
  | "mesh"
  | "tilt";

export function PlaygroundHub() {
  const [activeTab, setActiveTab] = useState<LabTab>("all");

  const tabs: Array<{ id: LabTab; label: string; icon: React.ElementType; badge: string }> = [
    { id: "all", label: "All Styles (8)", icon: Sparkles, badge: "Full Suite" },
    { id: "scrubber", label: "Before / After Scrubber", icon: Split, badge: "UX & Engineering" },
    { id: "brutalist", label: "Neo-Brutalist Kinetic", icon: Flame, badge: "Raw & Kinetic" },
    { id: "swiss", label: "Swiss Architectural", icon: FileText, badge: "Light Editorial" },
    { id: "git", label: "Git DAG & Code Diff", icon: GitBranch, badge: "Dev Inspector" },
    { id: "benchmark", label: "API Benchmark Sandbox", icon: Activity, badge: "SLA Stress" },
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
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-sm"
                  : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
              }`}
            >
              <Icon size={13} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] hidden md:inline px-1.5 py-0.2 rounded ${
                  isSelected
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

      {/* Module 2: Neo-Brutalist Kinetic Studio */}
      {(activeTab === "all" || activeTab === "brutalist") && (
        <section id="brutalist" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-semibold block mb-0.5">
                Developer Style 02 • High-Impact Brutalism
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-theme-primary">
                Neo-Brutalist Kinetic Canvas
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Solid 3px borders, 0-blur offset shadows, draggable stack badges &amp; ticker
            </span>
          </div>

          <NeoBrutalistKineticStudio />
        </section>
      )}

      {/* Module 3: Swiss Editorial & Architectural Minimalism */}
      {(activeTab === "all" || activeTab === "swiss") && (
        <section id="swiss" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Developer Style 03 • Senior Engineering Restraint
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Swiss Editorial &amp; Architectural Minimalism
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              1px structural grids, masked text reveal, live coordinates &amp; SLA simulator
            </span>
          </div>

          <SwissEditorialSpec />
        </section>
      )}

      {/* Module 4: Git Branch DAG & Live Code Diff Inspector */}
      {(activeTab === "all" || activeTab === "git") && (
        <section id="git" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold block mb-0.5">
                Developer Style 04 • Codebase Telemetry
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Interactive Git Branch DAG &amp; Real Code Diff Inspector
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Unified and split code diffs with line changes for Bedrock, FFmpeg &amp; WebRTC
            </span>
          </div>

          <GitDiffVisualizer />
        </section>
      )}

      {/* Module 5: API Benchmark & Latency Stress Sandbox */}
      {(activeTab === "all" || activeTab === "benchmark") && (
        <section id="benchmark" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-0.5">
                Developer Style 05 • Backend Performance
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Production API Benchmark &amp; Latency Stress Sandbox
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Live p50/p90/p99 latency distribution, concurrent worker simulation &amp; JSON payload
            </span>
          </div>

          <ApiBenchmarkSandbox />
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
