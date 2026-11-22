import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { extractRepoInfo } from "../services/github";

export interface GitHubRepoBadgeProps {
  repoUrl: string;
  className?: string;
}

export function GitHubRepoBadge({
  repoUrl,
  className = "",
}: GitHubRepoBadgeProps) {
  if (!repoUrl) return null;
  const repoInfo = extractRepoInfo(repoUrl);
  const repoName = repoInfo ? repoInfo.name : "Repository";

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-theme-border bg-theme-surface/90 hover:bg-theme-hover hover:border-theme-accent transition-all duration-200 text-xs font-mono text-theme-secondary hover:text-theme-primary group shadow-2xs ${className}`}
      title={`View ${repoName} on GitHub`}
    >
      <GithubIcon size={13} className="text-theme-accent group-hover:scale-110 transition-transform flex-shrink-0" />
      <span className="font-semibold text-theme-primary truncate max-w-[120px] sm:max-w-[160px]">
        {repoName}
      </span>
      <ExternalLink size={10} className="text-theme-muted group-hover:text-theme-accent transition-colors flex-shrink-0" />
    </a>
  );
}

export default GitHubRepoBadge;
