"use client";

import { useState } from "react";
import { userData } from "@/lib/data";
import {
  Brain,
  Layers,
  Smartphone,
  Database,
  Cpu,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { aesthetic } = useAestheticTheme();

  const categoryIcons: Record<string, React.ElementType> = {
    "ai-rag": Brain,
    "fullstack-web": Layers,
    "mobile-realtime": Smartphone,
    "cloud-databases": Database,
  };

  const tabs = [
    { id: "all", label: "All Capabilities" },
    { id: "ai-rag", label: "Modern AI & RAG" },
    { id: "fullstack-web", label: "Full Stack & Web" },
    { id: "mobile-realtime", label: "Mobile & Real-Time" },
    { id: "cloud-databases", label: "Cloud & Databases" },
  ];

  const displayedCategories =
    activeCategory === "all"
      ? userData.about.skill_categories
      : userData.about.skill_categories.filter((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="w-full py-24 px-6 sm:px-8 bg-theme-base text-theme-primary relative z-10 border-t border-theme-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
            {aesthetic === "blueprint" ? <Compass size={13} /> : <Cpu size={13} />}
            <span>{aesthetic === "blueprint" ? "TELEMETRY // TECHNICAL_CAPABILITIES" : "Engineering Discipline & Capabilities"}</span>
          </div>

          {aesthetic === "editorial" ? (
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-theme-primary tracking-tight mb-4">
              Full Stack &amp; <span className="italic text-theme-accent">Modern AI</span> Engineering
            </h2>
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-theme-primary tracking-tight mb-4">
              Full Stack &amp; Modern AI Engineering
            </h2>
          )}

          <p className="max-w-2xl text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
            Combining 3+ years of full-stack web and mobile engineering with production-grade AI systems, AWS Bedrock integrations, and high-performance vector search pipelines.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl border border-theme-border bg-theme-surface/80 backdrop-blur-xl">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-sm"
                      : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Capability Cards Grid with 60fps Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayedCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Cpu;

            return (
              <SpotlightCard
                key={cat.id}
                className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl hover:border-theme-accent transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-1">
                        {cat.subtitle}
                      </span>
                      <h3 className={`text-xl sm:text-2xl font-bold text-theme-primary tracking-tight ${
                        aesthetic === "editorial" ? "font-serif font-normal" : "font-sans"
                      }`}>
                        {cat.title}
                      </h3>
                    </div>

                    <div className="w-11 h-11 rounded-xl border border-theme-border bg-theme-surface-elevated flex items-center justify-center text-theme-accent group-hover:scale-105 group-hover:border-theme-accent group-hover:bg-theme-accent-subtle transition-all flex-shrink-0">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Skills Grid */}
                  <div className="flex flex-col gap-2.5 mb-6">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/60 hover:bg-theme-hover hover:border-theme-border transition-colors gap-1 sm:gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-theme-accent flex-shrink-0" />
                          <span className="text-xs font-semibold text-theme-primary font-mono">
                            {skill.name}
                          </span>
                        </div>

                        {skill.highlight && (
                          <span className="text-[11px] font-mono text-theme-muted sm:text-right pl-6 sm:pl-0">
                            {skill.highlight}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
                  <span>{cat.skills.length} Core Areas</span>
                  <span className="text-theme-accent font-medium">Production Experience</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-12 p-6 rounded-2xl border border-theme-border bg-theme-surface/70 backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-xs">
          <div className="flex flex-col items-center">
            <span className={`text-2xl sm:text-3xl font-black mb-1 text-theme-primary ${
              aesthetic === "editorial" ? "font-serif text-theme-accent" : "font-mono"
            }`}>3+ Years</span>
            <span className="text-xs font-mono text-theme-muted">Production Engineering Experience</span>
          </div>

          <div className="flex flex-col items-center sm:border-x sm:border-theme-border">
            <span className={`text-2xl sm:text-3xl font-black mb-1 text-theme-accent ${
              aesthetic === "editorial" ? "font-serif italic font-normal" : "font-mono"
            }`}>Full Stack &amp; Applied AI</span>
            <span className="text-xs font-mono text-theme-muted">Video Automation, Copilot SDKs &amp; RAG</span>
          </div>

          <div className="flex flex-col items-center">
            <span className={`text-2xl sm:text-3xl font-black mb-1 text-emerald-500 ${
              aesthetic === "editorial" ? "font-serif font-normal" : "font-mono"
            }`}>Bhubaneswar, IN</span>
            <span className="text-xs font-mono text-theme-muted">Software Engineer at NetTantra Technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
