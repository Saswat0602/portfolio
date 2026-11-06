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
    <section id="skills" className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary relative z-10 border-t border-theme-border transition-colors duration-300 max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
            {aesthetic === "blueprint" ? <Compass size={13} className="flex-shrink-0" /> : <Cpu size={13} className="flex-shrink-0" />}
            <span>{aesthetic === "blueprint" ? "TELEMETRY // TECHNICAL_CAPABILITIES" : "Engineering Discipline & Capabilities"}</span>
          </div>

          {aesthetic === "editorial" ? (
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-theme-primary tracking-tight mb-3 sm:mb-4 break-words">
              Full Stack &amp; <span className="italic text-theme-accent">Modern AI</span> Engineering
            </h2>
          ) : (
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-sans text-theme-primary tracking-tight mb-3 sm:mb-4 break-words">
              Full Stack &amp; Modern AI Engineering
            </h2>
          )}

          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-theme-secondary font-light leading-relaxed px-2">
            Combining 3+ years of full-stack web and mobile engineering with production-grade AI systems, AWS Bedrock integrations, and high-performance vector search pipelines.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 p-1 sm:p-1.5 rounded-2xl border border-theme-border bg-theme-surface/80 backdrop-blur-xl max-w-full">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {displayedCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Cpu;

            return (
              <SpotlightCard
                key={cat.id}
                className="group flex flex-col justify-between p-5 sm:p-7 md:p-8 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl hover:border-theme-accent transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-1">
                        {cat.subtitle}
                      </span>
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-theme-primary tracking-tight break-words ${
                        aesthetic === "editorial" ? "font-serif font-normal" : "font-sans"
                      }`}>
                        {cat.title}
                      </h3>
                    </div>

                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-theme-border bg-theme-surface-elevated flex items-center justify-center text-theme-accent group-hover:scale-105 group-hover:border-theme-accent group-hover:bg-theme-accent-subtle transition-all flex-shrink-0">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed mb-5 sm:mb-6">
                    {cat.description}
                  </p>

                  {/* Skills Grid */}
                  <div className="flex flex-col gap-2 sm:gap-2.5 mb-5 sm:mb-6">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/60 hover:bg-theme-hover hover:border-theme-border transition-colors gap-1 sm:gap-3"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 size={14} className="text-theme-accent flex-shrink-0" />
                          <span className="text-xs font-semibold text-theme-primary font-mono truncate">
                            {skill.name}
                          </span>
                        </div>

                        {skill.highlight && (
                          <span className="text-[10px] sm:text-[11px] font-mono text-theme-muted sm:text-right pl-6 sm:pl-0 break-words">
                            {skill.highlight}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-3.5 sm:pt-4 border-t border-theme-border flex items-center justify-between text-[11px] sm:text-xs font-mono text-theme-muted">
                  <span>{cat.skills.length} Core Areas</span>
                  <span className="text-theme-accent font-medium">Production Experience</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-6 rounded-2xl border border-theme-border bg-theme-surface/70 backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center shadow-xs">
          <div className="flex flex-col items-center">
            <span className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-black mb-1 text-theme-primary break-words ${
              aesthetic === "editorial" ? "font-serif text-theme-accent" : "font-mono"
            }`}>3+ Years</span>
            <span className="text-[11px] sm:text-xs font-mono text-theme-muted">Production Engineering Experience</span>
          </div>

          <div className="flex flex-col items-center sm:border-x sm:border-theme-border">
            <span className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-black mb-1 text-theme-accent break-words ${
              aesthetic === "editorial" ? "font-serif italic font-normal" : "font-mono"
            }`}>Full Stack &amp; Applied AI</span>
            <span className="text-[11px] sm:text-xs font-mono text-theme-muted">Video Automation, Copilot SDKs &amp; RAG</span>
          </div>

          <div className="flex flex-col items-center">
            <span className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-black mb-1 text-emerald-500 break-words ${
              aesthetic === "editorial" ? "font-serif font-normal" : "font-mono"
            }`}>Bhubaneswar, IN</span>
            <span className="text-[11px] sm:text-xs font-mono text-theme-muted">Software Engineer at NetTantra Technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
