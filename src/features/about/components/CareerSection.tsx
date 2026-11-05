"use client";

import "./CareerSection.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { userData } from "@/lib/data";
import { Briefcase, Calendar, MapPin, CheckCircle2, Compass } from "lucide-react";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CareerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { aesthetic } = useAestheticTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const careerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".career-section",
          start: "top 60%",
          end: "bottom 30%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      careerTimeline
        .fromTo(
          ".career-timeline",
          { maxHeight: "0%" },
          { maxHeight: "100%", duration: 1, ease: "none" },
          0
        )
        .fromTo(
          ".career-timeline",
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0
        )
        .fromTo(
          ".career-info-box",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = userData.experience;

  return (
    <div id="experience" className="career-section text-theme-primary" ref={sectionRef}>
      <div className="career-container">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
            {aesthetic === "blueprint" ? <Compass size={13} /> : <Briefcase size={13} />}
            <span>{aesthetic === "blueprint" ? "TELEMETRY // CAREER_CHRONOLOGY" : "Chronicle of Engineering Craft"}</span>
          </div>

          {aesthetic === "editorial" ? (
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-theme-primary tracking-tight mb-4">
              Professional <span className="italic text-theme-accent">Experience</span>
            </h2>
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-theme-primary tracking-tight mb-4">
              Professional Experience
            </h2>
          )}

          <p className="max-w-2xl text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
            Software Development Engineer at HyScaler, engineering scalable full-stack web and mobile systems alongside modern Generative AI and AWS Bedrock RAG pipelines.
          </p>
        </div>

        <div className="career-info">
          {/* Animated vertical timeline bar */}
          <div className="career-timeline">
            <div className="career-dot" />
          </div>

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={`${exp.company}-${index}`}
                className={`career-info-box ${isEven ? "career-left" : "career-right"}`}
              >
                {/* Left/Right Column: Role & Company Info */}
                <div className="career-info-in">
                  <div className="career-role">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-theme-accent flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.duration}
                      </span>
                      <span className="text-theme-border">•</span>
                      <span className="text-[11px] font-mono text-theme-muted flex items-center gap-1">
                        <MapPin size={11} />
                        {exp.location.split("·")[0].trim()}
                      </span>
                    </div>

                    <h4 className={`text-xl sm:text-2xl font-bold text-theme-primary mb-1 ${
                      aesthetic === "editorial" ? "font-serif font-normal" : "font-sans"
                    }`}>
                      {exp.title}
                    </h4>
                    <h5 className="text-sm font-semibold text-theme-accent mb-3">
                      {exp.company}
                    </h5>

                    {/* Skill Tags */}
                    <div className="career-skills">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="career-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className={`career-year ${aesthetic === "editorial" ? "font-serif" : "font-mono"}`}>
                    {exp.duration.toLowerCase().includes("present")
                      ? "NOW"
                      : exp.duration.split(" - ")[0]}
                  </h3>
                </div>

                {/* Opposite Column: Responsibilities & Impact */}
                <div className="career-desc-col">
                  <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li
                          key={rIdx}
                          className="flex items-start gap-2 text-xs text-theme-secondary leading-normal"
                        >
                          <CheckCircle2 size={13} className="text-theme-accent mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
