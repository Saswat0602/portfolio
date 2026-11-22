"use client";

import { useState, useRef } from "react";
import {
  FileText,
  Sliders,
  Check,
  Compass,
} from "lucide-react";

interface ArchitecturalSpec {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  abstract: string;
  date: string;
  rev: string;
  parameters: {
    label: string;
    value: string;
    unit: string;
  }[];
  breakdown: string[];
}

const ARCHITECTURAL_SPECS: ArchitecturalSpec[] = [
  {
    id: "rag",
    code: "SPEC_01.AI-RAG",
    title: "AWS Bedrock & pgvector Hybrid Semantic Search Engine",
    subtitle: "SYSTEM ARCHITECTURE SPECIFICATION // RETRIEVAL AUGMENTED GENERATION",
    abstract:
      "A dual-tier retrieval pipeline combining dense vector embeddings (Amazon Titan Text v2, 1024-dim) with sparse lexical indexes in PostgreSQL (pgvector). Employs reciprocal rank fusion (RRF) and dynamic relevance gating to deliver sub-180ms p95 query latency across enterprise curriculum corpora.",
    date: "2024.Q4",
    rev: "REV 4.2.0",
    parameters: [
      { label: "Vector Dimension", value: "1024", unit: "dim" },
      { label: "Indexing Technique", value: "HNSW", unit: "m=16, ef=64" },
      { label: "P95 Query SLA", value: "176", unit: "ms" },
      { label: "Hybrid RRF Weight", value: "0.68 / 0.32", unit: "dense/sparse" },
    ],
    breakdown: [
      "Chunk Partitioning: 512-token rolling windows with 64-token semantic boundary overlap.",
      "Embedding Inference: AWS Bedrock Titan Text v2 with batch dispatching via worker queue.",
      "Re-Ranking Stage: Cross-encoder reranking filter pruning bottom 40% low-confidence candidates.",
    ],
  },
  {
    id: "media",
    code: "SPEC_02.MEDIA-FFMPEG",
    title: "Distributed Automated Video Synthesis & WebRTC Engine",
    subtitle: "SYSTEM ARCHITECTURE SPECIFICATION // HEYGEN + FFMPEG ASYNC QUEUE",
    abstract:
      "Queue-driven media orchestration system synthesizing photorealistic lecture videos from structured curriculum scripts. Uses Redis BullMQ worker nodes to transcode, stitch multi-angle scenes, and inject synchronized WebRTC audio transcripts, reducing batch synthesis latency by 60%.",
    date: "2025.Q1",
    rev: "REV 3.8.1",
    parameters: [
      { label: "Encoding Profile", value: "H.264 / AAC", unit: "1080p60" },
      { label: "Batch Turnaround", value: "-60.4", unit: "% vs legacy" },
      { label: "Audio Bitrate", value: "320", unit: "kbps stereo" },
      { label: "WebRTC Latency", value: "<120", unit: "ms jitter" },
    ],
    breakdown: [
      "Script Parse Stage: AST compiler generating synchronized timeline manifests from Markdown.",
      "Avatar Generation: HeyGen API webhook dispatching with frame-accurate speech synthesis.",
      "FFmpeg Concurrency: Node.js worker pool compiling raw MP4 streams into production HLS.",
    ],
  },
  {
    id: "copilot",
    code: "SPEC_03.DOM-COPILOT",
    title: "Zero-Dependency Cross-Platform Copilot DOM SDK",
    subtitle: "SYSTEM ARCHITECTURE SPECIFICATION // BROWSER EXTENSION & WORKER",
    abstract:
      "A lightweight, zero-dependency browser extension architecture providing real-time natural language automation over active web application DOMs. Utilizes isolated content scripts, structured accessibility tree serializations, and streaming LLM function calls.",
    date: "2025.Q2",
    rev: "REV 2.1.0",
    parameters: [
      { label: "SDK Bundle Size", value: "18.4", unit: "KB gzipped" },
      { label: "DOM Parse Delay", value: "<8.5", unit: "ms" },
      { label: "Memory Overhead", value: "2.8", unit: "MB RAM" },
      { label: "Browser Support", value: "Chrome, Edge", unit: "Manifest V3" },
    ],
    breakdown: [
      "A11y Tree Extraction: Traverses accessible DOM nodes skipping non-interactive presentation tags.",
      "Action Execution: Dispatches trusted synthetic user events with automatic retry idempotency.",
      "Security Boundary: Sandboxed runtime executing without external script injections.",
    ],
  },
];

export function SwissEditorialSpec() {
  const [activeSpecId, setActiveSpecId] = useState<string>("rag");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [concurrencyFactor, setConcurrencyFactor] = useState<number>(24);
  const [cursorCoord, setCursorCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringGrid, setIsHoveringGrid] = useState<boolean>(false);

  const specContainerRef = useRef<HTMLDivElement>(null);

  const currentSpec = ARCHITECTURAL_SPECS.find((s) => s.id === activeSpecId) || ARCHITECTURAL_SPECS[0];

  // Mouse Move tracking for Swiss architectural coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!specContainerRef.current) return;
    const rect = specContainerRef.current.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * 10) / 10;
    const y = Math.round((e.clientY - rect.top) * 10) / 10;
    setCursorCoord({ x, y });
  };

  // Calculated dynamic throughput based on Swiss slider
  const dynamicThroughput = Math.round(concurrencyFactor * 14.8);
  const dynamicP99 = Math.round(180 + (concurrencyFactor > 30 ? (concurrencyFactor - 30) * 4.2 : 0));

  return (
    <div
      ref={specContainerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringGrid(true)}
      onMouseLeave={() => setIsHoveringGrid(false)}
      className={`relative w-full flex flex-col font-sans transition-colors duration-200 border select-none ${
        isDarkMode
          ? "bg-[#0F1115] text-[#ECEFF4] border-[#2E3440]"
          : "bg-[#FAF9F6] text-[#1A1A1A] border-[#D8D5CD]"
      }`}
    >
      {/* Structural Crosshair Guide Lines tracking mouse */}
      {isHoveringGrid && (
        <>
          <div
            className="absolute top-0 bottom-0 pointer-events-none border-l z-20"
            style={{
              left: `${cursorCoord.x}px`,
              borderColor: isDarkMode ? "rgba(236,239,244,0.15)" : "rgba(26,26,26,0.15)",
            }}
          />
          <div
            className="absolute left-0 right-0 pointer-events-none border-t z-20"
            style={{
              top: `${cursorCoord.y}px`,
              borderColor: isDarkMode ? "rgba(236,239,244,0.15)" : "rgba(26,26,26,0.15)",
            }}
          />
        </>
      )}

      {/* Top Swiss Document Header Bar */}
      <div
        className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b gap-3 ${
          isDarkMode ? "border-[#2E3440] bg-[#14171D]" : "border-[#D8D5CD] bg-[#F3F1EC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider uppercase border ${
              isDarkMode
                ? "bg-[#1E232A] text-[#ECEFF4] border-[#3B4252]"
                : "bg-white text-[#1A1A1A] border-[#D8D5CD]"
            }`}
          >
            DOC // ARCH-2025
          </div>
          <span className="font-mono text-xs tracking-widest uppercase font-medium">
            SWISS ARCHITECTURAL SPECIFICATION &amp; RESTRAINT
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Coordinates readout */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#767676]">
            <Compass size={12} />
            <span>
              X: {cursorCoord.x.toFixed(1)}mm | Y: {cursorCoord.y.toFixed(1)}mm
            </span>
          </div>

          {/* Palette Switcher */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-2.5 py-1 font-mono text-xs border transition-colors cursor-pointer ${
              isDarkMode
                ? "bg-[#2E3440] text-white border-[#4C566A]"
                : "bg-white text-[#1A1A1A] border-[#D8D5CD] hover:bg-[#EAE7E0]"
            }`}
          >
            {isDarkMode ? "LIGHT EDITION" : "DARK BLUEPRINT"}
          </button>
        </div>
      </div>

      {/* Spec Selection Navigation (Tabular Hairline) */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 border-b text-xs font-mono tracking-wider ${
          isDarkMode ? "border-[#2E3440]" : "border-[#D8D5CD]"
        }`}
      >
        {ARCHITECTURAL_SPECS.map((spec, index) => {
          const isActive = spec.id === activeSpecId;
          return (
            <button
              key={spec.id}
              type="button"
              onClick={() => setActiveSpecId(spec.id)}
              className={`p-3 sm:p-4 text-left border-b sm:border-b-0 sm:border-r last:border-r-0 transition-colors cursor-pointer relative ${
                isActive
                  ? isDarkMode
                    ? "bg-[#1A1E24] text-white font-semibold"
                    : "bg-white text-[#1A1A1A] font-semibold"
                  : isDarkMode
                  ? "bg-[#0F1115] text-[#8892B0] hover:bg-[#14171D]"
                  : "bg-[#FAF9F6] text-[#767676] hover:bg-[#F3F1EC]"
              } ${isDarkMode ? "border-[#2E3440]" : "border-[#D8D5CD]"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#888888]">
                  INDEX // 0{index + 1}
                </span>
                {isActive && <Check size={12} className="text-[#1A1A1A] dark:text-white" />}
              </div>
              <div className="truncate text-xs font-bold">{spec.code}</div>
            </button>
          );
        })}
      </div>

      {/* Main Architectural Spec Body */}
      <div className="p-5 sm:p-8 md:p-10 flex flex-col gap-8">
        {/* Masked Text Reveal Headline */}
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#767676]">
              {currentSpec.subtitle}
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 border border-current text-[#767676]">
              {currentSpec.rev}
            </span>
          </div>

          <h2
            key={currentSpec.id}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            {currentSpec.title}
          </h2>

          <p className="max-w-4xl text-sm sm:text-base leading-relaxed text-[#555555] dark:text-[#A0A8B8] font-normal pt-2">
            {currentSpec.abstract}
          </p>
        </div>

        {/* 1px Hairline Structural Parameter Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 border text-left ${
            isDarkMode ? "border-[#2E3440] bg-[#14171D]" : "border-[#D8D5CD] bg-white"
          }`}
        >
          {currentSpec.parameters.map((param, i) => (
            <div
              key={param.label}
              className={`p-4 sm:p-5 flex flex-col justify-between border-r last:border-r-0 border-b md:border-b-0 ${
                i % 2 === 1 ? "border-r-0 md:border-r" : ""
              } ${isDarkMode ? "border-[#2E3440]" : "border-[#D8D5CD]"}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#767676] mb-2 block">
                {param.label}
              </span>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight block">
                  {param.value}
                </span>
                <span className="font-mono text-[11px] text-[#888888] block mt-0.5">
                  {param.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Decomposition & Interactive Stress Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Left: Decomposed System Steps (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#767676]">
              STRUCTURAL STAGES &amp; CONSTRAINTS
            </span>

            <div className="flex flex-col gap-2.5">
              {currentSpec.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 sm:p-4 border font-mono text-xs leading-relaxed flex items-start gap-3 ${
                    isDarkMode
                      ? "border-[#2E3440] bg-[#14171D] text-[#ECEFF4]"
                      : "border-[#D8D5CD] bg-white text-[#1A1A1A]"
                  }`}
                >
                  <span className="text-[#888888] flex-shrink-0 font-bold">
                    [0{idx + 1}]
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Architectural Concurrency Calculator (5 cols) */}
          <div
            className={`lg:col-span-5 p-5 border flex flex-col justify-between ${
              isDarkMode ? "border-[#2E3440] bg-[#14171D]" : "border-[#D8D5CD] bg-[#F3F1EC]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  SLA CAPACITY SIMULATOR
                </span>
                <Sliders size={14} className="text-[#767676]" />
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#767676]">Worker Concurrency:</span>
                  <span className="font-bold">{concurrencyFactor} Nodes</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="64"
                  value={concurrencyFactor}
                  onChange={(e) => setConcurrencyFactor(Number(e.target.value))}
                  className="w-full h-1 bg-[#D8D5CD] dark:bg-[#2E3440] rounded-none appearance-none cursor-pointer accent-[#1A1A1A] dark:accent-white"
                />
              </div>

              {/* Dynamic Readouts */}
              <div
                className={`p-3 border flex flex-col gap-2 font-mono text-xs ${
                  isDarkMode ? "border-[#2E3440] bg-[#1E232A]" : "border-[#D8D5CD] bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#767676]">Throughput:</span>
                  <span className="font-bold">{dynamicThroughput} req/sec</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#767676]">P99 Latency:</span>
                  <span className="font-bold">{dynamicP99} ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#767676]">VRAM Envelope:</span>
                  <span className="font-bold">{(concurrencyFactor * 0.42).toFixed(1)} GB</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t font-mono text-[11px] text-[#767676] flex items-center justify-between border-inherit">
              <span>ZERO GLOW // ZERO GRADIENTS</span>
              <span>STANDARDS COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swiss Bottom Colophon */}
      <div
        className={`p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px] ${
          isDarkMode
            ? "border-[#2E3440] bg-[#14171D] text-[#8892B0]"
            : "border-[#D8D5CD] bg-[#F3F1EC] text-[#767676]"
        }`}
      >
        <div className="flex items-center gap-2">
          <FileText size={13} />
          <span>SWISS INTERNATIONAL TYPOGRAPHIC STYLE • MONOSPACE NUMERICS</span>
        </div>
        <div>
          <span>AUTHOR: SASWAT RANJAN // SYSTEM ARCHITECT</span>
        </div>
      </div>
    </div>
  );
}
