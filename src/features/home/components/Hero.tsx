"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Layers, Cpu, Mail, Compass, Workflow, Smartphone, FileText } from "lucide-react";
import { userData } from "@/lib/data";
import { CoordinateInkButton } from "@/components/ui/CoordinateInkButton";

import { useRef, useCallback } from "react";
import { useCompanionReaction } from "@/features/companion/context/CompanionReactionContext";
import { ElasticHeroName } from "./ElasticHeroName";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { notifyHover, notifyAction } = useCompanionReaction();

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
    { label: "Mobile Applications (React Native)", icon: Smartphone },
    { label: "Agent & AI Integration (GenAI)", icon: Workflow },
    { label: "AWS Bedrock & Enterprise RAG", icon: Cpu },
  ];



  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 pb-16 sm:pb-20 bg-theme-base text-theme-primary transition-colors duration-300 max-w-full"
    >
      {/* Dynamic Background: Blueprint Grid & Ambient Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[400px] bg-theme-accent/10 blur-[150px] rounded-full transition-colors duration-500" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-theme-accent/5 blur-[140px] rounded-full transition-colors duration-500" />

        {/* Interactive Pointer Radial Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(600px circle at var(--hero-x, 50%) var(--hero-y, 40%), var(--color-accent-subtle), transparent 70%)",
          }}
        />

        {/* 24px Structural Hairlines with Smooth Radial Vignette Mask */}
        <div className="absolute inset-0 opacity-100 blueprint-grid-24" />

        {/* Gradient fade to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-base/50 to-theme-base" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center w-full">
        {/* Status & Focus Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-theme-border bg-theme-surface/85 backdrop-blur-xl mb-6 sm:mb-8 shadow-xs max-w-full text-center"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-theme-accent font-medium">
            <Compass size={13} className="flex-shrink-0" />
            <span>Full-Stack Systems &amp; Applied AI</span>
          </div>
          <span className="text-theme-border hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-theme-secondary">
            <span>3+ YOE • NetTantra Technologies SDE 1</span>
          </div>
          <span className="text-theme-border hidden sm:inline">•</span>
          <div className="flex items-center gap-1 text-xs font-mono text-theme-muted">
            <MapPin size={12} className="text-theme-accent flex-shrink-0" />
            <span>Bhubaneswar, India</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-4 sm:mb-6 w-full px-2"
        >
          <ElasticHeroName
            name={userData.name}
            onRippleClick={() => notifyAction("hearts", "WHOA—WOBBLY TYPOGRAPHY!!")}
          />
          <p className="text-sm sm:text-lg md:text-xl font-mono font-medium tracking-tight text-theme-accent">
            Full-Stack Systems • Mobile Applications • Agent &amp; AI Integration • GenAI &amp; RAG
          </p>
        </motion.div>

        {/* Introduction Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl text-sm sm:text-base md:text-lg text-theme-secondary mb-8 sm:mb-10 leading-relaxed font-light px-2 font-sans"
        >
          Software Engineer (SDE 1) at NetTantra Technologies with 3+ years of production experience shipping high-throughput web apps, cross-platform mobile applications, automated video generation pipelines, and agentic AI integrations.
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
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-theme-border bg-theme-surface/80 backdrop-blur-md text-[11px] sm:text-xs text-theme-secondary shadow-sm hover:border-theme-accent hover:text-theme-primary transition-all duration-200 font-mono"
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
          <CoordinateInkButton
            href="/projects"
            onMouseEnter={() => notifyHover("projects", "Let's inspect the shipped systems!")}
            onMouseLeave={() => notifyHover(null)}
            label="Explore Shipped Projects"
            variant="primary"
            size="md"
            rounded="xl"
            icon={<ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
            className="w-full sm:w-auto"
          />

          <CoordinateInkButton
            href="/saswat_ranjan_mohanty.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => notifyHover("resume", "Clean engineering track record. Zero fluff.")}
            onMouseLeave={() => notifyHover(null)}
            label="Resume (PDF)"
            variant="accent"
            size="md"
            rounded="xl"
            icon={<FileText size={15} className="text-theme-accent" />}
            iconPosition="left"
            className="w-full sm:w-auto font-mono"
          />

          <CoordinateInkButton
            href="#contact"
            onMouseEnter={() => notifyHover("hire", "YES! Let's build something awesome together!")}
            onMouseLeave={() => notifyHover(null)}
            onClick={() => notifyAction("backflip", "Incoming message! Doing a celebratory flip!")}
            label="Direct Contact"
            variant="secondary"
            size="md"
            rounded="xl"
            icon={<Mail size={15} />}
            iconPosition="left"
            className="w-full sm:w-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
