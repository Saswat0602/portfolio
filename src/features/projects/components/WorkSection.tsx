"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Code2, ArrowRight, Sparkles, Layers, Cpu, Compass } from "lucide-react";
import { userData } from "@/lib/data";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function WorkSection() {
  const flexRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { aesthetic } = useAestheticTheme();
  const projects = userData.Projects.slice(0, 5);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const flex = flexRef.current;
    const section = sectionRef.current;

    const updateState = () => {
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);
      if (!desktop && flex) {
        flex.style.transform = "";
      }
    };

    updateState();

    let translateX = 0;

    const calcTranslate = () => {
      if (!section || !flex || window.innerWidth <= 1024) return;
      const containerRect = section.getBoundingClientRect();
      translateX = flex.scrollWidth - containerRect.width + 120;
    };

    calcTranslate();

    const onScroll = () => {
      if (!section || !flex || window.innerWidth <= 1024) return;
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop > 0) {
        flex.style.transform = "translateX(0px)";
        return;
      }
      const scrolled = Math.min(Math.abs(sectionTop), translateX);
      flex.style.transform = `translateX(-${scrolled}px)`;
    };

    const handleResize = () => {
      updateState();
      calcTranslate();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full border-t border-theme-border bg-theme-base text-theme-primary py-16 lg:py-0 transition-colors duration-300"
      style={{ height: isDesktop ? "calc(100vh + 2400px)" : "auto" }}
    >
      {/* Viewport: Sticky on desktop, natural flow on mobile/tablet */}
      <div className="relative lg:sticky lg:top-0 lg:h-screen w-full lg:overflow-hidden flex flex-col justify-center bg-theme-base">
        {/* Top & Bottom Fade (Desktop) */}
        <div className="hidden lg:block absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-theme-base to-transparent z-10 pointer-events-none" />
        <div className="hidden lg:block absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-theme-base to-transparent z-10 pointer-events-none" />

        {/* Section Header */}
        <div className="px-6 md:px-14 lg:px-20 mb-6 lg:mb-8 relative z-20">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-theme-accent uppercase mb-2">
            {aesthetic === "blueprint" ? <Compass size={14} /> : <Cpu size={14} />}
            <span>
              {aesthetic === "blueprint"
                ? "CATALOG // ARCHITECTURAL SYSTEMS & CASE STUDIES"
                : "Curated Works & Production Architectures"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {aesthetic === "editorial" ? (
                <h2 className="text-4xl md:text-6xl font-normal font-serif tracking-tight text-theme-primary">
                  Selected <span className="italic text-theme-accent">Production Works</span>
                </h2>
              ) : (
                <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-theme-primary">
                  Selected{" "}
                  <span className="text-theme-accent">
                    Production Systems
                  </span>
                </h2>
              )}
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-theme-secondary hover:text-theme-accent transition-colors group"
            >
              <span>Browse All {userData.Projects.length} Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="lg:hidden flex items-center justify-between text-[11px] font-mono text-theme-muted mb-3 px-6 md:px-14">
          <span className="text-theme-accent">← Swipe horizontally to explore projects</span>
          <span>{projects.length + 1} Systems</span>
        </div>

        {/* Cards Strip: Scrollable swipe on mobile, Pinned translation on desktop */}
        <div
          ref={flexRef}
          className="flex gap-6 px-6 md:px-14 lg:px-20 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none items-stretch pb-6 lg:pb-0 will-change-transform"
          style={{ width: isDesktop ? "max-content" : "100%" }}
        >
          {projects.map((project, index) => (
            <SpotlightCard
              as="article"
              key={project.slug || project.project_name}
              className="relative flex-shrink-0 snap-center w-[85vw] sm:w-[65vw] lg:w-[540px] h-[450px] md:h-[490px] rounded-2xl overflow-hidden border border-theme-border bg-theme-surface group flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-theme-accent"
            >
              {/* Background Cover Image with Sophisticated Mask */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.project_name}
                  fill
                  sizes="540px"
                  className="object-cover opacity-20 dark:opacity-30 group-hover:opacity-40 transition-opacity duration-700 scale-100 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-theme-surface/90 via-transparent to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8">
                {/* Top Row: Index + Category Pill */}
                <div className="flex items-center justify-between">
                  <span className={`text-4xl font-black select-none text-theme-border-strong ${
                    aesthetic === "editorial" ? "font-serif italic" : "font-mono"
                  }`}>
                    0{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Bottom Content: Info & Tech Stack */}
                <div className="mt-auto">
                  {project.metrics && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-surface-elevated border border-theme-border text-[11px] font-mono text-emerald-500 mb-3">
                      <Sparkles size={11} />
                      <span>{project.metrics}</span>
                    </div>
                  )}

                  <h3 className={`text-xl md:text-2xl font-bold text-theme-primary mb-2 leading-tight group-hover:text-theme-accent transition-colors ${
                    aesthetic === "editorial" ? "font-serif font-normal" : "font-sans"
                  }`}>
                    {project.project_name}
                  </h3>

                  <p className="text-xs md:text-sm text-theme-secondary mb-5 line-clamp-3 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-theme-surface-elevated border border-theme-border text-theme-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-theme-border">
                    <div className="flex items-center gap-4">
                      <a
                        href={project.code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-theme-muted hover:text-theme-primary transition-colors"
                      >
                        <Code2 size={14} />
                        <span>Code</span>
                      </a>

                      {project.demo_link && (
                        <a
                          href={project.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono text-theme-accent hover:brightness-125 transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>Live System</span>
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-theme-secondary hover:text-theme-accent transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}

          {/* CTA Card */}
          <div className="flex-shrink-0 snap-center w-[85vw] sm:w-[50vw] lg:w-[320px] h-[450px] md:h-[490px] rounded-2xl border border-dashed border-theme-border bg-theme-surface/50 flex flex-col items-center justify-center gap-6 px-8 text-center group hover:border-theme-accent transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl border border-theme-border bg-theme-surface-elevated flex items-center justify-center text-theme-accent group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>

            <div>
              <h3 className={`text-xl font-bold text-theme-primary mb-2 ${
                aesthetic === "editorial" ? "font-serif font-normal" : "font-sans"
              }`}>
                Explore All Work
              </h3>
              <p className="text-xs text-theme-secondary leading-relaxed font-light">
                Discover full architectural breakdowns, RAG pipelines, and open-source contributions.
              </p>
            </div>

            <Link
              href="/projects"
              className="btn-sheen inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-semibold hover:brightness-110 transition-all shadow-sm"
            >
              <span>View All Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
