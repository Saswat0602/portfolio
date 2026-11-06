"use client";

import Image from "next/image";
import Link from "next/link";
import { type ProjectData } from "@/lib/data";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

interface ProjectDetailViewProps {
  project: ProjectData;
  allProjects: ProjectData[];
}

export function ProjectDetailView({ project, allProjects }: ProjectDetailViewProps) {
  const { aesthetic } = useAestheticTheme();

  // Find next project
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentIndex !== -1 && currentIndex + 1 < allProjects.length
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return (
    <article className="w-full min-h-screen py-12 px-6 sm:px-8 bg-theme-base text-theme-primary transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-theme-muted hover:text-theme-primary transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Top Badges & Title */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent ${
              aesthetic === "editorial" ? "font-serif italic text-sm" : "font-mono"
            }`}>
              {project.category}
            </span>
            {project.metrics && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-500">
                <Sparkles size={12} />
                <span>{project.metrics}</span>
              </span>
            )}
          </div>

          <h1 className={`text-3xl sm:text-5xl md:text-6xl text-theme-primary tracking-tight leading-tight ${
            aesthetic === "editorial" ? "font-serif font-normal" : "font-sans font-black"
          }`}>
            {project.project_name}
          </h1>

          <p className="text-base sm:text-xl text-theme-secondary font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.demo_link && (
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold shadow-sm hover:brightness-110 transition-all"
              >
                <ExternalLink size={14} />
                <span>Explore Live System</span>
              </a>
            )}

            <a
              href={project.code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-primary text-xs font-mono transition-all"
            >
              <Code2 size={14} />
              <span>Source Repository</span>
            </a>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden border border-theme-border bg-black/40 mb-12 shadow-xl">
          <Image
            src={project.image}
            alt={project.project_name}
            fill
            sizes="1200px"
            className="object-cover opacity-85"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-base via-transparent to-transparent" />
        </div>

        {/* Detailed Case Study Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Main Body */}
          <div className="md:col-span-8 flex flex-col gap-10">
            {/* Architectural Overview */}
            <section className="p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
                <Cpu size={14} />
                <span>Executive Overview</span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold text-theme-primary mb-4 ${
                aesthetic === "editorial" ? "font-serif font-normal text-3xl" : "font-sans"
              }`}>
                Architecture &amp; {aesthetic === "editorial" ? <span className="italic text-theme-accent">System Scope</span> : "System Scope"}
              </h2>
              <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
                {project.long_description || project.description}
              </p>
            </section>

            {/* System Architecture Points */}
            {project.architecture && project.architecture.length > 0 && (
              <section className="p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
                  <Layers size={14} />
                  <span>Technical Design</span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold text-theme-primary mb-5 ${
                  aesthetic === "editorial" ? "font-serif font-normal text-3xl" : "font-sans"
                }`}>
                  Core {aesthetic === "editorial" ? <span className="italic text-theme-accent">Architecture</span> : "Architecture"} Components
                </h2>
                <div className="flex flex-col gap-3">
                  {project.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40"
                    >
                      <Zap size={15} className="text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Engineering Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
                  <ShieldCheck size={14} />
                  <span>Production Impact</span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold text-theme-primary mb-5 ${
                  aesthetic === "editorial" ? "font-serif font-normal text-3xl" : "font-sans"
                }`}>
                  Key Results &amp; {aesthetic === "editorial" ? <span className="italic text-theme-accent">Optimizations</span> : "Optimizations"}
                </h2>
                <div className="flex flex-col gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40"
                    >
                      <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Tech Stack Card */}
            <div className="p-6 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-widest text-theme-muted font-semibold mb-4">
                Technologies &amp; Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface-elevated text-xs font-mono text-theme-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="p-6 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl flex flex-col gap-4 text-xs font-mono shadow-sm">
              <h3 className="uppercase tracking-widest text-theme-muted font-semibold mb-1">
                Project Specs
              </h3>

              <div className="flex items-center justify-between pb-3 border-b border-theme-border/60">
                <span className="text-theme-muted">Domain</span>
                <span className="text-theme-primary font-medium">{project.category}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-theme-border/60">
                <span className="text-theme-muted">Deployment</span>
                <span className="text-emerald-500 font-medium">Production Verified</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-theme-muted">Engineering Role</span>
                <span className="text-theme-accent font-medium">Lead Architecture</span>
              </div>
            </div>

            {/* Next Project Teaser */}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-6 rounded-2xl border border-theme-border bg-theme-surface hover:border-theme-accent transition-all flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs font-mono text-theme-muted group-hover:text-theme-accent transition-colors">
                  <span>Next Case Study</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className={`text-sm font-bold text-theme-primary group-hover:text-theme-accent transition-colors line-clamp-1 ${
                  aesthetic === "editorial" ? "font-serif font-normal text-base" : "font-sans"
                }`}>
                  {nextProject.project_name}
                </h4>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
