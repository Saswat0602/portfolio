"use client";

import { useState } from "react";
import { BeforeAfterScrubber } from "@/components/ui/BeforeAfterScrubber";
import { type ProjectData } from "@/lib/data";

interface ProjectComparisonScrubberProps {
  project: ProjectData;
}

export function ProjectComparisonScrubber({ project }: ProjectComparisonScrubberProps) {
  // Interactive state for 1-click actions inside the scrubber
  const [isCapped, setIsCapped] = useState<boolean>(false);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);

  // Content for AI Learning Platform
  if (project.slug === "ai-learning-platform") {
    return (
      <BeforeAfterScrubber
        beforeBadge="Before • Sequential FFmpeg & Manual Pipeline (45m)"
        afterBadge="After • HeyGen + FFmpeg Queue (-60% Batch Time)"
        initialPosition={48}
        beforeContent={
          <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/90 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-rose-400">
                  Legacy Production Bottleneck: 45 min / batch
                </span>
                <span className="text-[10px] text-zinc-500">Manual Process</span>
              </div>

              <div className="flex flex-col gap-3 pl-2 sm:pl-3 border-l-2 border-zinc-700">
                <div>
                  <span className="font-bold text-zinc-200">— Sequential Transcoding:</span>{" "}
                  Single-threaded FFmpeg processes blocking the main CPU node. 1080p clips took 25+ minutes per module.
                </div>
                <div>
                  <span className="font-bold text-zinc-200">— Desynchronized Transcripts:</span>{" "}
                  Audio voiceovers and visual chapters required manual timeline stitching with zero WebRTC peer feedback.
                </div>
                <div>
                  <span className="font-bold text-zinc-200">— Manual QA Overhead:</span>{" "}
                  Educators had to review video files individually; curriculum changes required full re-renders.
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                Total turnaround time: 3+ days across 100 enterprise courses with high production overhead.
              </div>
            </div>
          </div>
        }
        afterContent={
          <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs">
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/95 flex flex-col gap-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block">
                    DISTRIBUTED QUEUE ARCHITECTURE
                  </span>
                  <span className="text-sm font-sans font-bold text-zinc-100">
                    HeyGen API + FFmpeg Node Workers
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black font-sans text-emerald-400 tracking-tight">
                    -60.4%{" "}
                    <span className="text-xs font-mono font-normal text-zinc-400">
                      Batch Turnaround
                    </span>
                  </span>
                </div>
              </div>

              {/* 3 Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/80 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase">Worker Node Pool</span>
                  <span className="text-base font-bold text-zinc-100">8 FFmpeg Nodes</span>
                  <span className="text-[10px] text-emerald-400">Parallel stream chunking</span>
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/80 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase">Interactive WebRTC</span>
                  <span className="text-base font-bold text-zinc-100">&lt;120ms Jitter</span>
                  <span className="text-[10px] text-emerald-400">Live synchronized audio</span>
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/80 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase">Curriculum Engine</span>
                  <span className="text-base font-bold text-zinc-100">AWS Bedrock</span>
                  <span className="text-[10px] text-emerald-400">Automated script generator</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="text-emerald-400 font-semibold">
                  100+ Production Batches Deployed with zero pipeline stalls
                </span>
                <button
                  type="button"
                  onClick={() => setIsOptimized(!isOptimized)}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-mono cursor-pointer transition-colors"
                >
                  {isOptimized ? "Pipeline Verified ✓" : "Simulate Worker Health"}
                </button>
              </div>
            </div>
          </div>
        }
      />
    );
  }

  // Content for ReviewSage AI or Orbito
  if (project.slug === "reviewsage-ai" || project.slug === "orbito") {
    return (
      <BeforeAfterScrubber
        beforeBadge="Before • Raw Conversational Markdown Dump"
        afterBadge="Zod validated • 1-click actions & State Graph"
        initialPosition={48}
        beforeContent={
          <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/90 flex flex-col gap-4">
              <p className="text-zinc-400">
                Sure! Here is a breakdown of your system anomalies against baseline:
              </p>

              <div className="flex flex-col gap-3 pl-2 sm:pl-3 border-l-2 border-zinc-700 text-xs">
                <div>
                  <span className="font-bold text-zinc-200">— **vector-indexer**:</span>{" "}
                  Looks like this service has unthrottled HNSW embedding re-runs happening whenever a document is edited. Causing high Bedrock webhooks (+ $842.00).
                </div>
                <div>
                  <span className="font-bold text-zinc-200">— **mongo-analytics**:</span>{" "}
                  Increased by +$394.50. No TTL indexes configured yet so storage is growing uncompressed on telemetry.
                </div>
                <div>
                  <span className="font-bold text-zinc-200">— **edge-image-proxy**:</span>{" "}
                  Added +$184.00 due to cache control bypass header on resized routes.
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                Manual effort required: Engineering team had to decipher unstructured paragraphs and write manual scripts.
              </div>
            </div>
          </div>
        }
        afterContent={
          <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs">
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/95 flex flex-col gap-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">
                    AUTOMATED AGENTIC REMEDIATION
                  </span>
                  <span className="text-sm font-sans font-bold text-zinc-100">
                    State Machine Diagnostics
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

              {/* Action Rows */}
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/70 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-zinc-200 block">vector-indexer • unthrottled embeddings</span>
                    <span className="text-[11px] text-zinc-400">Titan Text v2 loop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-rose-300 font-bold">+$842.00</span>
                    <button
                      type="button"
                      onClick={() => setIsCapped(!isCapped)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                        isCapped
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                      }`}
                    >
                      {isCapped ? "Capped ✓" : "Cap batch"}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/70 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-zinc-200 block">mongo-analytics • unindexed collection</span>
                    <span className="text-[11px] text-zinc-400">Telemetry logs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-rose-300 font-bold">+$394.50</span>
                    <span className="px-2.5 py-1 rounded text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Apply TTL
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="text-emerald-400 font-semibold">
                  Zero manual scripting required • 1-Click execution
                </span>
                <span className="text-zinc-500">Deterministic Zod Schema</span>
              </div>
            </div>
          </div>
        }
      />
    );
  }

  // Default Fallback Comparison for other projects
  return (
    <BeforeAfterScrubber
      beforeBadge="Before • Legacy Sequential Bottlenecks"
      afterBadge="After • Production-Engineered Architecture"
      initialPosition={50}
      beforeContent={
        <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs text-zinc-300 leading-relaxed">
          <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/90 flex flex-col gap-3">
            <span className="font-bold text-rose-400 text-sm">
              Legacy Architectural Challenges
            </span>
            <div className="flex flex-col gap-2 pl-3 border-l-2 border-zinc-700">
              <div>— Sequential blocking queries causing high latency and UI freezing.</div>
              <div>— Cluttered forms with excessive DOM nodes and accessibility violations.</div>
              <div>— Uncached database calls leading to database connection pool saturation.</div>
            </div>
            <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
              Unoptimized baseline before systematic architectural overhaul.
            </div>
          </div>
        </div>
      }
      afterContent={
        <div className="w-full max-w-4xl pt-10 sm:pt-12 font-mono text-xs">
          <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/95 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-bold text-emerald-400 text-sm font-sans">
                Engineered Performance &amp; Clean Architecture
              </span>
              <span className="text-[10px] text-zinc-400">Next.js 16 • Strict TypeScript</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/80">
                <span className="text-[10px] text-zinc-400 block mb-1">LATENCY REDUCTION</span>
                <span className="text-base font-bold text-emerald-400">-60% to -90%</span>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/80">
                <span className="text-[10px] text-zinc-400 block mb-1">ACCESSIBILITY</span>
                <span className="text-base font-bold text-zinc-100">100% WCAG AA</span>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/80">
                <span className="text-[10px] text-zinc-400 block mb-1">TEST COVERAGE</span>
                <span className="text-base font-bold text-zinc-100">Production Tested</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="text-emerald-400 font-semibold">
                Modular domain separation with clean DDD layers
              </span>
              <span className="text-zinc-500">60fps Smooth</span>
            </div>
          </div>
        </div>
      }
    />
  );
}
