"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import {
  extractRepoInfo,
  getLanguageColor,
  type GitHubRepoStats,
} from "../services/github";

export interface GitHubRepoBadgeProps {
  repoUrl: string;
  className?: string;
}

export function GitHubRepoBadge({
  repoUrl,
  className = "",
}: GitHubRepoBadgeProps) {
  const [stats, setStats] = useState<GitHubRepoStats | null>(null);

  const repoInfo = extractRepoInfo(repoUrl);

  useEffect(() => {
    if (!repoInfo?.name) {
      return;
    }

    let isMounted = true;
    fetch(`/api/github?repo=${encodeURIComponent(repoInfo.name)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data: GitHubRepoStats | null) => {
        if (isMounted) {
          setStats(data);
        }
      })
      .catch(() => {
        // Silently fall back to static badge
      });

    return () => {
      isMounted = false;
    };
  }, [repoInfo?.name]);

  if (!repoUrl) return null;

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-theme-border bg-theme-surface/90 hover:bg-theme-hover hover:border-theme-accent transition-all duration-200 text-xs font-mono text-theme-secondary hover:text-theme-primary group shadow-2xs ${className}`}
      title={
        stats
          ? `${stats.fullName} • ${stats.stars} stars • ${stats.forks} forks`
          : `View on GitHub: ${repoUrl}`
      }
    >
      <GithubIcon size={13} className="text-theme-accent group-hover:scale-110 transition-transform flex-shrink-0" />

      {/* Repo Name */}
      <span className="font-semibold text-theme-primary truncate max-w-[120px] sm:max-w-[160px]">
        {repoInfo ? repoInfo.name : "GitHub"}
      </span>

      {/* Language Indicator */}
      {stats?.language && (
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-theme-muted">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: getLanguageColor(stats.language) }}
          />
          <span>{stats.language}</span>
        </span>
      )}

      {/* Live Stars Count */}
      {stats && stats.stars > 0 && (
        <span className="inline-flex items-center gap-0.5 text-[11px] text-amber-400 font-bold">
          <Star size={11} className="fill-amber-400/20" />
          <span>{stats.stars}</span>
        </span>
      )}

      {/* Live Forks Count */}
      {stats && stats.forks > 0 && (
        <span className="inline-flex items-center gap-0.5 text-[11px] text-theme-muted font-medium">
          <GitFork size={11} />
          <span>{stats.forks}</span>
        </span>
      )}

      <ExternalLink size={10} className="text-theme-muted group-hover:text-theme-accent transition-colors flex-shrink-0" />
    </a>
  );
}

export default GitHubRepoBadge;
