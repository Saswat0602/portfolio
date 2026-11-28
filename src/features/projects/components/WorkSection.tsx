"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowRight, Sparkles, Layers, Compass, Package } from "lucide-react";
import { userData } from "@/lib/data";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GitHubRepoBadge } from "./GitHubRepoBadge";
import { useCompanionReaction } from "@/features/companion/context/CompanionReactionContext";
import { CoordinateInkButton } from "@/components/ui/CoordinateInkButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { notifyHover } = useCompanionReaction();
  const projects = userData.Projects.slice(0, 5);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet Landscape: Pinned horizontal scroll-drive
    mm.add("(min-width: 769px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 80);
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full border-t border-theme-border bg-theme-base text-theme-primary transition-colors duration-300 overflow-hidden py-16 md:py-0 md:h-screen md:flex md:flex-col md:justify-center"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-theme-accent uppercase mb-2 font-medium">
            <Compass size={14} className="flex-shrink-0" />
            <span>Selected Architectural Systems &amp; Case Studies</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black font-sans tracking-tight text-theme-primary">
                Selected{" "}
                <span className="text-theme-accent">
                  Production Systems
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-theme-secondary mt-1 font-light max-w-xl">
                Scroll vertically to inspect live architecture, multi-modal avatar pipelines, and agentic copilots.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-primary transition-colors group shadow-xs self-start sm:self-auto"
            >
              <span>Browse All ({userData.Projects.length})</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-theme-accent" />
            </Link>
          </div>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-theme-muted mb-3 px-4 sm:px-6">
          <span className="text-theme-accent">← Swipe horizontally to explore</span>
          <span>{projects.length + 1} Systems</span>
        </div>

        {/* Horizontal Card Reel (Pinned translation on desktop, Native touch scroll on mobile) */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none items-stretch pb-4 md:pb-0 scrollbar-none will-change-transform"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {projects.map((project, index) => (
            <SpotlightCard
              as="article"
              key={project.slug || project.project_name}
              onMouseEnter={() =>
                notifyHover(
                  "projects",
                  project.metrics || `Inspecting ${project.project_name.split(" — ")[0]}!`
                )
              }
              onMouseLeave={() => notifyHover(null)}
              className="relative flex-shrink-0 snap-center w-[85vw] xs:w-[80vw] sm:w-[60vw] md:w-[480px] lg:w-[540px] min-h-[460px] sm:min-h-[480px] md:h-[490px] rounded-2xl overflow-hidden border border-theme-border bg-theme-surface group flex flex-col justify-between shadow-lg transition-all duration-300 hover:border-theme-accent"
            >
              {/* Background Cover Image with Mask */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.project_name}
                  fill
                  sizes="(max-width: 768px) 85vw, 540px"
                  className="object-cover opacity-20 dark:opacity-30 group-hover:opacity-40 transition-opacity duration-700 scale-100 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-theme-surface/90 via-transparent to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-7 md:p-8">
                {/* Top Row: Index + Category Pill */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-black select-none text-theme-border-strong font-mono">
                    0{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Bottom Content: Info & Tech Stack */}
                <div className="mt-auto">
                  {project.metrics && (
                    <div className="inline-flex max-w-full items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-accent-subtle border border-theme-border text-[10px] sm:text-[11px] font-mono text-theme-accent mb-2.5 sm:mb-3 font-medium">
                      <Sparkles size={11} className="flex-shrink-0" />
                      <span className="truncate">{project.metrics}</span>
                    </div>
                  )}

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-theme-primary mb-1.5 sm:mb-2 leading-tight group-hover:text-theme-accent transition-colors break-words">
                    {project.project_name}
                  </h3>

                  <p className="text-xs sm:text-sm text-theme-secondary mb-4 sm:mb-5 line-clamp-3 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-6">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono rounded-md bg-theme-surface-elevated border border-theme-border text-theme-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links & GitHub Telemetry */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-theme-border flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.code_link && (
                        <GitHubRepoBadge repoUrl={project.code_link} />
                      )}

                      {project.demo_link && (
                        <a
                          href={project.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-theme-border bg-theme-accent-subtle text-theme-accent hover:brightness-125 transition-all text-xs font-mono shadow-2xs"
                        >
                          <ExternalLink size={12} />
                          <span>Demo</span>
                        </a>
                      )}

                      {project.npm_link && (
                        <a
                          href={project.npm_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs font-mono shadow-2xs"
                          title="View on npm"
                        >
                          <Package size={12} />
                          <span>npm</span>
                        </a>
                      )}

                      {!project.code_link && !project.demo_link && !project.npm_link && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-theme-border bg-theme-surface-elevated text-theme-muted text-[11px] font-mono">
                          Enterprise System
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-theme-secondary hover:text-theme-accent transition-colors"
                    >
                      <span>Deep Dive</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}

          {/* Explore All Card */}
          <div className="flex-shrink-0 snap-center w-[85vw] xs:w-[80vw] sm:w-[50vw] md:w-[320px] min-h-[460px] sm:min-h-[480px] md:h-[490px] rounded-2xl border border-dashed border-theme-border bg-theme-surface/60 flex flex-col items-center justify-center gap-5 sm:gap-6 p-6 sm:p-8 text-center group hover:border-theme-accent transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-theme-border bg-theme-surface-elevated flex items-center justify-center text-theme-accent group-hover:scale-110 transition-transform">
              <Layers size={22} />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold font-sans text-theme-primary mb-2">
                Explore All Work
              </h3>
              <p className="text-xs text-theme-secondary leading-relaxed font-light">
                Discover full architectural breakdowns, RAG pipelines, and open-source contributions.
              </p>
            </div>

            <CoordinateInkButton
              href="/projects"
              label={`View All (${userData.Projects.length})`}
              variant="primary"
              size="sm"
              rounded="xl"
              icon={<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
