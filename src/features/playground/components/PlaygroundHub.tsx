"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Waves,
  Radio,
  Radar,
  Terminal,
  Layers,
  Zap,
  ArrowLeft,
  Compass,
  Cpu,
} from "lucide-react";
import { FluidFlowFieldCanvas } from "./FluidFlowFieldCanvas";
import { AudioSpectrumVisualizer } from "./AudioSpectrumVisualizer";
import { RadarTelemetryScanner } from "./RadarTelemetryScanner";
import { MagneticSpringDock } from "./MagneticSpringDock";
import { NeuralParticleCanvas } from "./NeuralParticleCanvas";
import { DevTerminalRunner } from "./DevTerminalRunner";
import { TiltCardShowcase } from "./TiltCardShowcase";

type LabTab =
  | "all"
  | "flowfield"
  | "audio"
  | "radar"
  | "dock"
  | "canvas"
  | "terminal"
  | "tilt";

export function PlaygroundHub() {
  const [activeTab, setActiveTab] = useState<LabTab>("all");

  const tabs: Array<{ id: LabTab; label: string; icon: React.ElementType; badge: string }> = [
    { id: "all", label: "All Showcase (6)", icon: Sparkles, badge: "Full Suite" },
    { id: "flowfield", label: "Fluid Flowfield", icon: Waves, badge: "Generative Waves" },
    { id: "audio", label: "Web Audio Spectrum", icon: Radio, badge: "Oscilloscope" },
    { id: "radar", label: "Sonar Edge Radar", icon: Radar, badge: "360° HUD" },
    { id: "dock", label: "Magnetic Spring Dock", icon: Cpu, badge: "Gaussian Physics" },
    { id: "canvas", label: "Neural Particle Mesh", icon: Zap, badge: "60fps Mesh" },
    { id: "terminal", label: "Dev Terminal Runner", icon: Terminal, badge: "Interactive CLI" },
    { id: "tilt", label: "3D Perspective Tilt", icon: Layers, badge: "3D Gyroscope" },
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
          <span>Graphics &amp; Animation Laboratory • Next.js 16</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col items-start max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4 font-medium">
          <Compass size={13} className="flex-shrink-0" />
          <span>Creative Engineering &amp; Interactive Graphics</span>
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-sans text-theme-primary tracking-tight mb-4 break-words">
          The Engineering <span className="text-theme-accent">Playground</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-theme-secondary font-light leading-relaxed">
          A collection of real-time interactive graphic styles: mathematical vector flowfields, WebRTC audio spectrums, 360° sonar edge radars, Apple-grade magnetic spring docks, and 3D perspective physics.
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

      {/* Module 1: Fluid Vector Flowfield Canvas */}
      {(activeTab === "all" || activeTab === "flowfield") && (
        <section id="flowfield" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Graphic Style 01 • Generative Math Art
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Fluid Vector Flowfield &amp; Vortex Ripples
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Multiscale trigonometric force fields with interactive cursor vortex
            </span>
          </div>

          <FluidFlowFieldCanvas />
        </section>
      )}

      {/* Module 2: Audio Spectrum & Oscilloscope Visualizer */}
      {(activeTab === "all" || activeTab === "audio") && (
        <section id="audio" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Graphic Style 02 • Web Audio &amp; WebRTC
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Real-Time Audio Spectrum &amp; Waveform Oscilloscope
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Frequency equalizer bars, multi-layer sine waves &amp; radial radar
            </span>
          </div>

          <AudioSpectrumVisualizer />
        </section>
      )}

      {/* Module 3: Global Edge Sonar Telemetry Radar */}
      {(activeTab === "all" || activeTab === "radar") && (
        <section id="radar" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Graphic Style 03 • Sci-Fi Telemetry HUD
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Global Edge Sonar &amp; Network Radar Scanner
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              360° sweeping beam with expanding shockwave pings &amp; latency inspector
            </span>
          </div>

          <RadarTelemetryScanner />
        </section>
      )}

      {/* Module 4: Magnetic Spring Dock */}
      {(activeTab === "all" || activeTab === "dock") && (
        <section id="dock" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Graphic Style 04 • Micro-Interaction Physics
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                Apple-Grade Magnetic Spring Magnification Dock
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Gaussian distance magnification with silky spring return
            </span>
          </div>

          <MagneticSpringDock />
        </section>
      )}

      {/* Module 5: Neural Particle Mesh */}
      {(activeTab === "all" || activeTab === "canvas") && (
        <section id="canvas" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Graphic Style 05 • 60fps Canvas
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

      {/* Module 6: Dev Terminal Runner */}
      {(activeTab === "all" || activeTab === "terminal") && (
        <section id="terminal" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Graphic Style 06 • Interactive CLI
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

      {/* Module 7: 3D Perspective Tilt Showcase */}
      {(activeTab === "all" || activeTab === "tilt") && (
        <section id="tilt" className="flex flex-col gap-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-0.5">
                Graphic Style 07 • 3D Physics
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
