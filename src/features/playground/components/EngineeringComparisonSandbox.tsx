"use client";

import { useState } from "react";
import { BeforeAfterScrubber } from "@/components/ui/BeforeAfterScrubber";
import {
  Sparkles,
  Zap,
  Check,
  TrendingDown,
  Layout,
  ShieldCheck,
} from "lucide-react";

type ScenarioType = "ai-genui" | "network-perf" | "ui-craft";

interface ActionItem {
  id: string;
  service: string;
  cause: string;
  variance: string;
  actionLabel: string;
  isApplied: boolean;
}

export function EngineeringComparisonSandbox() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>("ai-genui");

  // State for interactive 1-click actions in Scenario 1
  const [actions, setActions] = useState<ActionItem[]>([
    {
      id: "vector",
      service: "vector-indexer",
      cause: "unthrottled HNSW embedding re-runs",
      variance: "+$842.00",
      actionLabel: "Cap batch",
      isApplied: false,
    },
    {
      id: "mongo",
      service: "mongo-analytics",
      cause: "unindexed collection telemetry",
      variance: "+$394.50",
      actionLabel: "Apply TTL",
      isApplied: false,
    },
    {
      id: "proxy",
      service: "edge-image-proxy",
      cause: "cache control bypass header",
      variance: "+$184.00",
      actionLabel: "Pin header",
      isApplied: false,
    },
  ]);

  const toggleAction = (id: string) => {
    setActions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isApplied: !item.isApplied } : item
      )
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 md:p-8 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-lg">
      {/* Top Header & Scenario Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-theme-accent font-semibold">
              ENGINEERING CRAFT // BEFORE VS. AFTER
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-theme-border bg-theme-surface text-theme-muted">
              Interactive Scrubber
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
            Before / After Comparison Scrubber
          </h3>
          <p className="text-xs sm:text-sm font-mono text-theme-secondary mt-1">
            Drag the vertical divider handle left or right to inspect the engineering difference.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveScenario("ai-genui")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeScenario === "ai-genui"
                ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                : "text-theme-secondary hover:text-theme-primary"
            }`}
          >
            <Sparkles size={13} />
            <span>AI: Raw Text vs. Generative UI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScenario("network-perf")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeScenario === "network-perf"
                ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                : "text-theme-secondary hover:text-theme-primary"
            }`}
          >
            <Zap size={13} />
            <span>Architecture: Waterfall vs. Edge Stream</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScenario("ui-craft")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeScenario === "ui-craft"
                ? "bg-theme-accent text-white dark:text-zinc-950 font-bold"
                : "text-theme-secondary hover:text-theme-primary"
            }`}
          >
            <Layout size={13} />
            <span>UI/UX: Cluttered vs. Minimal</span>
          </button>
        </div>
      </div>

      {/* Scenario 1: Raw LLM Markdown Dump vs. Zod-Validated Generative UI Card */}
      {activeScenario === "ai-genui" && (
        <BeforeAfterScrubber
          beforeBadge="Before • Raw Markdown Dump"
          afterBadge="Zod validated • 1-click actions"
          initialPosition={48}
          beforeContent={
            <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/90 flex flex-col gap-4">
                <p className="text-zinc-400">
                  Sure! Here is a breakdown of your Q4 infrastructure anomalies
                  against the 7-day rolling baseline (approx +$1,420.50/mo increase across us-east-1 and ap-south-1):
                </p>

                <div className="flex flex-col gap-3 pl-2 sm:pl-3 border-l-2 border-zinc-700">
                  <div>
                    <span className="font-bold text-zinc-200">
                      — **vector-indexer**:
                    </span>{" "}
                    Looks like this service has unthrottled HNSW embedding re-runs
                    happening whenever a document is edited via webhooks. Cost variance: +$842.00.
                  </div>

                  <div>
                    <span className="font-bold text-zinc-200">
                      — **mongo-analytics**:
                    </span>{" "}
                    Increased by <span className="text-zinc-100 font-bold">+$394.50</span>.
                    No TTL indexes configured yet so storage is growing uncompressed on telemetry.
                  </div>

                  <div>
                    <span className="font-bold text-zinc-200">
                      — **edge-image-proxy**:
                    </span>{" "}
                    Added <span className="text-zinc-100 font-bold">+$184.00</span> due
                    to cache control bypass header on resized routes. Let me know if you want me to write code to patch these!
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                  Notice: Sprawling prose requires manual human transcription into Jira or terminal commands.
                </div>
              </div>
            </div>
          }
          afterContent={
            <div className="w-full max-w-4xl pt-10 sm:pt-12 flex flex-col gap-4 font-mono">
              <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/95 flex flex-col gap-4 shadow-xl">
                {/* Metric Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">
                      ANOMALOUS Q4 SPEND // US-EAST-1 &amp; AP-SOUTH-1
                    </span>
                    <span className="text-sm font-sans font-bold text-zinc-200">
                      Automated Root-Cause Diagnostic
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black font-sans text-rose-400 tracking-tight">
                      +$1,420.50{" "}
                      <span className="text-xs font-mono font-normal text-zinc-400">
                        / mo
                      </span>
                    </span>
                  </div>
                </div>

                {/* Structured Interactive Action Table */}
                <div className="flex flex-col gap-2">
                  <div className="hidden sm:grid sm:grid-cols-12 text-[10px] text-zinc-500 uppercase tracking-wider pb-1 px-3">
                    <span className="col-span-7">Service / Root Cause</span>
                    <span className="col-span-3 text-right">Variance</span>
                    <span className="col-span-2 text-right">Action</span>
                  </div>

                  {actions.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/70 hover:border-zinc-700 transition-colors grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-3"
                    >
                      {/* Service info */}
                      <div className="sm:col-span-7 flex flex-col min-w-0">
                        <span className="text-xs font-bold text-zinc-200 font-mono truncate">
                          {item.service}
                        </span>
                        <span className="text-[11px] text-zinc-400 truncate">
                          {item.cause}
                        </span>
                      </div>

                      {/* Variance */}
                      <div className="sm:col-span-3 sm:text-right font-mono font-bold text-xs text-rose-300">
                        {item.variance}
                      </div>

                      {/* 1-Click Action Button */}
                      <div className="sm:col-span-2 sm:text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAction(item.id);
                          }}
                          className={`w-full sm:w-auto px-3 py-1.5 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            item.isApplied
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 active:scale-95"
                          }`}
                        >
                          {item.isApplied ? (
                            <>
                              <Check size={11} />
                              <span>Applied ✓</span>
                            </>
                          ) : (
                            <span>{item.actionLabel}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Insight */}
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <TrendingDown size={13} />
                    <span>Projected Savings: $1,420.50/mo on patch execution</span>
                  </span>
                  <span className="text-zinc-500 hidden sm:inline">
                    Interactive Tool-Calling UI
                  </span>
                </div>
              </div>
            </div>
          }
        />
      )}

      {/* Scenario 2: Unoptimized Waterfall vs. Coalesced Edge Stream */}
      {activeScenario === "network-perf" && (
        <BeforeAfterScrubber
          beforeBadge="Before • 1,840ms Sequential Waterfall"
          afterBadge="After • 142ms Coalesced Edge Stream"
          initialPosition={50}
          beforeContent={
            <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs">
              <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/90 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="font-bold text-rose-400">
                    Sequential Unbatched Waterfall: 1,840ms Total Latency
                  </span>
                  <span className="text-[10px] text-zinc-500">6 HTTP Roundtrips</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {[
                    { name: "1. Auth Token Exchange", delay: "320ms", bar: "w-2/5 bg-rose-500/60" },
                    { name: "2. SQL User Preference Query", delay: "280ms", bar: "w-1/3 bg-rose-500/60" },
                    { name: "3. Unindexed Vector Scan", delay: "640ms", bar: "w-4/5 bg-rose-600/80" },
                    { name: "4. LLM Completion Stream", delay: "480ms", bar: "w-3/5 bg-rose-500/60" },
                    { name: "5. Audit Telemetry Write", delay: "120ms", bar: "w-1/6 bg-rose-500/40" },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-zinc-300">
                        <span>{step.name}</span>
                        <span className="text-rose-300 font-bold">{step.delay}</span>
                      </div>
                      <div className="w-full h-2 rounded bg-zinc-800 overflow-hidden">
                        <div className={`h-full rounded ${step.bar}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                  Problem: Sequential roundtrips block paint for 1.84 seconds with 0 edge caching.
                </div>
              </div>
            </div>
          }
          afterContent={
            <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs">
              <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/95 flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-400 text-sm">
                      Coalesced Parallel Edge Stream: 142ms P95
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      -92.3% Latency
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400">1 Coalesced RPC</span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-100 block">
                        Parallel Edge Worker Coalescence
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Auth + User Prefs retrieved in parallel from Redis Edge Cache (4ms)
                      </span>
                    </div>
                    <span className="text-emerald-400 font-bold font-mono">14ms</span>
                  </div>

                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-100 block">
                        pgvector HNSW Cosine Index Gating
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        1024-dim Titan vectors filtered with cosine similarity index
                      </span>
                    </div>
                    <span className="text-emerald-400 font-bold font-mono">38ms</span>
                  </div>

                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-100 block">
                        Direct Bedrock TTFT Chunk Streaming
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Initial tokens streamed to client before whole response compiles
                      </span>
                    </div>
                    <span className="text-emerald-400 font-bold font-mono">90ms</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="text-emerald-400 font-semibold">
                    Result: Instantaneous first paint with zero UI blocking
                  </span>
                  <span className="text-zinc-500">HTTP/2 Multiplexed</span>
                </div>
              </div>
            </div>
          }
        />
      )}

      {/* Scenario 3: Legacy Cluttered Wireframe vs. High-Craft Minimalist UI */}
      {activeScenario === "ui-craft" && (
        <BeforeAfterScrubber
          beforeBadge="Before • Cluttered Legacy Wireframe"
          afterBadge="After • Minimalist Architectural Workspace"
          initialPosition={50}
          beforeContent={
            <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs">
              <div className="p-4 sm:p-6 rounded-xl border border-zinc-700 bg-zinc-900/90 flex flex-col gap-3">
                <div className="p-2 border-2 border-dashed border-zinc-600 bg-zinc-800 text-zinc-400 text-center font-bold">
                  [ LEGACY ADMIN DASHBOARD - RAW FORM FIELDS ]
                </div>

                <div className="grid grid-cols-2 gap-2 text-zinc-400 text-[11px]">
                  <div className="p-2 border border-zinc-700 bg-zinc-950">
                    Input: &lt;input type=&quot;text&quot; name=&quot;filter_1&quot; /&gt;
                  </div>
                  <div className="p-2 border border-zinc-700 bg-zinc-950">
                    Input: &lt;select name=&quot;cat_id&quot;&gt;...&lt;/select&gt;
                  </div>
                  <div className="p-2 border border-zinc-700 bg-zinc-950">
                    Unformatted JSON Dump: &#123; err: 504, retries: 0 &#125;
                  </div>
                  <div className="p-2 border border-zinc-700 bg-zinc-950">
                    Warning: 44 accessibility contrast errors detected
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                  Legacy: No design system, zero mobile layout, difficult to parse.
                </div>
              </div>
            </div>
          }
          afterContent={
            <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs">
              <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/95 flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-theme-accent" />
                    <span className="font-bold text-zinc-100 font-sans text-sm">
                      Next.js 16 Architectural Command Workspace
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded border border-theme-border bg-theme-surface text-theme-accent text-[10px] font-bold">
                    100% WCAG AA
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 flex flex-col justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase">Speed</span>
                    <span className="text-xl font-bold font-sans text-zinc-100">0ms Jitter</span>
                    <span className="text-[10px] text-emerald-400">Optimistic UI updates</span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 flex flex-col justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase">Accessibility</span>
                    <span className="text-xl font-bold font-sans text-zinc-100">Full A11y</span>
                    <span className="text-[10px] text-emerald-400">Screen reader verified</span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 flex flex-col justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase">Keyboard</span>
                    <span className="text-xl font-bold font-sans text-zinc-100">⌘K Ready</span>
                    <span className="text-[10px] text-emerald-400">Zero-mouse navigation</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="text-theme-accent">Swiss typographic hierarchy with design token variables</span>
                  <span className="text-zinc-500">60fps Smooth</span>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
