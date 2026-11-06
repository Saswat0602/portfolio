"use client";

import Link from "next/link";
import { userData } from "@/lib/data";
import {
  Brain,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  GraduationCap,
  Briefcase,
  ArrowRight,
  MapPin,
  Mail,
  Compass,
} from "lucide-react";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function AboutOverview() {
  const { aesthetic } = useAestheticTheme();

  const principles = [
    {
      title: "Full Stack & Type-Safe Architecture",
      description:
        "Building scalable web and mobile applications with Next.js, React, React Native, and Node.js, adhering to deterministic contracts, clean architectural separation, and strict TypeScript patterns.",
      icon: Layers,
    },
    {
      title: "Generative AI & Enterprise RAG",
      description:
        "Engineering production AI architectures utilizing AWS Bedrock (Claude & Titan), pgvector hybrid search, autonomous LangGraph workflows, and strict prompt safety guardrails.",
      icon: Brain,
    },
    {
      title: "Low-Latency & Real-Time Performance",
      description:
        "Implementing peer-to-peer WebRTC conferencing, Socket.io bidirectional signaling, Web Audio API processing, and Redis caching for optimal responsiveness.",
      icon: Zap,
    },
    {
      title: "End-to-End Delivery at NetTantra",
      description:
        "Leading features from concept through deployment: cloud storage, microservices, database schemas, and smooth client interfaces with 3+ years of production rigor.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full text-theme-primary">
      {/* Hero / Intro Card */}
      <section className="mb-10 sm:mb-14 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-theme-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
            {aesthetic === "blueprint" ? (
              <span className="px-3 sm:px-3.5 py-1 text-xs font-mono uppercase tracking-wider rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent">
                [SYS // 3+ YOE PRODUCTION ARCHITECT]
              </span>
            ) : (
              <span className="px-3 sm:px-3.5 py-1 text-xs font-serif italic tracking-wide rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent">
                Artisan Engineering • 3+ Years Production Craft
              </span>
            )}
            <span className="text-theme-border hidden xs:inline">•</span>
            <span className="text-xs font-mono text-theme-secondary flex items-center gap-1.5">
              <MapPin size={12} className="text-amber-500" />
              {userData.location}
            </span>
          </div>

          {aesthetic === "editorial" ? (
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-theme-primary tracking-tight leading-tight mb-4 sm:mb-6 font-serif font-normal break-words">
              Engineering Full Stack Platforms &amp; <span className="italic text-theme-accent">Modern AI</span> Systems
            </h1>
          ) : (
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-theme-primary tracking-tight leading-tight mb-4 sm:mb-6 font-sans font-black break-words">
              Engineering Full Stack Platforms &amp; Modern AI Systems
            </h1>
          )}

          <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-theme-secondary font-light leading-relaxed mb-6 sm:mb-8">
            <p>{userData.about.description}</p>
            <p>{userData.about.description2}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/projects"
              className="btn-sheen inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold hover:brightness-110 transition-all shadow-sm w-full sm:w-auto"
            >
              <span>Explore Shipped Projects</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-primary text-xs font-mono transition-all w-full sm:w-auto"
            >
              <Mail size={14} />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy Cards */}
      <section className="mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-accent mb-2">
          {aesthetic === "blueprint" ? <Compass size={14} /> : <Cpu size={14} />}
          <span>{aesthetic === "blueprint" ? "TELEMETRY // PRINCIPLES" : "Core Engineering Principles"}</span>
        </div>
        <h2 className={`text-3xl text-theme-primary tracking-tight mb-8 ${
          aesthetic === "editorial" ? "font-serif font-normal text-4xl" : "font-sans font-black"
        }`}>
          How I Approach Software &amp; AI Engineering
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <SpotlightCard
                key={principle.title}
                className="p-5 sm:p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl hover:border-theme-accent transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl border border-theme-border bg-theme-surface-elevated flex items-center justify-center text-theme-accent mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold text-theme-primary mb-2 group-hover:text-theme-accent transition-colors break-words ${
                    aesthetic === "editorial" ? "font-serif font-normal text-xl" : "font-sans"
                  }`}>
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Experience Summary & Education */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16">
        {/* Experience Overview */}
        <div className="lg:col-span-7 p-5 sm:p-7 md:p-8 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
            <Briefcase size={14} />
            <span>Track Record at NetTantra Technologies</span>
          </div>
          <h3 className={`text-xl sm:text-2xl font-bold text-theme-primary mb-5 sm:mb-6 ${
            aesthetic === "editorial" ? "font-serif font-normal text-2xl sm:text-3xl" : "font-sans"
          }`}>
            Experience Timeline
          </h3>

          <div className="flex flex-col gap-6">
            {userData.experience.map((exp) => (
              <div
                key={exp.title}
                className="pb-6 border-b border-theme-border/60 last:border-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-theme-primary">{exp.title}</h4>
                  <span className="text-xs font-mono text-theme-accent">{exp.duration}</span>
                </div>
                <div className="text-xs font-mono text-theme-muted mb-2">
                  {exp.company} • {exp.location.split("·")[0].trim()}
                </div>
                <p className="text-xs text-theme-secondary font-light leading-relaxed mb-3">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-theme-surface-elevated border border-theme-border text-theme-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Credentials */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
              <GraduationCap size={15} />
              <span>Academic Foundation</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold text-theme-primary mb-5 sm:mb-6 ${
              aesthetic === "editorial" ? "font-serif font-normal text-2xl sm:text-3xl" : "font-sans"
            }`}>
              Education
            </h3>

            <div className="flex flex-col gap-5">
              <div className="p-4 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40">
                <span className="text-xs font-mono uppercase text-theme-accent font-semibold block mb-1">
                  Postgraduate Degree
                </span>
                <h4 className="text-sm font-bold text-theme-primary mb-1">
                  Master of Computer Applications (MCA)
                </h4>
                <p className="text-xs text-theme-secondary font-light">
                  {userData.about.education.postgraduate}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40">
                <span className="text-xs font-mono uppercase text-theme-accent font-semibold block mb-1">
                  Undergraduate Degree
                </span>
                <h4 className="text-sm font-bold text-theme-primary mb-1">
                  Bachelor of Science (BSc)
                </h4>
                <p className="text-xs text-theme-secondary font-light">
                  {userData.about.education.undergraduate}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Technical Stack Snapshot */}
          <div className="p-6 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
            <h4 className="text-xs font-mono uppercase tracking-widest text-theme-muted font-semibold mb-3">
              Key Competencies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                "React",
                "React Native",
                "Next.js",
                "Node.js",
                "TypeScript",
                "AWS Bedrock",
                "Agentic AI",
                "RAG Pipelines",
                "pgvector",
                "MongoDB",
                "PostgreSQL",
                "WebRTC",
                "Docker",
              ].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-theme-border bg-theme-surface-elevated text-theme-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
