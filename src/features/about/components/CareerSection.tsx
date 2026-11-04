"use client";

import "./CareerSection.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { userData } from "@/lib/data";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
}

function getDisplayYear(duration: string): string {
  if (duration.toLowerCase().includes("present")) return "NOW";
  const match = duration.match(/\d{4}/);
  return match ? match[0] : duration.split(" - ")[0];
}

export function CareerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Exact GSAP ScrollTrigger timeline matching the reference GsapScroll.ts
      const careerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".career-section",
          start: "top 50%",
          end: "bottom 30%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      careerTimeline
        // Grow timeline max-height from 0% to 100%
        .fromTo(
          ".career-timeline",
          { maxHeight: "0%" },
          { maxHeight: "100%", duration: 1, ease: "none" },
          0
        )
        // Fade in timeline
        .fromTo(
          ".career-timeline",
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0
        )
        // Stagger fade in experience boxes
        .fromTo(
          ".career-info-box",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          0
        )
        // Stop the pulsing dot animation
        .fromTo(
          ".career-dot",
          { animationIterationCount: "infinite" },
          { animationIterationCount: "1", delay: 0.3, duration: 0.1 },
          0
        );

      // Section parallax based on screen width
      if (window.innerWidth > 1024) {
        careerTimeline.fromTo(
          ".career-section",
          { y: 0 },
          { y: "20%", duration: 0.5, delay: 0.2 },
          0
        );
      } else {
        careerTimeline.fromTo(
          ".career-section",
          { y: 0 },
          { y: 0, duration: 0.5, delay: 0.2 },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = userData.experience as Experience[];

  return (
    <div className="career-section" ref={sectionRef}>
      <div className="career-container">
        <h2>
          My career <span>&amp;</span>
          <br />
          experience
        </h2>

        <div className="career-info">
          {/* Animated vertical timeline */}
          <div className="career-timeline">
            <div className="career-dot" />
          </div>

          {experiences.map((exp, index) => {
            // FIX for "all one sided": We alternate the layout on desktop (even vs odd)
            // so the timeline is in the middle, and content balances left & right.
            const isEven = index % 2 === 0;

            return (
              <div
                key={`${exp.company}-${index}`}
                className={`career-info-box ${isEven ? "career-left" : "career-right"}`}
              >
                {/* Left/Right side: role + year */}
                <div className="career-info-in">
                  <div className="career-role">
                    <h4>{exp.title}</h4>
                    <h5>{exp.company}</h5>
                    {/* Skill tags */}
                    <div className="career-skills">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="career-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3>{getDisplayYear(exp.duration)}</h3>
                </div>

                {/* Right/Left side: description */}
                <p>{exp.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
