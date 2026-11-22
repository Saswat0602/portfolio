"use client";

import { useState } from "react";
import {
  Brain,
  Database,
  Cpu,
  Play,
  CheckCircle2,
  Workflow,
  Sparkles,
  Activity,
  Zap,
} from "lucide-react";

interface PipelineNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tech: string[];
  latency: string;
  metric: string;
  description: string;
  responsibilities: string[];
  color: string;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "intent",
    step: "01",
    title: "Client Intent & DOM SDK",
    subtitle: "Natural Language Ingestion",
    icon: Zap,
    tech: ["TypeScript", "Vanilla DOM SDK", "Shadow DOM"],
    latency: "12ms",
    metric: "45% latency drop in background tabs",
    description:
      "Zero-dependency embeddable SDK that captures user intent directly from browser input and safely translates natural-language prompts into structured command payloads.",
    responsibilities: [
      "Sandboxed execution within Shadow DOM to avoid CSS collisions",
      "Event-driven intent tokenization and payload serialization",
      "Immediate client-side heuristic validation & anti-tamper verification",
    ],
    color: "#38bdf8", // Cyan
  },
  {
    id: "router",
    step: "02",
    title: "LangGraph Agentic Router",
    subtitle: "Cyclical State Machine",
    icon: Workflow,
    tech: ["LangGraph.js", "TypeScript", "Node.js"],
    latency: "85ms",
    metric: "98% action execution success",
    description:
      "State-driven agentic router that formulates execution hypotheses, decides whether retrieval is required, and handles reviewer verification loops.",
    responsibilities: [
      "Dynamic node state machine: Planner ➔ Searcher ➔ Reviewer ➔ Reporter",
      "Bounded verification loop to eliminate hallucinations and phantom claims",
      "Persistent session checkpointing to PostgreSQL with rollback capabilities",
    ],
    color: "#818cf8", // Indigo
  },
  {
    id: "bedrock",
    step: "03",
    title: "AWS Bedrock Foundation Inference",
    subtitle: "LLM Reasoning & Synthesis",
    icon: Brain,
    tech: ["AWS Bedrock", "Anthropic Claude 3.5 Sonnet", "Python FastAPI"],
    latency: "340ms P95",
    metric: "Streaming token synthesis",
    description:
      "High-throughput serverless foundation model inference on AWS Bedrock generating structured curriculum outlines, deep research findings, and task actions.",
    responsibilities: [
      "Dynamic prompt engineering with deterministic output schemas",
      "Real-time token streaming to frontend clients via Server-Sent Events (SSE)",
      "Automated fallback routes between Claude 3.5 Sonnet, Claude 3.7, and local Ollama",
    ],
    color: "#a78bfa", // Lavender
  },
  {
    id: "vector",
    step: "04",
    title: "pgvector Semantic Retrieval",
    subtitle: "Hybrid Knowledge Search",
    icon: Database,
    tech: ["PostgreSQL", "pgvector", "Prisma ORM", "Redis"],
    latency: "28ms",
    metric: "Sub-second vector lookup",
    description:
      "Hybrid vector + keyword search querying thousands of technical documents and chapter indices using high-dimensional cosine similarity embeddings in PostgreSQL.",
    responsibilities: [
      "Chunked document ingestion with sliding semantic window overlap",
      "Redis semantic caching layer for frequently requested queries",
      "Metadata filtering by permission, organization, and access control",
    ],
    color: "#2dd4bf", // Teal
  },
  {
    id: "media",
    step: "05",
    title: "Distributed FFmpeg / HeyGen Pipeline",
    subtitle: "Parallel Media Synthesis",
    icon: Cpu,
    tech: ["FFmpeg", "HeyGen API", "BullMQ", "Docker"],
    latency: "Queue Worker",
    metric: "60% batch turnaround reduction",
    description:
      "Distributed queue-driven media processing engine that translates curriculum markdown into AI video lectures, automated timestamps, and synchronized quizzes.",
    responsibilities: [
      "Parallel chunked video rendering across distributed container workers",
      "FFmpeg audio-visual multiplexing with zero frame drop",
      "Timestamped transcript generation synchronized to video keyframes",
    ],
    color: "#fb923c", // Orange
  },
  {
    id: "webrtc",
    step: "06",
    title: "WebRTC & WebSocket Real-Time Sync",
    subtitle: "Bidirectional Peer Broadcast",
    icon: Activity,
    tech: ["WebRTC", "Socket.io", "React 19", "Next.js"],
    latency: "< 95ms",
    metric: "500+ concurrent peer streams",
    description:
      "Low-latency real-time delivery layer maintaining bidirectional WebSocket state sync, collaborative whiteboard updates, and WebRTC audio/video mesh connections.",
    responsibilities: [
      "Sub-100ms peer-to-peer media signaling with audio echo cancellation",
      "Optimistic UI state broadcast across multi-tenant rooms",
      "Graceful network recovery and automated socket reconnection",
    ],
    color: "#34d399", // Emerald
  },
];

export function ArchitectureExplorer() {
  const [activeNodeId, setActiveNodeId] = useState<string>("router");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedIndex, setSimulatedIndex] = useState<number>(-1);

  const activeNode =
    PIPELINE_NODES.find((n) => n.id === activeNodeId) || PIPELINE_NODES[0];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatedIndex(0);
    setActiveNodeId(PIPELINE_NODES[0].id);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < PIPELINE_NODES.length) {
        setSimulatedIndex(current);
        setActiveNodeId(PIPELINE_NODES[current].id);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimulatedIndex(-1);
        }, 1200);
      }
    }, 1400);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header with Simulator Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-theme-border bg-theme-surface/80 backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-accent-subtle border border-theme-border text-[11px] font-mono text-theme-accent font-medium mb-1.5">
            <Sparkles size={12} className="flex-shrink-0" />
            <span>Interactive Production Pipeline</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary tracking-tight">
            Applied AI &amp; Real-Time Systems Architecture
          </h3>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-0.5">
            Explore the end-to-end flow from natural language intent to vector RAG and distributed media rendering.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="btn-sheen inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-mono font-bold hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all shadow-md flex-shrink-0 cursor-pointer"
        >
          {isSimulating ? (
            <>
              <Activity size={14} className="animate-spin text-zinc-950" />
              <span>Simulating Step {simulatedIndex + 1}/6...</span>
            </>
          ) : (
            <>
              <Play size={14} />
              <span>Run Live Simulation</span>
            </>
          )}
        </button>
      </div>

      {/* Main Interactive Stage: Pipeline Pathway + Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 6 Interactive Pipeline Nodes (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {PIPELINE_NODES.map((node, index) => {
            const isSelected = activeNodeId === node.id;
            const isSimActive = simulatedIndex === index;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "border-theme-accent bg-theme-surface shadow-md"
                    : "border-theme-border bg-theme-surface/60 hover:bg-theme-surface hover:border-theme-border-strong"
                }`}
              >
                {/* Active glow pulse */}
                {isSimActive && (
                  <div className="absolute inset-0 bg-theme-accent/15 animate-pulse pointer-events-none" />
                )}

                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                        isSelected ? "scale-105" : "group-hover:scale-102"
                      }`}
                      style={{
                        backgroundColor: `${node.color}20`,
                        color: node.color,
                        border: `1px solid ${node.color}40`,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-theme-muted uppercase">
                          Step {node.step}
                        </span>
                        <span className="text-theme-border">•</span>
                        <span
                          className="text-[10px] font-mono font-semibold truncate"
                          style={{ color: node.color }}
                        >
                          {node.subtitle}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold font-sans text-theme-primary tracking-tight truncate">
                        {node.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-theme-surface-elevated border border-theme-border text-theme-accent font-semibold">
                      {node.latency}
                    </span>
                    <span className="text-[10px] font-mono text-theme-muted mt-1 hidden sm:inline">
                      {node.metric}
                    </span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-theme-border/50">
                  {node.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-theme-surface-elevated/70 text-theme-secondary border border-theme-border/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Telemetry Inspector (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-5 sm:p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-theme-border pb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${activeNode.color}20`,
                    color: activeNode.color,
                  }}
                >
                  <activeNode.icon size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-theme-muted uppercase block">
                    Telemetry Inspector
                  </span>
                  <span className="text-xs font-mono font-bold text-theme-primary">
                    Step {activeNode.step} • {activeNode.subtitle}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                Active Node
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold font-sans text-theme-primary mb-2">
                {activeNode.title}
              </h4>
              <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                {activeNode.description}
              </p>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-theme-border bg-theme-surface-elevated/60 text-xs font-mono">
              <div>
                <span className="text-[10px] text-theme-muted uppercase block mb-0.5">
                  Target Latency
                </span>
                <span className="text-theme-accent font-bold text-sm">
                  {activeNode.latency}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-theme-muted uppercase block mb-0.5">
                  Production Impact
                </span>
                <span className="text-theme-primary font-bold text-sm truncate block">
                  {activeNode.metric}
                </span>
              </div>
            </div>

            {/* Architecture Responsibilities */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-theme-primary font-semibold block mb-2.5">
                Core Architectural Mechanics:
              </span>
              <ul className="flex flex-col gap-2">
                {activeNode.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs font-mono text-theme-secondary leading-snug"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-theme-accent flex-shrink-0 mt-0.5"
                    />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="pt-3 border-t border-theme-border">
              <span className="text-[10px] font-mono uppercase text-theme-muted block mb-2">
                Underlying Stack &amp; Protocols:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-theme-surface-elevated border border-theme-border text-theme-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
