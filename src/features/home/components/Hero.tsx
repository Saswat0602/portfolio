"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Layers, Cpu, Mail, Compass, BookmarkCheck, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import { userData } from "@/lib/data";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

import { useRef, useCallback } from "react";

export function Hero() {
  const { aesthetic } = useAestheticTheme();
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty("--hero-x", `${x}px`);
    heroRef.current.style.setProperty("--hero-y", `${y}px`);
  }, []);

  const coreCompetencies = [
    { label: "Full Stack (Next.js 15 / React 19 / Node)", icon: Layers },
    { label: "AWS Bedrock & Enterprise RAG", icon: Cpu },
    { label: "Agentic Copilots & LangGraph", icon: Workflow },
    { label: "Automated FFmpeg & Video Pipelines", icon: Zap },
  ];

  const highlights = [
    { value: "98%", label: "Action Execution Success" },
    { value: "384ms", label: "P95 Vector Retrieval Latency" },
    { value: "-60%", label: "Batch Turnaround Reduction" },
    { value: "190k", label: "Production LOC Delivered" },
  ];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 pb-16 sm:pb-20 bg-theme-base text-theme-primary transition-colors duration-300 max-w-full"
    >
      {/* Dynamic Background: 32px Animated Dot Matrix Drift with Radial Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[400px] bg-theme-accent/10 blur-[150px] rounded-full transition-colors duration-500" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-theme-accent/5 blur-[140px] rounded-full transition-colors duration-500" />

        {/* Interactive Pointer Radial Spotlight behind Dot Matrix */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(600px circle at var(--hero-x, 50%) var(--hero-y, 40%), var(--color-accent-subtle), transparent 70%)",
          }}
        />

        {/* 32px Continuous Linear Drift Dot Grid with Radial Vignette */}
        <div className="absolute inset-0 dot-grid-drift opacity-60 transition-opacity duration-500" />

        {/* 24px Structural Hairlines for Blueprint mode */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            aesthetic === "blueprint" ? "opacity-100 blueprint-grid-24" : "opacity-0"
          }`}
        />

        {/* Gradient fade to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-base/50 to-theme-base" />

        {/* Blueprint Telemetry Watermark Corner Stamps */}
        <div className="blueprint-only hidden lg:flex justify-between items-start absolute inset-x-8 top-24 text-[10px] font-mono text-theme-muted/50 select-none pointer-events-none tracking-widest">
          <div>
            <span>[COORD: 20.2961° N, 85.8245° E]</span>
            <span className="block mt-0.5">BHUBANESWAR // SYS_ID: NETTANTRA_SDE1</span>
          </div>
          <div className="text-right">
            <span>[GRID: 32PX_DRIFT_MATRIX]</span>
            <span className="block mt-0.5">STATUS: ALL_SYSTEMS_OPERATIONAL</span>
          </div>
        </div>

        {/* Editorial Craft Watermark */}
        <div className="editorial-only hidden lg:flex justify-between items-center absolute inset-x-10 top-24 text-xs font-serif italic text-theme-muted/50 select-none pointer-events-none tracking-wider">
          <span>Volume IV — Production Engineering Record</span>
          <span>NetTantra Technologies • Saswat Ranjan Mohanty</span>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center w-full">
        {/* Aesthetic-Specific Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-2xl sm:rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-xl mb-6 sm:mb-8 shadow-sm max-w-full text-center ${
            aesthetic === "blueprint" ? "blueprint-crosshair" : ""
          }`}
        >
          {aesthetic === "blueprint" ? (
            <>
              <div className="flex items-center gap-1.5 text-xs font-mono text-theme-accent">
                <Compass size={13} className="flex-shrink-0" />
                <span>SPEC // FULL-STACK &amp; APPLIED AI</span>
              </div>
              <span className="text-theme-border hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-theme-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>3+ YOE • NETTANTRA TECHNOLOGIES SDE 1</span>
              </div>
              <span className="text-theme-border hidden sm:inline">|</span>
              <div className="flex items-center gap-1 text-xs font-mono text-theme-muted">
                <MapPin size={12} className="text-amber-500 flex-shrink-0" />
                <span>20.2961° N, 85.8245° E</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-xs font-serif italic text-theme-accent font-medium">
                <BookmarkCheck size={13} className="flex-shrink-0" />
                <span>Software Engineer • Full-Stack &amp; Applied AI</span>
              </div>
              <span className="text-theme-border hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-xs font-sans text-theme-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>NetTantra Technologies • 3+ YOE</span>
              </div>
              <span className="text-theme-border hidden sm:inline">•</span>
              <div className="flex items-center gap-1 text-xs font-sans text-theme-muted">
                <MapPin size={12} className="text-amber-500 flex-shrink-0" />
                <span>Bhubaneswar, India</span>
              </div>
            </>
          )}
        </motion.div>

        {/* Dynamic Headline: Outfit/Sans (Blueprint) vs Instrument Serif (Editorial) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-4 sm:mb-6 w-full px-2"
        >
          {aesthetic === "editorial" ? (
            <>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal font-serif tracking-tight text-theme-primary mb-3 sm:mb-4 leading-[1.05] sm:leading-[0.95] break-words">
                <span className="italic block sm:inline">Saswat</span> Ranjan Mohanty
              </h1>
              <p className="text-base xs:text-lg sm:text-2xl md:text-3xl font-serif text-theme-accent tracking-normal max-w-3xl mx-auto leading-relaxed">
                <span className="italic">Architecting</span> high-performance web systems, distributed microservices, and <span className="italic">applied AI &amp; agentic copilots</span>.
              </p>
            </>
          ) : (
            <>
              <div className="inline-block mb-1.5 max-w-full">
                <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.08em] xs:tracking-[0.15em] sm:tracking-[0.2em] text-theme-accent bg-theme-accent-subtle px-2 sm:px-2.5 py-0.5 rounded border border-theme-border break-all xs:break-normal max-w-full inline-block">
                  [SOFTWARE_ENGINEER // FULL_STACK_APPLIED_AI]
                </span>
              </div>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-sans tracking-tight text-theme-primary mb-3 sm:mb-4 break-words">
                {userData.name}
              </h1>
              <p className="text-sm sm:text-lg md:text-xl font-mono font-medium tracking-tight text-theme-accent">
                Full-Stack Systems • Applied AI Copilots • Video Pipelines • pgvector RAG
              </p>
            </>
          )}
        </motion.div>

        {/* Introduction Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className={`max-w-3xl text-sm sm:text-base md:text-lg text-theme-secondary mb-8 sm:mb-10 leading-relaxed font-light px-2 ${
            aesthetic === "editorial" ? "font-sans leading-relaxed" : "font-sans"
          }`}
        >
          Software Engineer (SDE 1) at NetTantra Technologies with 3+ years of production experience shipping high-throughput web apps, cross-platform mobile apps, automated video generation pipelines, and agentic copilots.
        </motion.p>

        {/* Core Competencies Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 max-w-3xl px-1"
        >
          {coreCompetencies.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-theme-border bg-theme-surface/80 backdrop-blur-md text-[11px] sm:text-xs text-theme-secondary shadow-sm hover:border-theme-accent hover:text-theme-primary transition-all duration-200 ${
                aesthetic === "editorial" ? "font-sans" : "font-mono"
              }`}
            >
              <Icon size={14} className="text-theme-accent flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Call to Actions with Specular Sheen Button Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none"
        >
          <Link
            href="/projects"
            className="btn-sheen group flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 font-semibold text-sm transition-all hover:brightness-110 shadow-md hover:shadow-lg active:scale-[0.98] w-full sm:w-auto"
          >
            <span>Explore Shipped Projects</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-theme-border bg-theme-surface/70 backdrop-blur-md text-theme-secondary font-medium text-sm transition-all hover:bg-theme-hover hover:border-theme-border-strong hover:text-theme-primary w-full sm:w-auto"
          >
            <Mail size={15} />
            <span>Direct Contact</span>
          </a>
        </motion.div>

        {/* Key Metrics Strip with EaseOutExpo Animated Counter on Spotlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-6 sm:pt-8 border-t border-theme-border"
        >
          {highlights.map((item, idx) => (
            <SpotlightCard
              key={idx}
              className="flex flex-col items-center p-3 sm:p-4 rounded-xl border border-theme-border/60 bg-theme-surface/50 backdrop-blur-sm hover:border-theme-accent/60 transition-colors"
            >
              <span
                className={`text-xl sm:text-2xl md:text-3xl font-black mb-1 text-theme-primary ${
                  aesthetic === "editorial" ? "font-serif text-theme-accent" : "font-mono"
                }`}
              >
                <AnimatedCounter value={item.value} />
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-theme-muted text-center leading-snug">
                {item.label}
              </span>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
