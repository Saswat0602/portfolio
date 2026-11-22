"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  GitFork,
  ExternalLink,
  Search,
  Code2,
  RefreshCw,
  ArrowRight,
  Filter,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { getLanguageColor, type GitHubRepoStats } from "../services/github";
import { GitHubContributionGraph } from "./GitHubContributionGraph";

interface GitHubRepositoriesSectionProps {
  preview?: boolean;
}

export function GitHubRepositoriesSection({ preview = false }: GitHubRepositoriesSectionProps) {
  const [repos, setRepos] = useState<GitHubRepoStats[]>([]);
  const [reposMap, setReposMap] = useState<Record<string, GitHubRepoStats>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(preview ? 6 : 9);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load GitHub repositories");
        return res.json();
      })
      .then((data: Record<string, GitHubRepoStats>) => {
        if (isMounted) {
          setReposMap(data);
          const list = Object.values(data);
          // Sort by updated_at descending
          list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          setRepos(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load telemetry");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute available languages from fetched repos
  const availableLanguages = useMemo(() => {
    const langSet = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langSet.add(r.language);
    });
    return ["all", ...Array.from(langSet).slice(0, 5)];
  }, [repos]);

  // Filtered list based on search and language
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLang =
        selectedLanguage === "all" ||
        (repo.language && repo.language.toLowerCase() === selectedLanguage.toLowerCase());

      return matchesSearch && matchesLang;
    });
  }, [repos, searchQuery, selectedLanguage]);

  const displayedRepos = preview ? filteredRepos.slice(0, 6) : filteredRepos.slice(0, visibleCount);

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return dateString;
    }
  };

  return (
    <section id="github-repos" className="w-full py-12 sm:py-16 md:py-20 border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-3">
              <GithubIcon size={14} className="flex-shrink-0" />
              <span>Live GitHub Telemetry • @Saswat0602</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-theme-primary">
              Public Open-Source <span className="text-theme-accent">Repositories</span>
            </h2>

            <p className="max-w-2xl text-xs sm:text-sm md:text-base text-theme-secondary font-light leading-relaxed mt-2">
              Real-time synchronization with GitHub API displaying {repos.length > 0 ? repos.length : "55+"} active public repositories, commit activity, language distributions, and telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-surface text-xs font-mono text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live API Synced</span>
            </div>

            <a
              href="https://github.com/Saswat0602"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-primary transition-all shadow-xs"
            >
              <GithubIcon size={14} />
              <span>GitHub Profile</span>
              <ExternalLink size={12} className="text-theme-muted" />
            </a>
          </div>
        </div>

        {/* Live Contributions Heatmap & Engineering Analytics */}
        <GitHubContributionGraph repos={reposMap} />

        {/* Filter & Search Bar (Only shown on full catalog or when repos exist) */}
        {!preview && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-4 rounded-2xl border border-theme-border bg-theme-surface/70 backdrop-blur-md">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
              <input
                type="text"
                placeholder="Search repository names or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-theme-border bg-theme-base text-xs font-mono text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors"
              />
            </div>

            {/* Language Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[11px] font-mono text-theme-muted mr-1 inline-flex items-center gap-1">
                <Filter size={11} />
                <span>Filter:</span>
              </span>
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all capitalize whitespace-nowrap ${
                    selectedLanguage === lang
                      ? "bg-theme-accent text-white dark:text-zinc-950 font-semibold shadow-xs"
                      : "bg-theme-base border border-theme-border text-theme-secondary hover:text-theme-primary hover:border-theme-accent"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
            <RefreshCw size={24} className="animate-spin text-theme-accent" />
            <p className="text-xs font-mono text-theme-muted">Fetching live repositories from GitHub API...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-12 px-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 text-center">
            <p className="text-xs font-mono text-rose-400 mb-2">Notice: {error}</p>
            <a
              href="https://github.com/Saswat0602?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-theme-accent hover:underline"
            >
              <span>View all repositories directly on GitHub</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && (
          <>
            {filteredRepos.length === 0 ? (
              <div className="py-16 text-center text-xs font-mono text-theme-muted">
                No repositories match your query. Try a different search term.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayedRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between p-5 rounded-2xl border border-theme-border bg-theme-surface/90 hover:bg-theme-hover hover:border-theme-accent transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <div>
                      {/* Top Bar: Icon & Stats */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Code2 size={16} className="text-theme-accent group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="font-sans font-bold text-sm sm:text-base text-theme-primary group-hover:text-theme-accent transition-colors truncate max-w-[170px] sm:max-w-[200px]">
                            {repo.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {repo.stars > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400">
                              <Star size={11} className="fill-amber-400/20" />
                              <span>{repo.stars}</span>
                            </span>
                          )}

                          {repo.forks > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-theme-muted">
                              <GitFork size={11} />
                              <span>{repo.forks}</span>
                            </span>
                          )}

                          <ExternalLink size={13} className="text-theme-muted group-hover:text-theme-accent transition-colors" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-theme-secondary font-light leading-relaxed line-clamp-2 mb-4">
                        {repo.description || "Open-source software module and architecture engineered by Saswat."}
                      </p>
                    </div>

                    {/* Footer: Language & Updated Date */}
                    <div className="flex items-center justify-between pt-3 border-t border-theme-border/60 text-[11px] font-mono text-theme-muted">
                      {repo.language ? (
                        <span className="inline-flex items-center gap-1.5 text-theme-secondary">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          <span>{repo.language}</span>
                        </span>
                      ) : (
                        <span className="text-theme-muted">Source</span>
                      )}

                      <span>Updated {formatDate(repo.updatedAt)}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
              {preview ? (
                <Link
                  href="/projects#github-repos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-primary transition-all group"
                >
                  <span>Explore All {repos.length > 0 ? repos.length : "55+"} Public Repositories</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-theme-accent" />
                </Link>
              ) : (
                visibleCount < filteredRepos.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 9, filteredRepos.length))}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-primary transition-all"
                  >
                    <span>Load More Repositories ({filteredRepos.length - visibleCount} remaining)</span>
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default GitHubRepositoriesSection;
