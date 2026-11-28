"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type ProjectData } from "@/lib/data";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Package,
  Split,
  Image as ImageIcon,
} from "lucide-react";
import { GitHubRepoBadge } from "./GitHubRepoBadge";
import { ProjectComparisonScrubber } from "./ProjectComparisonScrubber";
import { CoordinateInkButton } from "@/components/ui/CoordinateInkButton";

interface ProjectDetailViewProps {
  project: ProjectData;
  allProjects: ProjectData[];
}

export function ProjectDetailView({ project, allProjects }: ProjectDetailViewProps) {
  const [showcaseMode, setShowcaseMode] = useState<"scrubber" | "image">("scrubber");

  // Find next project
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentIndex !== -1 && currentIndex + 1 < allProjects.length
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return (
    <article className="w-full min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary transition-colors duration-300 max-w-full overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-theme-muted hover:text-theme-primary transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Top Badges & Title */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-3 py-1 text-xs uppercase tracking-wider rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent font-mono font-medium">
              {project.category}
            </span>
            {project.metrics && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-accent-subtle border border-theme-border text-xs font-mono text-theme-accent font-medium">
                <Sparkles size={12} className="flex-shrink-0" />
                <span>{project.metrics}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-theme-primary tracking-tight leading-tight break-words font-sans font-black">
            {project.project_name}
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-theme-secondary font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
            {project.demo_link && (
              <CoordinateInkButton
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                label="Explore Live System"
                variant="primary"
                size="md"
                rounded="xl"
                icon={<ExternalLink size={14} />}
                iconPosition="left"
                className="w-full sm:w-auto"
              />
            )}

            {project.npm_link && (
              <a
                href={project.npm_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-mono font-semibold transition-all w-full sm:w-auto"
              >
                <Package size={14} />
                <span>npm: oryn-ui</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            )}

            {project.code_link && (
              <GitHubRepoBadge
                repoUrl={project.code_link}
                className="py-3 px-5 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-primary text-xs font-mono transition-all w-full sm:w-auto justify-center"
              />
            )}

            {!project.demo_link && !project.code_link && !project.npm_link && (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/80 text-theme-secondary text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-theme-accent/80 animate-pulse" />
                <span>Enterprise Architecture • Proprietary Internal Platform</span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Comparison Scrubber / Project Showcase Frame */}
        <div className="flex flex-col gap-3 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-theme-muted font-medium">Showcase View:</span>
              <div className="inline-flex items-center rounded-xl border border-theme-border bg-theme-surface p-1">
                <button
                  type="button"
                  onClick={() => setShowcaseMode("scrubber")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    showcaseMode === "scrubber"
                      ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                      : "text-theme-secondary hover:text-theme-primary"
                  }`}
                >
                  <Split size={12} />
                  <span>⚡ Before / After Engineering Scrubber</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowcaseMode("image")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    showcaseMode === "image"
                      ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                      : "text-theme-secondary hover:text-theme-primary"
                  }`}
                >
                  <ImageIcon size={12} />
                  <span>UI Screen</span>
                </button>
              </div>
            </div>

            <span className="text-[11px] font-mono text-theme-muted hidden sm:inline">
              {showcaseMode === "scrubber"
                ? "Drag vertical divider handle left/right to inspect engineering impact"
                : "Product visual screen capture"}
            </span>
          </div>

          {showcaseMode === "scrubber" ? (
            <ProjectComparisonScrubber project={project} />
          ) : (
            <div className="relative w-full h-[220px] xs:h-[280px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden border border-theme-border bg-black/40 shadow-xl">
              <Image
                src={project.image}
                alt={project.project_name}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover opacity-85"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-base via-transparent to-transparent" />
            </div>
          )}
        </div>

        {/* Detailed Case Study Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10">
          {/* Main Body */}
          <div className="md:col-span-8 flex flex-col gap-6 sm:gap-10">
            {/* Architectural Overview */}
            <section className="p-5 sm:p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
                <Cpu size={14} />
                <span>Executive Overview</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary mb-4">
                Architecture &amp; System Scope
              </h2>
              <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
                {project.long_description || project.description}
              </p>
            </section>

            {/* System Architecture Points */}
            {project.architecture && project.architecture.length > 0 && (
              <section className="p-5 sm:p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
                  <Layers size={14} />
                  <span>Technical Design</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold font-sans text-theme-primary mb-4 sm:mb-5 break-words">
                  Core Architecture Components
                </h2>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {project.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40"
                    >
                      <Zap size={15} className="text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-theme-secondary leading-relaxed break-words">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Engineering Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="p-5 sm:p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
                  <ShieldCheck size={14} />
                  <span>Production Impact</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold font-sans text-theme-primary mb-4 sm:mb-5 break-words">
                  Key Results &amp; Optimizations
                </h2>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40"
                    >
                      <CheckCircle2 size={15} className="text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-theme-secondary leading-relaxed break-words">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-5 sm:gap-6">
            {/* Tech Stack Card */}
            <div className="p-5 sm:p-6 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-widest text-theme-muted font-semibold mb-3 sm:mb-4">
                Technologies &amp; Frameworks
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-theme-border bg-theme-surface-elevated text-[11px] sm:text-xs font-mono text-theme-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="p-5 sm:p-6 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl flex flex-col gap-3.5 sm:gap-4 text-xs font-mono shadow-sm">
              <h3 className="uppercase tracking-widest text-theme-muted font-semibold mb-1">
                Project Specs
              </h3>

              <div className="flex items-center justify-between pb-3 border-b border-theme-border/60">
                <span className="text-theme-muted">Domain</span>
                <span className="text-theme-primary font-medium">{project.category}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-theme-border/60">
                <span className="text-theme-muted">Deployment</span>
                <span className="text-theme-primary font-medium">Production Verified</span>
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
                className="group p-5 sm:p-6 rounded-2xl border border-theme-border bg-theme-surface hover:border-theme-accent transition-all flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs font-mono text-theme-muted group-hover:text-theme-accent transition-colors">
                  <span>Next Case Study</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold font-sans text-theme-primary group-hover:text-theme-accent transition-colors line-clamp-1">
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
