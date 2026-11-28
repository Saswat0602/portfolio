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
  publicRepos: number;
  languages: LanguageStat[];
  contributions: ContributionDay[];
  lastFetchedAt?: string;
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

// Fallback curated distribution if GitHub API is rate-limited on serverless IP
const FALLBACK_LANGUAGES: LanguageStat[] = [
  { language: "TypeScript", count: 32, percentage: 58, color: "#38bdf8" },
  { language: "JavaScript", count: 10, percentage: 18, color: "#eab308" },
  { language: "Python", count: 7, percentage: 13, color: "#2dd4bf" },
  { language: "Shell", count: 4, percentage: 7, color: "#84cc16" },
  { language: "HTML", count: 2, percentage: 4, color: "#f97316" },
];

function getAuthHeaders(): HeadersInit {
  const token =
    process.env.GITHUB_TOKEN ||
    process.env.GH_TOKEN ||
    process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Saswat-Portfolio-App",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// In-memory server cache to prevent rate-limiting while allowing fresh updates every 10 minutes
let serverContributionsCache: { data: GitHubContributionsData; timestamp: number } | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch all public repositories for Saswat0602 with token support & fallback
 */
export async function getGitHubReposMap(username = "Saswat0602"): Promise<Record<string, GitHubRepoStats>> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: getAuthHeaders(),
      cache: "no-store",
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
 * Fetch from Tier 1: Official GitHub GraphQL API (requires GITHUB_TOKEN)
 */
async function fetchFromGraphQL(username: string): Promise<ContributionDay[] | null> {
  const token =
    process.env.GITHUB_TOKEN ||
    process.env.GH_TOKEN ||
    process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) return null;

  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Saswat-Portfolio-App",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      cache: "no-store",
    });

    if (!res.ok) return null;

    interface GraphQLResponse {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions?: number;
              weeks?: Array<{
                contributionDays: Array<{
                  date: string;
                  contributionCount: number;
                  contributionLevel: string;
                }>;
              }>;
            };
          };
        };
      };
    }

    const json = (await res.json()) as GraphQLResponse;
    const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks || !Array.isArray(weeks)) return null;

    const list: ContributionDay[] = [];
    for (const week of weeks) {
      for (const day of week.contributionDays) {
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (day.contributionLevel === "FOURTH_QUARTILE") level = 4;
        else if (day.contributionLevel === "THIRD_QUARTILE") level = 3;
        else if (day.contributionLevel === "SECOND_QUARTILE") level = 2;
        else if (day.contributionLevel === "FIRST_QUARTILE") level = 1;

        list.push({
          date: day.date,
          count: day.contributionCount,
          level,
        });
      }
    }

    list.sort((a, b) => a.date.localeCompare(b.date));
    return list.length > 0 ? list : null;
  } catch {
    return null;
  }
}

/**
 * Fetch from Tier 2: jogruber API
 */
async function fetchFromJogruber(username: string): Promise<{ contributions: ContributionDay[]; total?: number } | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Saswat-Portfolio-App",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = (await res.json()) as RawContributionsResponse;
    const rawList = data.contributions || [];
    if (!Array.isArray(rawList) || rawList.length === 0) return null;

    const contributions: ContributionDay[] = rawList.map((item) => ({
      date: item.date,
      count: item.count || 0,
      level: Math.min(Math.max(item.level || 0, 0), 4) as 0 | 1 | 2 | 3 | 4,
    }));

    contributions.sort((a, b) => a.date.localeCompare(b.date));
    return {
      contributions,
      total: data.total?.lastYear,
    };
  } catch {
    return null;
  }
}

/**
 * Fetch from Tier 3: Direct public HTML scrape of github.com/users/{username}/contributions
 */
async function fetchFromHtmlScrape(username: string): Promise<{ contributions: ContributionDay[]; total?: number } | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const html = await res.text();
    const cellRegex = /<td\s+([^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*)>/g;
    let match: RegExpExecArray | null;
    const days: ContributionDay[] = [];

    while ((match = cellRegex.exec(html)) !== null) {
      const attrs = match[1];
      const dateMatch = attrs.match(/data-date="([^"]+)"/);
      const levelMatch = attrs.match(/data-level="([^"]+)"/);
      const idMatch = attrs.match(/id="([^"]+)"/);

      if (dateMatch && levelMatch) {
        const date = dateMatch[1];
        const rawLevel = parseInt(levelMatch[1], 10) || 0;
        const level = Math.min(Math.max(rawLevel, 0), 4) as 0 | 1 | 2 | 3 | 4;
        let count: number = level;

        if (idMatch) {
          const id = idMatch[1];
          const tipRegex = new RegExp(`<tool-tip[^>]+for="${id}"[^>]*>([\\s\\S]*?)<\\/tool-tip>`);
          const tipMatch = html.match(tipRegex);
          if (tipMatch) {
            const countMatch = tipMatch[1].match(/(\d+)\s+contribution/);
            if (countMatch) {
              count = parseInt(countMatch[1], 10);
            } else if (tipMatch[1].includes("No contribution")) {
              count = 0;
            }
          }
        }
        days.push({ date, level, count });
      }
    }

    if (days.length === 0) return null;

    days.sort((a, b) => a.date.localeCompare(b.date));

    // Extract total yearly count from header
    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : undefined;

    return { contributions: days, total };
  } catch {
    return null;
  }
}

/**
 * Fetch GitHub contribution graph and streak analytics with 3-tier resilience
 */
export async function getGitHubContributions(
  username = "Saswat0602",
  forceFresh = false
): Promise<GitHubContributionsData | null> {
  const now = Date.now();

  // Return server cache if valid and fresh
  if (!forceFresh && serverContributionsCache && now - serverContributionsCache.timestamp < CACHE_TTL_MS) {
    return serverContributionsCache.data;
  }

  try {
    let contributions: ContributionDay[] = [];
    let extractedTotal: number | undefined;

    // 1. Try GraphQL first if token present
    const gqlDays = await fetchFromGraphQL(username);
    if (gqlDays && gqlDays.length > 0) {
      contributions = gqlDays;
    }

    // 2. Try Jogruber if needed
    if (contributions.length === 0) {
      const jogruberResult = await fetchFromJogruber(username);
      if (jogruberResult && jogruberResult.contributions.length > 0) {
        contributions = jogruberResult.contributions;
        extractedTotal = jogruberResult.total;
      }
    }

    // 3. Fallback to direct HTML scrape
    if (contributions.length === 0) {
      const htmlResult = await fetchFromHtmlScrape(username);
      if (htmlResult && htmlResult.contributions.length > 0) {
        contributions = htmlResult.contributions;
        extractedTotal = htmlResult.total;
      }
    }

    // If all live methods fail, fallback to cached data if exists
    if (contributions.length === 0) {
      if (serverContributionsCache) {
        return serverContributionsCache.data;
      }
      return null;
    }

    // Compute streaks and active metrics
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

    const totalContributions =
      extractedTotal ?? contributions.reduce((acc, c) => acc + c.count, 0);

    // Compute public repos and language distribution
    const reposMap = await getGitHubReposMap(username);
    const reposCount = Object.keys(reposMap).length;
    const publicRepos = reposCount > 0 ? reposCount : 55;
    const languages = computeLanguageDistribution(reposMap);

    const result: GitHubContributionsData = {
      totalContributions,
      maxStreak,
      currentStreak,
      activeDays,
      publicRepos,
      languages,
      contributions,
      lastFetchedAt: new Date().toISOString(),
    };

    // Update in-memory cache
    serverContributionsCache = {
      data: result,
      timestamp: now,
    };

    return result;
  } catch {
    if (serverContributionsCache) {
      return serverContributionsCache.data;
    }
    return null;
  }
}

/**
 * Compute language distribution statistics from repository map
 * Only counts repos updated within the last 365 days (matches heatmap range)
 * Falls back to curated distribution if reposMap is empty (e.g. rate limit)
 */
export function computeLanguageDistribution(reposMap: Record<string, GitHubRepoStats>): LanguageStat[] {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const counts: Record<string, number> = {};
  let totalWithLanguage = 0;

  for (const repo of Object.values(reposMap)) {
    // Only include repos pushed/updated within the last 365 days
    const updatedAt = new Date(repo.updatedAt);
    if (updatedAt < oneYearAgo) continue;

    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      totalWithLanguage++;
    }
  }

  if (totalWithLanguage === 0) {
    return FALLBACK_LANGUAGES;
  }

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
