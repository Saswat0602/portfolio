"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Layers, Cpu, Database, Mail, Compass, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { userData } from "@/lib/data";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

export function Hero() {
  const { aesthetic } = useAestheticTheme();

  const coreCompetencies = [
    { label: "Full Stack (React / Next.js / Node.js)", icon: Layers },
    { label: "AWS Bedrock & RAG Pipelines", icon: Cpu },
    { label: "Agentic AI & LangGraph", icon: Sparkles },
    { label: "Vector Search & Real-Time Comms", icon: Database },
  ];

  const highlights = [
    { number: "3+", label: "Years Engineering Experience" },
    { number: "Full Stack", label: "Web, Mobile & Microservices" },
    { number: "AWS Bedrock", label: "Enterprise RAG & Agentic AI" },
    { number: "HyScaler", label: "Software Engineer (SDE 1)" },
  ];

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-10 pb-20 bg-theme-base text-theme-primary transition-colors duration-300">
      {/* Dynamic Background: 24px Hairline Blueprint Grid OR Warm Editorial Paper Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Glow ambient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[400px] bg-theme-accent/10 blur-[150px] rounded-full transition-colors duration-500" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-theme-accent/5 blur-[140px] rounded-full transition-colors duration-500" />

        {/* 24px Structural Hairlines for Blueprint mode */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            aesthetic === "blueprint" ? "opacity-100 blueprint-grid-24" : "opacity-20"
          }`}
        />

        {/* Gradient fade to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-base/50 to-theme-base" />

        {/* Blueprint Telemetry Watermark Corner Stamps */}
        <div className="blueprint-only hidden lg:flex justify-between items-start absolute inset-x-8 top-24 text-[10px] font-mono text-theme-muted/50 select-none pointer-events-none tracking-widest">
          <div>
            <span>[COORD: 20.2961° N, 85.8245° E]</span>
            <span className="block mt-0.5">BHUBANESWAR // SYS_ID: HYSCALER_SDE1</span>
          </div>
          <div className="text-right">
            <span>[GRID: 24PX_STRUCTURAL_HAIRLINE]</span>
            <span className="block mt-0.5">STATUS: ALL_SYSTEMS_OPERATIONAL</span>
          </div>
        </div>

        {/* Editorial Craft Watermark */}
        <div className="editorial-only hidden lg:flex justify-between items-center absolute inset-x-10 top-24 text-xs font-serif italic text-theme-muted/50 select-none pointer-events-none tracking-wider">
          <span>Volume III — Production Engineering Record</span>
          <span>HyScaler Engineering Craft • Saswat Ranjan</span>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Aesthetic-Specific Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-xl mb-8 shadow-sm ${
            aesthetic === "blueprint" ? "blueprint-crosshair" : ""
          }`}
        >
          {aesthetic === "blueprint" ? (
            <>
              <div className="flex items-center gap-1.5 text-xs font-mono text-theme-accent">
                <Compass size={13} />
                <span>SPEC // FULL-STACK &amp; AI</span>
              </div>
              <span className="text-theme-border hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-theme-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>3+ YOE • HYSCALER SDE 1</span>
              </div>
              <span className="text-theme-border hidden sm:inline">|</span>
              <div className="flex items-center gap-1 text-xs font-mono text-theme-muted">
                <MapPin size={12} className="text-amber-500" />
                <span>20.2961° N, 85.8245° E</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-xs font-serif italic text-theme-accent font-medium">
                <BookmarkCheck size={13} />
                <span>Artisan Full Stack &amp; Generative AI Systems</span>
              </div>
              <span className="text-theme-border hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-xs font-sans text-theme-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>3+ Years Production Craft</span>
              </div>
              <span className="text-theme-border hidden sm:inline">•</span>
              <div className="flex items-center gap-1 text-xs font-sans text-theme-muted">
                <MapPin size={12} className="text-amber-500" />
                <span>Bhubaneswar, India</span>
              </div>
            </>
          )}
        </motion.div>

        {/* Dynamic Typography: IBM Plex Sans (Blueprint) vs Instrument Serif (Editorial) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-6 w-full"
        >
          {aesthetic === "editorial" ? (
            <>
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-normal font-serif tracking-tight text-theme-primary mb-4 leading-[0.95]">
                <span className="italic block sm:inline">Saswat</span> Ranjan
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-theme-accent tracking-normal max-w-3xl mx-auto leading-relaxed">
                <span className="italic">Architecting</span> high-performance web systems, distributed microservices, and <span className="italic">enterprise AWS Bedrock RAG</span> pipelines.
              </p>
            </>
          ) : (
            <>
              <div className="inline-block mb-1">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-theme-accent bg-theme-accent-subtle px-2.5 py-0.5 rounded border border-theme-border">
                  [SYSTEM_ENGINEER // PRODUCTION_READY]
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-sans tracking-tight text-theme-primary mb-4">
                {userData.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-mono font-medium tracking-tight text-theme-accent">
                Full Stack Development • AWS Bedrock &amp; RAG • Agentic AI
              </p>
            </>
          )}
        </motion.div>

        {/* Introduction Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className={`max-w-3xl text-base sm:text-lg text-theme-secondary mb-10 leading-relaxed font-light ${
            aesthetic === "editorial" ? "font-sans leading-relaxed" : "font-sans"
          }`}
        >
          Full Stack Developer with 3+ years of experience engineering high-performance web applications, cross-platform mobile apps, and modern generative AI architectures with AWS Bedrock, vector search, and agentic workflows.
        </motion.p>

        {/* Core Competencies Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10 max-w-3xl"
        >
          {coreCompetencies.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-theme-border bg-theme-surface/80 backdrop-blur-md text-xs text-theme-secondary shadow-sm hover:border-theme-accent hover:text-theme-primary transition-all duration-200 ${
                aesthetic === "editorial" ? "font-sans" : "font-mono"
              }`}
            >
              <Icon size={14} className="text-theme-accent" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link
            href="/projects"
            className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 font-semibold text-sm transition-all hover:brightness-110 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <span>Explore Shipped Projects</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-theme-accent/40 bg-theme-accent-subtle text-theme-accent font-medium text-sm transition-all hover:bg-theme-accent/20 hover:border-theme-accent"
          >
            <Mail size={15} />
            <span>Email Me</span>
          </a>

          <a
            href="#skills"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-theme-border bg-theme-surface/70 backdrop-blur-md text-theme-secondary font-medium text-sm transition-all hover:bg-theme-hover hover:border-theme-border-strong hover:text-theme-primary"
          >
            <Sparkles size={15} className="text-amber-500" />
            <span>Technical Capabilities</span>
          </a>
        </motion.div>

        {/* Key Metrics Strip (3+ YOE Showcase) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-theme-border"
        >
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 rounded-xl border border-theme-border/60 bg-theme-surface/40 backdrop-blur-sm"
            >
              <span className={`text-2xl sm:text-3xl font-black mb-1 text-theme-primary ${
                aesthetic === "editorial" ? "font-serif text-theme-accent" : "font-mono"
              }`}>
                {item.number}
              </span>
              <span className="text-xs font-mono text-theme-muted text-center">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
