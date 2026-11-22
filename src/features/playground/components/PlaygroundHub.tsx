"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Workflow,
  Terminal,
  Layers,
  ArrowLeft,
  Compass,
  Zap,
} from "lucide-react";
import { ArchitectureExplorer } from "./ArchitectureExplorer";
import { NeuralParticleCanvas } from "./NeuralParticleCanvas";
import { DevTerminalRunner } from "./DevTerminalRunner";
import { TiltCardShowcase } from "./TiltCardShowcase";

type LabTab = "all" | "architecture" | "canvas" | "terminal" | "tilt";

export function PlaygroundHub() {
  const [activeTab, setActiveTab] = useState<LabTab>("all");

  const tabs: Array<{ id: LabTab; label: string; icon: React.ElementType; badge: string }> = [
    { id: "all", label: "All Experiments", icon: Sparkles, badge: "4 Modules" },
    { id: "architecture", label: "AI Pipeline Explorer", icon: Workflow, badge: "System Graph" },
    { id: "canvas", label: "Neural Particle Mesh", icon: Zap, badge: "60fps Canvas" },
    { id: "terminal", label: "Dev Terminal Runner", icon: Terminal, badge: "Interactive CLI" },
    { id: "tilt", label: "3D Perspective Tilt", icon: Layers, badge: "Gyroscopic 3D" },
  ];

  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16">
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
          <span>Interactive Engineering Sandbox • Next.js 16</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col items-start max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4 font-medium">
          <Compass size={13} className="flex-shrink-0" />
          <span>Interactive Graphics &amp; Animation Lab</span>
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-sans text-theme-primary tracking-tight mb-4 break-words">
          The Engineering <span className="text-theme-accent">Playground</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-theme-secondary font-light leading-relaxed">
          A dedicated interactive laboratory showcasing real-time graphics, system simulation graphs, terminal command runners, and 3D physics micro-interactions engineered for the portfolio.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-theme-border bg-theme-surface/70 backdrop-blur-xl max-w-full">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-sm"
                  : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] hidden sm:inline px-1.5 py-0.2 rounded ${
                  isSelected ? "bg-black/20 text-white dark:text-zinc-950" : "bg-theme-surface text-theme-muted"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Experiment 1: AI Pipeline Architecture Explorer */}
      {(activeTab === "all" || activeTab === "architecture") && (
        <section id="architecture" className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Experiment 01 • System Flowchart
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Interactive AI &amp; Systems Architecture Explorer
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Live simulation + telemetry inspection
            </span>
          </div>

          <ArchitectureExplorer />
        </section>
      )}

      {/* Experiment 2: Neural Particle Mesh */}
      {(activeTab === "all" || activeTab === "canvas") && (
        <section id="canvas" className="flex flex-col gap-5 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Experiment 02 • 60fps Canvas
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

      {/* Experiment 3: Dev Terminal Runner */}
      {(activeTab === "all" || activeTab === "terminal") && (
        <section id="terminal" className="flex flex-col gap-5 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Experiment 03 • Interactive CLI
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Developer Terminal &amp; AI Command Runner
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Zsh CLI environment with command history &amp; easter eggs
            </span>
          </div>

          <DevTerminalRunner />
        </section>
      )}

      {/* Experiment 4: 3D Perspective Tilt Showcase */}
      {(activeTab === "all" || activeTab === "tilt") && (
        <section id="tilt" className="flex flex-col gap-5 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Experiment 04 • Micro-Interaction
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
