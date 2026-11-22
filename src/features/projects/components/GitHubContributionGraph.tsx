"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Flame,
  Calendar,
  GitCommit,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Layers,
} from "lucide-react";
import {
  type GitHubContributionsData,
  type GitHubRepoStats,
  type LanguageStat,
  computeLanguageDistribution,
} from "../services/github";

interface GitHubContributionGraphProps {
  repos?: Record<string, GitHubRepoStats>;
}

type PaletteMode = "slate" | "emerald" | "graphite";

export function GitHubContributionGraph({ repos }: GitHubContributionGraphProps) {
  const [data, setData] = useState<GitHubContributionsData | null>(null);
  const [fetchedRepos, setFetchedRepos] = useState<Record<string, GitHubRepoStats>>({});
  const [loading, setLoading] = useState(true);
  const [palette, setPalette] = useState<PaletteMode>("slate");
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const activeRepos = useMemo(() => {
    return repos && Object.keys(repos).length > 0 ? repos : fetchedRepos;
  }, [repos, fetchedRepos]);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/github/contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((resData: GitHubContributionsData) => {
        if (isMounted) {
          setData(resData);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch repos internally if not passed via props
  useEffect(() => {
    if (repos && Object.keys(repos).length > 0) {
      return;
    }

    let isMounted = true;
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : {}))
      .then((resMap: Record<string, GitHubRepoStats>) => {
        if (isMounted && resMap && typeof resMap === "object") {
          setFetchedRepos(resMap);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [repos]);

  // Compute language distribution from activeRepos
  const languages: LanguageStat[] = useMemo(() => {
    return computeLanguageDistribution(activeRepos);
  }, [activeRepos]);

  // Group contributions into 7-day columns (weeks)
  const { weeks, monthLabels } = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    const list = data.contributions;
    const weekColumns: typeof list[] = [];
    let currentWeek: typeof list = [];

    list.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === list.length - 1) {
        weekColumns.push(currentWeek);
        currentWeek = [];
      }
    });

    // Compute month label positions along weeks (ensure minimum 3.5 weeks spacing)
    const months: Array<{ label: string; weekIndex: number }> = [];
    let lastWeek = -10;
    let lastMonth = -1;

    weekColumns.forEach((week, wIdx) => {
      if (week.length > 0) {
        const dateObj = new Date(week[0].date);
        const m = dateObj.getMonth();
        if (m !== lastMonth && wIdx - lastWeek >= 3) {
          months.push({
            label: dateObj.toLocaleDateString("en-US", { month: "short" }),
            weekIndex: wIdx,
          });
          lastMonth = m;
          lastWeek = wIdx;
        }
      }
    });

    return { weeks: weekColumns, monthLabels: months };
  }, [data]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Pure Matte Architectural Color Combos (Flat, non-reflective, anodized finish)
  const getCellColor = (level: number) => {
    if (palette === "slate") {
      // Matte Architectural Slate & Cyan (Subdued, sophisticated, blueprint-integrated)
      switch (level) {
        case 1:
          return "bg-[#142838] border-[#1e3b52] hover:bg-[#183247]";
        case 2:
          return "bg-[#1d4460] border-[#295c80] hover:bg-[#225070]";
        case 3:
          return "bg-[#25638a] border-[#3684b3] hover:bg-[#2c729c]";
        case 4:
          return "bg-[#4d97c5] border-[#7cbde3] hover:bg-[#62a5d1]";
        default:
          return "bg-[#0f141d] border-[#18202e] hover:border-[#2e3b52]";
      }
    } else if (palette === "emerald") {
      // Matte Forest & Sage (Natural matte greenery)
      switch (level) {
        case 1:
          return "bg-[#102e21] border-[#174532] hover:bg-[#143b2a]";
        case 2:
          return "bg-[#19523b] border-[#247554] hover:bg-[#1e6146]";
        case 3:
          return "bg-[#247a57] border-[#32a878] hover:bg-[#2b8f67]";
        case 4:
          return "bg-[#45a87e] border-[#72cca3] hover:bg-[#54ba8e]";
        default:
          return "bg-[#0f141d] border-[#18202e] hover:border-[#20352a]";
      }
    } else {
      // Matte Graphite & Platinum (Monochrome minimalist)
      switch (level) {
        case 1:
          return "bg-[#202736] border-[#2d374a] hover:bg-[#283144]";
        case 2:
          return "bg-[#343e54] border-[#475573] hover:bg-[#3d4963]";
        case 3:
          return "bg-[#586785] border-[#7588ab] hover:bg-[#647496]";
        case 4:
          return "bg-[#9ba9c2] border-[#c4d0e3] hover:bg-[#acbace]";
        default:
          return "bg-[#0f141d] border-[#18202e] hover:border-[#2d3748]";
      }
    }
  };

  return (
    <div className="w-full mb-10 sm:mb-14 rounded-2xl border border-[#1b2333] bg-[#0b0f17]/95 backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-2xl shadow-black/40">
      {/* Header Eyebrow & Matte Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#1b2333]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
            <TrendingUp size={13} className="text-slate-400" />
            <span>GitHub Engineering Analytics &amp; Cadence</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-100 tracking-tight">
            Contributions &amp; <span className="text-sky-400">Commit Heatmap</span>
          </h3>
        </div>

        {/* Controls: Time Range + 3-Way Matte Switcher */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#1b2333] bg-[#0e131d] text-xs font-mono text-slate-400">
            <Calendar size={12} className="text-slate-400" />
            <span>Last 365 Days</span>
          </div>

          {/* Matte Palette Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-lg border border-[#1b2333] bg-[#0e131d] text-[11px] font-mono">
            <button
              onClick={() => setPalette("slate")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                palette === "slate"
                  ? "bg-[#1b2436] text-sky-300 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Matte Slate
            </button>
            <button
              onClick={() => setPalette("emerald")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                palette === "emerald"
                  ? "bg-[#1b2436] text-emerald-300 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Matte Sage
            </button>
            <button
              onClick={() => setPalette("graphite")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                palette === "graphite"
                  ? "bg-[#1b2436] text-slate-200 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Graphite
            </button>
          </div>
        </div>
      </div>

      {/* Sleek Matte KPI Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Metric 1: Total Contributions */}
        <div className="p-4 rounded-xl border border-[#1b2333] bg-[#0e131d]/70 hover:border-[#2b3850] transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Total Contributions</span>
            <div className="w-6 h-6 rounded-md bg-[#161e2e] border border-[#232c3f] flex items-center justify-center text-slate-400">
              <GitCommit size={13} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-sans text-slate-100 tracking-tight">
            {data ? data.totalContributions.toLocaleString() : "1,118"}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">Commits &amp; PRs past year</p>
        </div>

        {/* Metric 2: Active Days */}
        <div className="p-4 rounded-xl border border-[#1b2333] bg-[#0e131d]/70 hover:border-[#2b3850] transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Active Days</span>
            <div className="w-6 h-6 rounded-md bg-[#161e2e] border border-[#232c3f] flex items-center justify-center text-slate-400">
              <CheckCircle2 size={13} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-sans text-slate-100 tracking-tight">
            {data ? `${data.activeDays} Days` : "142 Days"}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">Shipping &amp; push frequency</p>
        </div>

        {/* Metric 3: Longest Streak */}
        <div className="p-4 rounded-xl border border-[#1b2333] bg-[#0e131d]/70 hover:border-[#2b3850] transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Longest Streak</span>
            <div className="w-6 h-6 rounded-md bg-[#161e2e] border border-[#232c3f] flex items-center justify-center text-slate-400">
              <Flame size={13} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-sans text-slate-100 tracking-tight">
            {data ? `${data.maxStreak} Days` : "12 Days"}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">Continuous shipping record</p>
        </div>

        {/* Metric 4: Public Repositories */}
        <div className="p-4 rounded-xl border border-[#1b2333] bg-[#0e131d]/70 hover:border-[#2b3850] transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Public Repos</span>
            <div className="w-6 h-6 rounded-md bg-[#161e2e] border border-[#232c3f] flex items-center justify-center text-slate-400">
              <Layers size={13} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-sans text-slate-100 tracking-tight">
            {Object.keys(activeRepos).length > 0 ? Object.keys(activeRepos).length : "55"}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">AI, web &amp; mobile codebases</p>
        </div>
      </div>

      {/* Heatmap Calendar: 100% Full-Width (Zero Dead Space on Right) */}
      <div className="relative mb-6">
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
            <RefreshCw size={20} className="animate-spin text-slate-400" />
            <span className="text-xs font-mono">Loading contribution calendar...</span>
          </div>
        )}

        {!loading && (
          <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin">
            <div className="w-full min-w-[720px]">
              {/* Dynamic Responsive Month Labels */}
              <div className="relative w-full h-4 text-[10px] font-mono text-slate-400 mb-2 select-none">
                {monthLabels.map((m, idx) => (
                  <span
                    key={idx}
                    className="absolute font-medium"
                    style={{
                      left: `calc(28px + ${(m.weekIndex / weeks.length) * 100}% * 0.96)`,
                    }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Grid: 7 Rows (Days) x 52-53 Columns (Weeks) filling 100% of container */}
              <div className="w-full flex items-start gap-1.5 sm:gap-2">
                {/* Pixel-Aligned Day Labels Column */}
                <div className="flex flex-col gap-[3px] sm:gap-1 text-[9px] font-mono text-slate-500 select-none w-5 sm:w-6 flex-shrink-0 pt-[1px]">
                  <div className="h-2.5 sm:h-3.5 flex items-center leading-none">Sun</div>
                  <div className="h-2.5 sm:h-3.5 flex items-center leading-none opacity-0" aria-hidden="true">Mon</div>
                  <div className="h-2.5 sm:h-3.5 flex items-center leading-none">Tue</div>
                  <div className="h-2.5 sm:h-3.5 flex items-center leading-none opacity-0" aria-hidden="true">Wed</div>
                  <div className="h-2.5 sm:h-3.5 flex items-center leading-none">Thu</div>
                  <div className="h-2.5 sm:h-3.5 flex items-center leading-none opacity-0" aria-hidden="true">Fri</div>
                  <div className="h-2.5 sm:h-3.5 flex items-center leading-none">Sat</div>
                </div>

                {/* Weeks Grid: Stretches 100% across the full width */}
                <div className="flex-1 flex gap-[3px] sm:gap-1 min-w-0">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex-1 flex flex-col gap-[3px] sm:gap-1 min-w-[9px]">
                      {week.map((day) => (
                        <div
                          key={day.date}
                          onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-full aspect-square rounded-[2px] sm:rounded-[2.5px] border transition-colors duration-150 cursor-pointer ${getCellColor(
                            day.level
                          )}`}
                          title={`${day.count} contributions on ${day.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Swipe Notice */}
              <div className="sm:hidden text-[10px] font-mono text-slate-500 mt-2 text-center">
                ← Swipe horizontally to view full 365-day calendar →
              </div>
            </div>
          </div>
        )}

        {/* Tooltip Bar & Matte Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#1b2333] text-xs font-mono">
          <div className="text-slate-300 h-5 flex items-center">
            {hoveredDay ? (
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-100">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      palette === "slate" ? "#4d97c5" : palette === "emerald" ? "#45a87e" : "#9ba9c2",
                  }}
                />
                <span>
                  {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"} on{" "}
                  {formatDate(hoveredDay.date)}
                </span>
              </span>
            ) : (
              <span className="text-slate-500">Hover over any square to inspect contribution volume</span>
            )}
          </div>

          {/* Matte Intensity Legend */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 self-end sm:self-auto">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] border border-[#18202e] bg-[#0f141d]" />
            <span
              className={`w-2.5 h-2.5 rounded-[2px] border ${
                palette === "slate"
                  ? "bg-[#142838] border-[#1e3b52]"
                  : palette === "emerald"
                  ? "bg-[#102e21] border-[#174532]"
                  : "bg-[#202736] border-[#2d374a]"
              }`}
            />
            <span
              className={`w-2.5 h-2.5 rounded-[2px] border ${
                palette === "slate"
                  ? "bg-[#1d4460] border-[#295c80]"
                  : palette === "emerald"
                  ? "bg-[#19523b] border-[#247554]"
                  : "bg-[#343e54] border-[#475573]"
              }`}
            />
            <span
              className={`w-2.5 h-2.5 rounded-[2px] border ${
                palette === "slate"
                  ? "bg-[#25638a] border-[#3684b3]"
                  : palette === "emerald"
                  ? "bg-[#247a57] border-[#32a878]"
                  : "bg-[#586785] border-[#7588ab]"
              }`}
            />
            <span
              className={`w-2.5 h-2.5 rounded-[2px] border ${
                palette === "slate"
                  ? "bg-[#4d97c5] border-[#7cbde3]"
                  : palette === "emerald"
                  ? "bg-[#45a87e] border-[#72cca3]"
                  : "bg-[#9ba9c2] border-[#c4d0e3]"
              }`}
            />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Matte Language & Architecture Distribution Analysis */}
      {languages.length > 0 && (
        <div className="pt-5 border-t border-[#1b2333]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="font-semibold text-slate-200">Codebase Language Distribution</span>
            <span className="text-slate-500">Across 55 Public Repositories</span>
          </div>

          {/* Slim Matte Stacked Distribution Bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-[#0e131d] border border-[#1b2333] mb-3.5">
            {languages.map((item) => (
              <div
                key={item.language}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
                className="h-full transition-all duration-300"
                title={`${item.language}: ${item.count} repos (${item.percentage}%)`}
              />
            ))}
          </div>

          {/* Curated Matte Language Pills */}
          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
            {languages.slice(0, 6).map((item) => (
              <span
                key={item.language}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0e131d] border border-[#1b2333]"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-slate-300">{item.language}</span>
                <span className="text-slate-500 font-light">({item.percentage}%)</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GitHubContributionGraph;
