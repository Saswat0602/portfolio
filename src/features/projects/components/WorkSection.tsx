"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Code2, ArrowRight } from "lucide-react";
import { userData } from "@/lib/data";

interface Project {
  project_name: string;
  code_link: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  demo_link?: string;
}

export function WorkSection() {
  const flexRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const projects = userData.Projects.slice(0, 5) as Project[];

  // Horizontal scroll pinning — pure CSS scroll behaviour on mobile,
  // JS-driven translate on desktop (no GSAP dep needed).
  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const flex = flexRef.current;
    if (!section || !flex) return;

    // Only enable on screens wider than 768px
    if (window.innerWidth <= 768) return;

    let translateX = 0;

    const calcTranslate = () => {
      const containerRect = section.getBoundingClientRect();
      translateX = flex.scrollWidth - containerRect.width;
    };

    calcTranslate();

    // Track how far we've scrolled into the sticky section
    const onScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop > 0) {
        flex.style.transform = "translateX(0px)";
        return;
      }
      const scrolled = Math.min(Math.abs(sectionTop), translateX);
      flex.style.transform = `translateX(-${scrolled}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calcTranslate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calcTranslate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "calc(100vh + 2400px)" }} // creates scroll room for pinning
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#0a0a0a]">
        {/* Top & bottom fade edges */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Heading */}
        <div className="px-8 md:px-16 mb-10 relative z-20">
          <p className="text-xs font-mono tracking-widest text-[#3b82f6] uppercase mb-2">
            Selected Work
          </p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-[#f5f5f5]">
            My{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work
            </span>
          </h2>
        </div>

        {/* Horizontal strip — scrolls left via JS on desktop */}
        <div
          ref={flexRef}
          className="flex gap-5 px-8 md:px-16 will-change-transform transition-transform duration-0"
          style={{ width: "max-content" }}
        >
          {projects.map((project, index) => (
            <article
              key={project.project_name}
              className="relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[520px] h-[420px] md:h-[480px] rounded-2xl overflow-hidden border border-white/[0.07] bg-[#121212] group"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.project_name}
                  fill
                  sizes="520px"
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-105 group-hover:scale-100"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              </div>

              {/* Card content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7">
                {/* Top: index + category */}
                <div className="flex items-start justify-between">
                  <span className="text-5xl font-black text-white/10 font-mono leading-none select-none">
                    0{index + 1}
                  </span>
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10 text-white/50 bg-white/5">
                    {project.category}
                  </span>
                </div>

                {/* Bottom: info */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-2 leading-tight">
                    {project.project_name.replace(/-/g, " ")}
                  </h3>
                  <p className="text-sm text-[#a3a3a3] mb-5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors"
                    >
                      <Code2 size={14} />
                      Code
                    </a>
                    {project.demo_link && (
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* CTA card */}
          <div className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[340px] h-[420px] md:h-[480px] rounded-2xl border border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center gap-6 px-8 text-center group hover:border-[#3b82f6]/40 transition-colors duration-300">
            <span className="text-5xl font-black text-white/5 font-mono">+{userData.Projects.length - 5}</span>
            <div>
              <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">Want to see more?</h3>
              <p className="text-sm text-[#a3a3a3]">Explore all of my projects and creations</p>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3b82f6] text-[#0a0a0a] text-sm font-semibold hover:bg-[#60a5fa] hover:-translate-y-0.5 transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              See All Works
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
