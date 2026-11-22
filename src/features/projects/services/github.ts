export interface GitHubRepoStats {
  name: string;
  fullName: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
  description: string | null;
  openIssues: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionsData {
  totalContributions: number;
  maxStreak: number;
  currentStreak: number;
  activeDays: number;
  contributions: ContributionDay[];
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#38bdf8", // Matte Blueprint Cyan
  JavaScript: "#eab308", // Matte Amber Sand
  Python: "#2dd4bf", // Matte Sage Teal
  Rust: "#fb923c", // Matte Terracotta
  Go: "#06b6d4", // Matte Cyan
  HTML: "#f97316", // Matte Warm Ochre
  CSS: "#818cf8", // Matte Slate Indigo
  Swift: "#fb7185", // Matte Coral
  Kotlin: "#a78bfa", // Matte Lavender
  Java: "#f59e0b", // Matte Amber
  Shell: "#84cc16", // Matte Sage Lime
  Ruby: "#f43f5e", // Matte Rose
  "C++": "#6366f1", // Matte Iris
};

export function getLanguageColor(language: string | null): string {
  if (!language) return "#64748b";
  return LANGUAGE_COLORS[language] || "#38bdf8";
}

export function extractRepoInfo(url: string): { owner: string; name: string } | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("github.com")) return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], name: parts[1] };
    }
    return null;
  } catch {
    return null;
  }
}

interface GitHubApiRawRepo {
  name: string;
  full_name: string;
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
  updated_at: string;
  html_url: string;
  description?: string | null;
  open_issues_count?: number;
}

/**
 * Fetch all public repositories for Saswat0602 in one cached request (ISR 3600s)
 */
export async function getGitHubReposMap(username = "Saswat0602"): Promise<Record<string, GitHubRepoStats>> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Saswat-Portfolio-App",
      },
    });

    if (!res.ok) {
      return {};
    }

    const repos = (await res.json()) as GitHubApiRawRepo[];
    if (!Array.isArray(repos)) return {};

    const map: Record<string, GitHubRepoStats> = {};
    for (const repo of repos) {
      const key = repo.name.toLowerCase();
      map[key] = {
        name: repo.name,
        fullName: repo.full_name,
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        language: repo.language ?? null,
        updatedAt: repo.updated_at,
        url: repo.html_url,
        description: repo.description ?? null,
        openIssues: repo.open_issues_count ?? 0,
      };
    }

    return map;
  } catch {
    return {};
  }
}

interface RawContributionsResponse {
  total?: {
    lastYear?: number;
    [key: string]: number | undefined;
  };
  contributions?: Array<{
    date: string;
    count: number;
    level: number;
  }>;
}

/**
 * Fetch GitHub contribution graph and streak analytics for the last year
 */
export async function getGitHubContributions(username = "Saswat0602"): Promise<GitHubContributionsData | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Saswat-Portfolio-App",
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as RawContributionsResponse;
    const rawList = data.contributions || [];
    if (!Array.isArray(rawList) || rawList.length === 0) {
      return null;
    }

    const contributions: ContributionDay[] = rawList.map((item) => ({
      date: item.date,
      count: item.count || 0,
      level: Math.min(Math.max(item.level || 0, 0), 4) as 0 | 1 | 2 | 3 | 4,
    }));

    let maxStreak = 0;
    let tempStreak = 0;
    let currentStreak = 0;
    let activeDays = 0;

    for (const item of contributions) {
      if (item.count > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    // Calculate current streak from the end
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) {
        currentStreak++;
      } else {
        // If today has 0 commits yet, don't break yesterday's streak
        if (i === contributions.length - 1) continue;
        break;
      }
    }

    const totalContributions = data.total?.lastYear ?? contributions.reduce((acc, c) => acc + c.count, 0);

    return {
      totalContributions,
      maxStreak,
      currentStreak,
      activeDays,
      contributions,
    };
  } catch {
    return null;
  }
}

/**
 * Compute language distribution statistics from repository map
 */
export function computeLanguageDistribution(reposMap: Record<string, GitHubRepoStats>): LanguageStat[] {
  const counts: Record<string, number> = {};
  let totalWithLanguage = 0;

  for (const repo of Object.values(reposMap)) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      totalWithLanguage++;
    }
  }

  if (totalWithLanguage === 0) return [];

  const list: LanguageStat[] = Object.entries(counts).map(([lang, count]) => ({
    language: lang,
    count,
    percentage: Math.round((count / totalWithLanguage) * 100),
    color: getLanguageColor(lang),
  }));

  // Sort descending by count
  list.sort((a, b) => b.count - a.count);

  return list;
}
