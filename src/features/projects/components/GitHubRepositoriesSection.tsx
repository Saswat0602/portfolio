"use client";

import {
  ExternalLink,
  Code2,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { getLanguageColor } from "../services/github";
import { CoordinateInkButton } from "@/components/ui/CoordinateInkButton";

interface GitHubRepositoriesSectionProps {
  preview?: boolean;
}

// 6 Curated Flagship Repositories
const CURATED_REPOS: Array<{
  name: string;
  tagline: string;
  defaultLang: string;
  url: string;
}> = [
  {
    name: "Orbito",
    tagline: "Enterprise task & project management platform with conversational AI and browser automation.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/Orbito",
  },
  {
    name: "research-agent",
    tagline: "Autonomous multi-agent research and reasoning copilot with dynamic search & synthesis.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/research-agent",
  },
  {
    name: "oryn-ui",
    tagline: "Production-ready, accessible, modular UI design system and React component primitives.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/oryn-ui",
  },
  {
    name: "Real-estate-management",
    tagline: "Spatial real-estate marketplace engine with interactive geo-discovery and filtering.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/Real-estate-management",
  },
  {
    name: "FoodShare-Network",
    tagline: "Mobile community food-sharing network and donation management system in React Native.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/FoodShare-Network",
  },
  {
    name: "attendance-app",
    tagline: "Cross-platform mobile biometric attendance tracker built with React Native & Expo.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/attendance-app",
  },
];

export function GitHubRepositoriesSection({ preview = false }: GitHubRepositoriesSectionProps) {
  const displayedList = preview ? CURATED_REPOS.slice(0, 4) : CURATED_REPOS;

  return (
    <section id="github-repos" className="w-full py-8 sm:py-12 border-t border-theme-border/80">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-2.5">
              <GithubIcon size={14} className="flex-shrink-0" />
              <span>Curated Open-Source • @Saswat0602</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black font-sans tracking-tight text-theme-primary">
              Featured Open-Source <span className="text-theme-accent">Codebases</span>
            </h2>

            <p className="max-w-2xl text-xs sm:text-sm text-theme-secondary font-light leading-relaxed mt-1.5">
              Curated public repositories highlighting autonomous AI agents, mobile apps, and full-stack systems.
            </p>
          </div>

          <a
            href="https://github.com/Saswat0602?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-primary transition-all shadow-xs self-start sm:self-auto"
          >
            <GithubIcon size={14} />
            <span>GitHub Profile</span>
            <ExternalLink size={12} className="text-theme-muted" />
          </a>
        </div>

        {/* Curated Repositories Grid (Only 6 Featured - No 55-repo dump) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {displayedList.map((curated) => {
            const lang = curated.defaultLang;
            const desc = curated.tagline;

            return (
              <a
                key={curated.name}
                href={curated.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-theme-border/80 bg-theme-surface/90 hover:bg-theme-surface-elevated hover:border-theme-accent/60 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Top: Icon + Name + Stars */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Code2 size={16} className="text-theme-accent group-hover:scale-110 transition-transform flex-shrink-0" />
                      <span className="font-sans font-bold text-sm sm:text-base text-theme-primary group-hover:text-theme-accent transition-colors truncate">
                        {curated.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <ExternalLink size={13} className="text-theme-muted group-hover:text-theme-accent transition-colors" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-theme-secondary font-light leading-relaxed line-clamp-2 mb-4">
                    {desc}
                  </p>
                </div>

                {/* Footer: Language + Codebase Pill */}
                <div className="flex items-center justify-between pt-3 border-t border-theme-border/60 text-[11px] font-mono text-theme-muted">
                  <span className="inline-flex items-center gap-1.5 text-theme-secondary">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getLanguageColor(lang) }}
                    />
                    <span>{lang}</span>
                  </span>

                  <span className="text-theme-accent/80 font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight size={11} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Clean Bottom Action CTA */}
        <div className="flex items-center justify-center pt-2">
          <CoordinateInkButton
            href="https://github.com/Saswat0602?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            label="Explore All 55+ Public Repositories on GitHub"
            variant="accent"
            size="md"
            rounded="xl"
            icon={<GithubIcon size={14} className="text-theme-accent" />}
            iconPosition="left"
            className="font-mono text-xs shadow-xs"
          />
        </div>
      </div>
    </section>
  );
}

export default GitHubRepositoriesSection;
