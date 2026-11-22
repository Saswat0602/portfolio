"use client";

import { useEffect, useState } from "react";
import {
  Star,
  GitFork,
  ExternalLink,
  Code2,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { getLanguageColor, type GitHubRepoStats } from "../services/github";

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
    name: "attendance-app",
    tagline: "Cross-platform mobile biometric attendance tracker built with React Native & Expo.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/attendance-app",
  },
  {
    name: "MealsApp",
    tagline: "Mobile community food-sharing network and pantry management system in React Native.",
    defaultLang: "JavaScript",
    url: "https://github.com/Saswat0602/MealsApp",
  },
  {
    name: "spotify-clone",
    tagline: "High-performance full-stack music streaming platform with real-time audio playback.",
    defaultLang: "TypeScript",
    url: "https://github.com/Saswat0602/spotify-clone",
  },
];

export function GitHubRepositoriesSection({ preview = false }: GitHubRepositoriesSectionProps) {
  const [reposMap, setReposMap] = useState<Record<string, GitHubRepoStats>>({});

  useEffect(() => {
    let isMounted = true;

    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, GitHubRepoStats>) => {
        if (isMounted && data && typeof data === "object") {
          setReposMap(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

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
            const liveData = reposMap[curated.name.toLowerCase()];
            const lang = liveData?.language || curated.defaultLang;
            const stars = liveData?.stars ?? 0;
            const forks = liveData?.forks ?? 0;
            const desc = liveData?.description || curated.tagline;

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
                      {stars > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400">
                          <Star size={11} className="fill-amber-400/20" />
                          <span>{stars}</span>
                        </span>
                      )}

                      {forks > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-theme-muted">
                          <GitFork size={11} />
                          <span>{forks}</span>
                        </span>
                      )}

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
          <a
            href="https://github.com/Saswat0602?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-primary transition-all shadow-xs group"
          >
            <GithubIcon size={14} className="text-theme-accent" />
            <span>Explore All 55+ Public Repositories on GitHub</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-theme-accent" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default GitHubRepositoriesSection;
