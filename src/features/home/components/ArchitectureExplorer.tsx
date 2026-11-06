"use client";

import { useState } from "react";
import {
  Sparkles,
  Zap,
  Activity,
  Workflow,
  FileVideo,
  CheckCircle2,
  Terminal,
  Radio,
  Network,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export type PipelineMode = "agentic" | "video" | "spatial";

export interface ArchNode {
  id: string;
  tier: string;
  name: string;
  description: string;
  tech: string[];
  protocol: string;
  latency: string;
  payload: string;
}

export function ArchitectureExplorer() {
  const [pipeline, setPipeline] = useState<PipelineMode>("agentic");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("agent-core");

  const pipelines: Record<
    PipelineMode,
    {
      title: string;
      subtitle: string;
      metric: string;
      metricLabel: string;
      busLabel: string;
      nodes: ArchNode[];
    }
  > = {
    agentic: {
      title: "Agentic Copilot & RAG Pipeline (Taskosaur Any)",
      subtitle: "Autonomous multi-step tool execution with zero-dependency Shadow DOM SDK and pgvector",
      metric: "384ms",
      metricLabel: "P95 Vector + Tool Latency",
      busLabel: "TASKOSAUR_ANY // DUAL-WAY SSE PACKET CONDUIT",
      nodes: [
        {
          id: "client-sdk",
          tier: "Tier 1: Client Runtime",
          name: "Shadow DOM SDK Widget",
          description: "Isolated Web Component embedded in host application with zero CSS bleed and scoped state.",
          tech: ["Native Web Components", "Shadow DOM", "TypeScript", "SSE Receiver"],
          protocol: "Server-Sent Events (SSE)",
          latency: "12ms",
          payload: `{"event":"copilot.query","action":"analyze_kpi","contextId":"ctx_981"}`,
        },
        {
          id: "api-gateway",
          tier: "Tier 2: Ingress & Security",
          name: "FastAPI Streaming Gateway",
          description: "Asynchronous gateway handling client session authentication, token rate-limiting, and validation.",
          tech: ["Python FastAPI", "Pydantic V2", "Redis Token Bucket", "CORS Guard"],
          protocol: "HTTP/2 Asynchronous Stream",
          latency: "28ms",
          payload: `{"authenticated":true,"tenantId":"nettantra_prod","rateLimitRemaining":498}`,
        },
        {
          id: "agent-core",
          tier: "Tier 3: Reasoning Engine",
          name: "LangGraph Multi-Agent Core",
          description: "Cyclic state machine coordinating Planner, Tool Executor, and Guardrail verification with AWS Bedrock.",
          tech: ["AWS Bedrock", "Claude 3.5 Sonnet", "LangGraph", "JSON Schema Tooling"],
          protocol: "Bedrock InvokeModelWithResponseStream",
          latency: "240ms",
          payload: `{"plan":[{"step":1,"tool":"search_vector_db"},{"step":2,"tool":"format_output"}],"status":"executing"}`,
        },
        {
          id: "vector-store",
          tier: "Tier 4: Persistence & Index",
          name: "pgvector & HNSW Hybrid Store",
          description: "Combines BM25 lexical search with 1536-dimensional cosine embeddings and Redis semantic caching.",
          tech: ["PostgreSQL", "pgvector", "HNSW Index", "Redis Semantic Cache"],
          protocol: "pgvector Cosine Distance (<=>)",
          latency: "104ms",
          payload: `{"similarity":0.942,"top_k":5,"cacheHit":false,"indexedRows":190000}`,
        },
      ],
    },
    video: {
      title: "Automated AI Video LMS Pipeline (VSA)",
      subtitle: "High-throughput asynchronous markdown lecture transcription to HeyGen/FFmpeg video",
      metric: "-60%",
      metricLabel: "Batch Turnaround Reduction",
      busLabel: "VSA_MEDIA_PIPELINE // DISTRIBUTED ENCODING BUS",
      nodes: [
        {
          id: "client-sdk",
          tier: "Tier 1: Student & LMS Web",
          name: "Next.js 15 Lecture Portal",
          description: "Streaming video playback with synchronized interactive quiz overlays and WebRTC tutoring.",
          tech: ["Next.js 15", "React 19", "WebRTC Mesh", "Tailwind CSS"],
          protocol: "HLS Video Stream & WebRTC",
          latency: "8ms",
          payload: `{"lectureId":"lec_vsa_04","trackProgress":0.78,"tutoringSessionActive":true}`,
        },
        {
          id: "api-gateway",
          tier: "Tier 2: Ingestion & Queue",
          name: "Distributed Job Dispatcher",
          description: "Node.js & BullMQ task broker assigning markdown lecture scripts into parallel video chunks.",
          tech: ["Node.js", "BullMQ", "Redis Queue", "Docker Workers"],
          protocol: "Redis Stream Queue",
          latency: "18ms",
          payload: `{"jobId":"batch_render_992","chunksCount":8,"priority":"high"}`,
        },
        {
          id: "agent-core",
          tier: "Tier 3: Generation Core",
          name: "HeyGen & FFmpeg Engine",
          description: "Generates photorealistic talking AI avatars and stitches audio spectrograms and slides via FFmpeg.",
          tech: ["HeyGen AI API", "FFmpeg CLI", "Python Parallel Worker", "Audio DSP"],
          protocol: "REST API & Unix IPC Pipe",
          latency: "1420ms",
          payload: `{"renderingState":"compositing","audioSynced":true,"encoding":"H.264/AAC"}`,
        },
        {
          id: "vector-store",
          tier: "Tier 4: Storage & Assets",
          name: "S3 Object Store & PostgreSQL",
          description: "Stores encrypted video chunks, timestamps, generated transcripts, and student completion records.",
          tech: ["AWS S3", "PostgreSQL", "CloudFront CDN", "Multipart Upload"],
          protocol: "S3 Presigned Multi-part",
          latency: "45ms",
          payload: `{"s3Key":"courses/2025/vsa-lec-4.mp4","fileSizeMb":142.6,"cdnCached":true}`,
        },
      ],
    },
    spatial: {
      title: "Spatial Geolocation Engine (Shomes.in)",
      subtitle: "Sub-50ms geospatial boundary queries and live agent dispatch for 10k+ listings",
      metric: "42ms",
      metricLabel: "Average Spatial Query Latency",
      busLabel: "SHOMES_SPATIAL // POSTGIS KNN STREAM",
      nodes: [
        {
          id: "client-sdk",
          tier: "Tier 1: Explorer UI",
          name: "Interactive Map Viewport",
          description: "Clustered marker rendering with dynamic bounding-box sync as user pans and zooms.",
          tech: ["React 19", "Map Clustering", "Debounced Geolocation", "Tailwind CSS"],
          protocol: "GeoJSON Vector Tiles",
          latency: "14ms",
          payload: `{"viewport":{"north":20.31,"south":20.27,"east":85.86,"west":85.80},"zoom":14}`,
        },
        {
          id: "api-gateway",
          tier: "Tier 2: Spatial Gateway",
          name: "Express Geocoding Router",
          description: "Resolves reverse geocodes, filters property amenities, and coordinates agent live leads.",
          tech: ["Node.js", "Express.js", "Redis Spatial Index", "JWT Auth"],
          protocol: "RESTful JSON / WebSockets",
          latency: "16ms",
          payload: `{"city":"Bhubaneswar","propertyType":"residential","verifiedOnly":true}`,
        },
        {
          id: "agent-core",
          tier: "Tier 3: Query & Dispatch",
          name: "Spatial Routing Worker",
          description: "Calculates distance matrices, neighborhood statistics, and matches buyer intent to listings.",
          tech: ["PostGIS ST_DWithin", "Spatial KNN", "Async Lead Dispatch", "Redis Streams"],
          protocol: "PostGIS Spatial Pipeline",
          latency: "24ms",
          payload: `{"matchedListings":48,"nearestAgentId":"agent_bbsr_12","radiusKm":3.5}`,
        },
        {
          id: "vector-store",
          tier: "Tier 4: Persistent Store",
          name: "PostgreSQL & PostGIS R-Tree",
          description: "Relational persistence with R-Tree geospatial indexing on geometry columns for fast bounding checks.",
          tech: ["PostgreSQL 16", "PostGIS Extension", "GIST Spatial Index", "Connection Pool"],
          protocol: "SQL Spatial Query",
          latency: "12ms",
          payload: `{"index":"gist_property_geom","scannedRows":48,"executionTimeMs":11.8}`,
        },
      ],
    },
  };

  const activePipeline = pipelines[pipeline];
  const activeNode =
    activePipeline.nodes.find((n) => n.id === selectedNodeId) ||
    activePipeline.nodes[0];

  return (
    <section
      id="architecture"
      className="w-full py-24 px-6 sm:px-8 bg-theme-base text-theme-primary relative z-10 border-t border-theme-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
              <Activity size={13} />
              <span>SYSTEM ARCHITECTURE EXPLORER // DATA FLOW PULSE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-theme-primary tracking-tight">
              Interactive Data Flow &amp;{" "}
              <span className="text-theme-accent">AI Architecture</span>
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-theme-secondary font-light mt-3">
              Explore how packets travel across the 4-tier production architecture—from client SDK runtimes and streaming gateways to AWS Bedrock agentic graphs and pgvector stores.
            </p>
          </div>

          {/* Quick Metrics Badge with AnimatedCounter */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-theme-border bg-theme-surface/80 backdrop-blur-xl">
            <div className="text-right">
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider block">
                {activePipeline.metricLabel}
              </span>
              <span className="text-2xl font-black font-mono text-theme-accent">
                <AnimatedCounter value={activePipeline.metric} />
              </span>
            </div>
            <div className="w-px h-10 bg-theme-border" />
            <div className="text-right">
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider block">
                Action Accuracy
              </span>
              <span className="text-2xl font-black font-mono text-emerald-500">
                <AnimatedCounter value="98%" />
              </span>
            </div>
          </div>
        </div>

        {/* Pipeline Mode Switcher */}
        <div className="flex flex-wrap gap-2.5 mb-8 p-1.5 rounded-2xl border border-theme-border bg-theme-surface/80 max-w-fit">
          <button
            onClick={() => {
              setPipeline("agentic");
              setSelectedNodeId("agent-core");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
              pipeline === "agentic"
                ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
            }`}
          >
            <Sparkles size={13} />
            <span>Agentic Copilot Flow</span>
          </button>
          <button
            onClick={() => {
              setPipeline("video");
              setSelectedNodeId("agent-core");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
              pipeline === "video"
                ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
            }`}
          >
            <FileVideo size={13} />
            <span>AI Video Pipeline</span>
          </button>
          <button
            onClick={() => {
              setPipeline("spatial");
              setSelectedNodeId("agent-core");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
              pipeline === "spatial"
                ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
            }`}
          >
            <Zap size={13} />
            <span>Spatial Geo Flow</span>
          </button>
        </div>

        {/* Visual Architecture Flow Diagram with Animated Pulsing Data Stream */}
        <div className="relative mb-12 p-6 sm:p-8 rounded-3xl border border-theme-border bg-theme-surface/90 backdrop-blur-2xl shadow-xl overflow-hidden">
          {/* Background subtle drift grid */}
          <div className="absolute inset-0 dot-grid-drift opacity-40 pointer-events-none" />

          {/* Flow Nodes Container with Interactive Connectors */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {activePipeline.nodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const isLast = index === activePipeline.nodes.length - 1;

              return (
                <div key={node.id} className="relative flex flex-col">
                  {/* Node Card */}
                  <SpotlightCard
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`flex-1 p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-theme-accent bg-theme-surface ring-2 ring-theme-accent/30 shadow-lg scale-[1.02]"
                        : "border-theme-border bg-theme-surface/60 hover:border-theme-accent/60 hover:bg-theme-surface"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-theme-accent font-semibold">
                          {node.tier}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-base/90 text-theme-muted border border-theme-border/50">
                          {node.latency}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-theme-primary mb-1">
                        {node.name}
                      </h4>
                      <p className="text-xs text-theme-secondary line-clamp-2 font-light">
                        {node.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-theme-border/60 flex items-center justify-between text-[11px] font-mono text-theme-muted">
                      <span className="truncate pr-2">{node.protocol}</span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected
                            ? "bg-theme-accent"
                            : "bg-emerald-500"
                        }`}
                      />
                    </div>
                  </SpotlightCard>

                  {/* Horizontal Data Conduit & Animated Packet Stream between Desktop Cards */}
                  {!isLast && (
                    <div className="hidden md:flex absolute -right-3.5 lg:-right-4.5 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none w-7 h-7">
                      {/* Conduit Line */}
                      <div className="w-7 h-7 rounded-full border border-theme-border bg-theme-base flex items-center justify-center text-theme-accent shadow-sm relative overflow-visible">
                        {/* Glowing Packet Traveling through the Hop */}
                        <span
                          className="packet-stream-dot"
                          style={{
                            animationDuration: "1.4s",
                            animationDelay: `${index * 0.45}s`,
                          }}
                        />
                        <Radio size={13} className="text-theme-accent/70" />
                      </div>
                    </div>
                  )}

                  {/* Vertical Data Conduit & Animated Packet Stream on Mobile */}
                  {!isLast && (
                    <div className="md:hidden flex items-center justify-center py-2 relative">
                      <div className="w-0.5 h-6 bg-theme-border relative overflow-visible flex items-center justify-center">
                        <span
                          className="packet-stream-dot-vertical"
                          style={{
                            animationDuration: "1.2s",
                            animationDelay: `${index * 0.4}s`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Master Continuous Data Stream Highway (All 4 Tiers) */}
          <div className="relative mt-10 pt-6 border-t border-theme-border">
            <div className="flex items-center justify-between text-xs font-mono text-theme-muted mb-4">
              <div className="flex items-center gap-2 text-theme-accent">
                <span className="w-2.5 h-2.5 rounded-full bg-theme-accent" />
                <span className="font-semibold tracking-wider">
                  LIVE PACKET STREAM ACTIVE // {activePipeline.busLabel}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Network size={12} className="text-theme-accent" />
                  <span>TRANSMISSION: 60 FPS</span>
                </span>
                <span>•</span>
                <span className="text-emerald-500 font-bold">LOSS RATE: 0.00%</span>
              </div>
            </div>

            {/* Glowing Packet Highway Conduit Track */}
            <div className="relative w-full h-3 rounded-full bg-theme-surface-elevated border border-theme-border overflow-hidden">
              {/* Dashed background stream */}
              <svg className="w-full h-full absolute inset-0">
                <line
                  x1="0"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="dash-flow-line text-theme-accent/30"
                />
              </svg>

              {/* Multiple Pulsing Packets Streaming Continuously */}
              <span
                className="packet-stream-dot"
                style={{ animationDuration: "2.8s", animationDelay: "0s" }}
              />
              <span
                className="packet-stream-dot"
                style={{ animationDuration: "2.8s", animationDelay: "0.9s" }}
              />
              <span
                className="packet-stream-dot"
                style={{ animationDuration: "2.8s", animationDelay: "1.8s" }}
              />
            </div>

            {/* Flow Stations Indicator */}
            <div className="grid grid-cols-4 mt-2 text-[10px] font-mono text-theme-muted">
              <span>01 // Client</span>
              <span className="text-center">02 // Gateway</span>
              <span className="text-center">03 // AI Core</span>
              <span className="text-right">04 // Store</span>
            </div>
          </div>
        </div>

        {/* Live Packet Telemetry & Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Node Spec Box */}
          <div className="lg:col-span-1 p-6 rounded-2xl border border-theme-border bg-theme-surface/80 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-theme-accent uppercase tracking-wider mb-2">
                <Workflow size={14} />
                <span>INSPECTED TIER: {activeNode.tier}</span>
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-2">
                {activeNode.name}
              </h3>
              <p className="text-sm text-theme-secondary font-light mb-6">
                {activeNode.description}
              </p>

              <div className="space-y-3">
                <span className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
                  Technologies in this node:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg border border-theme-border bg-theme-surface-elevated text-xs font-mono text-theme-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between text-xs font-mono">
              <span className="text-theme-muted">Status</span>
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} /> Operational
              </span>
            </div>
          </div>

          {/* Real-time Telemetry JSON Stream Display */}
          <div className="lg:col-span-2 p-6 rounded-2xl border border-theme-border bg-theme-surface-elevated/90 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-theme-accent">
                  <Terminal size={14} />
                  <span>PACKET TELEMETRY // {activeNode.protocol}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  200 OK • {activeNode.latency}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-theme-border bg-black/60 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(JSON.parse(activeNode.payload), null, 2)}
                </pre>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-theme-muted">
              <span>Telemetry sync: NetTantra Technologies Bhubaneswar Cluster</span>
              <span className="text-theme-accent font-medium">
                P95 Groundedness: 98.4%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
