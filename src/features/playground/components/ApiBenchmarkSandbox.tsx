"use client";

import { useState } from "react";
import {
  Play,
  CheckCircle,
  Copy,
  Check,
  Activity,
  Code,
} from "lucide-react";

interface ApiEndpoint {
  id: string;
  method: "POST" | "GET";
  path: string;
  title: string;
  description: string;
  defaultPayload: string;
  baseLatencyMs: number;
  mockResponse: Record<string, unknown>;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    id: "bedrock-rag",
    method: "POST",
    path: "/v1/ai/bedrock/rag-stream",
    title: "AWS Bedrock Claude + pgvector Semantic Query",
    description: "Invokes Titan Text v2 embedding model, queries 1024-dim HNSW index, and streams reasoning tokens.",
    defaultPayload: JSON.stringify(
      {
        query: "Explain distributed WebRTC signaling with Redis pub/sub",
        topK: 5,
        model: "anthropic.claude-3-7-sonnet",
        temperature: 0.2,
      },
      null,
      2
    ),
    baseLatencyMs: 142,
    mockResponse: {
      status: "success",
      query_id: "qry_91a0b3f8",
      retrieved_chunks: 5,
      similarity_score_avg: 0.892,
      latency: { embedding_ms: 38, vector_search_ms: 12, llm_ttft_ms: 92 },
      model: "anthropic.claude-3-7-sonnet:0",
      usage: { prompt_tokens: 312, completion_tokens: 48 },
    },
  },
  {
    id: "ffmpeg-queue",
    method: "POST",
    path: "/v1/media/ffmpeg/transcode",
    title: "Distributed BullMQ Media Synthesis Dispatcher",
    description: "Enqueues asynchronous video stitching and HeyGen avatar rendering across worker nodes.",
    defaultPayload: JSON.stringify(
      {
        batchId: "batch_2025_03",
        clips: ["intro.mp4", "lecture_ch1.mp4", "outro.mp4"],
        outputFormat: "hls_1080p",
        concurrency: 4,
      },
      null,
      2
    ),
    baseLatencyMs: 88,
    mockResponse: {
      status: "queued",
      job_id: "bull_media_771b",
      queue_depth: 3,
      worker_node: "worker-ap-south-1a",
      estimated_duration_sec: 18.4,
      hardware_acceleration: "nvenc_enabled",
    },
  },
  {
    id: "webrtc-session",
    method: "GET",
    path: "/v1/webrtc/ice-session",
    title: "Ephemeral WebRTC STUN/TURN Credential Issuer",
    description: "Generates time-bound HMAC tokens for real-time video/audio peer negotiation.",
    defaultPayload: JSON.stringify({ userId: "usr_saswat", role: "host" }, null, 2),
    baseLatencyMs: 24,
    mockResponse: {
      status: "authenticated",
      ttl_seconds: 3600,
      ice_servers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "turn:global.turn.dev:3478", username: "hmac_tk_091", credential: "sha256_hash_here" },
      ],
      region: "ap-south-1 (Mumbai)",
    },
  },
];

export function ApiBenchmarkSandbox() {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("bedrock-rag");
  const [concurrency, setConcurrency] = useState<number>(10);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [copiedResponse, setCopiedResponse] = useState<boolean>(false);

  const currentEndpoint =
    ENDPOINTS.find((e) => e.id === selectedEndpointId) || ENDPOINTS[0];

  // Dynamic simulated metrics based on concurrency
  const simulatedP50 = Math.round(currentEndpoint.baseLatencyMs + concurrency * 1.8);
  const simulatedP90 = Math.round(simulatedP50 * 1.35);
  const simulatedP99 = Math.round(simulatedP50 * 1.82);
  const simulatedRps = Math.round((1000 / simulatedP50) * concurrency * 0.9);

  const handleRunBenchmark = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 700);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentEndpoint.mockResponse, null, 2));
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className="w-full flex flex-col rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl overflow-hidden shadow-lg">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-theme-border bg-theme-surface-elevated/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-theme-border bg-theme-surface flex items-center justify-center text-theme-accent">
            <Activity size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-theme-primary">
                API Benchmark &amp; Latency Stress Sandbox
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-theme-border bg-theme-surface text-emerald-400 font-semibold">
                Live Production Metrics
              </span>
            </div>
            <span className="text-[11px] font-mono text-theme-secondary">
              Simulate enterprise load across Bedrock, pgvector, and WebRTC endpoints
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleRunBenchmark}
          disabled={isRunning}
          className="px-4 py-2 rounded-xl bg-theme-accent text-white dark:text-zinc-950 font-mono text-xs font-bold hover:opacity-90 active:scale-98 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Simulating {concurrency} Workers...</span>
            </>
          ) : (
            <>
              <Play size={13} fill="currentColor" />
              <span>Run Load Test</span>
            </>
          )}
        </button>
      </div>

      {/* Endpoint Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-theme-border text-xs font-mono">
        {ENDPOINTS.map((endpoint) => {
          const isSelected = endpoint.id === selectedEndpointId;
          return (
            <button
              key={endpoint.id}
              type="button"
              onClick={() => {
                setSelectedEndpointId(endpoint.id);
                setHasRun(false);
              }}
              className={`p-3 sm:p-3.5 text-left border-b sm:border-b-0 sm:border-r last:border-r-0 transition-colors cursor-pointer flex flex-col gap-1 ${
                isSelected
                  ? "bg-theme-accent-subtle/50 text-theme-primary font-semibold border-b-2 sm:border-b-0 border-theme-accent"
                  : "bg-theme-surface text-theme-secondary hover:bg-theme-hover hover:text-theme-primary"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    endpoint.method === "POST"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {endpoint.method}
                </span>
                <span className="truncate font-semibold">{endpoint.path}</span>
              </div>
              <span className="text-[11px] text-theme-muted truncate">{endpoint.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
        {/* Left: Stress Controls & Metrics (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-theme-border flex flex-col justify-between gap-5 bg-theme-surface/50">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted font-semibold block px-1">
              Load &amp; Concurrency Parameters
            </span>

            <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-theme-secondary">Concurrent Workers:</span>
                <span className="font-bold text-theme-primary font-mono">{concurrency} Users</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                className="w-full h-1.5 bg-theme-border rounded-lg appearance-none cursor-pointer accent-theme-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-theme-muted">
                <span>1 node (idle)</span>
                <span>25 nodes</span>
                <span>50 nodes (stress)</span>
              </div>
            </div>

            {/* Live Telemetry KPI Cards */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40">
                <span className="text-[10px] text-theme-muted uppercase block mb-1">p50</span>
                <span className="text-sm sm:text-base font-bold text-theme-primary">
                  {simulatedP50}ms
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40">
                <span className="text-[10px] text-theme-muted uppercase block mb-1">p90</span>
                <span className="text-sm sm:text-base font-bold text-amber-400">
                  {simulatedP90}ms
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40">
                <span className="text-[10px] text-theme-muted uppercase block mb-1">p99</span>
                <span className="text-sm sm:text-base font-bold text-rose-400">
                  {simulatedP99}ms
                </span>
              </div>
            </div>

            {/* Throughput Bar */}
            <div className="p-3 rounded-xl border border-theme-border bg-theme-surface-elevated/30 flex items-center justify-between text-xs font-mono">
              <span className="text-theme-secondary">Throughput Capacity:</span>
              <span className="font-bold text-theme-accent">{simulatedRps} req/s</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-theme-muted flex items-center gap-2 pt-2 border-t border-theme-border">
            <CheckCircle size={13} className="text-emerald-400" />
            <span>SLA Target: Sub-200ms P95 query latency across all regions</span>
          </div>
        </div>

        {/* Right: Request & Response JSON Viewer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-zinc-950 text-zinc-100 font-mono text-xs">
          {/* JSON Tab Header */}
          <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900/80">
            <div className="flex items-center gap-2">
              <Code size={13} className="text-cyan-400" />
              <span className="font-semibold text-zinc-300">
                {hasRun ? "RESPONSE BODY (200 OK)" : "REQUEST PAYLOAD SPECIFICATION"}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                application/json
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyJson}
              className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors cursor-pointer"
            >
              {copiedResponse ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
              <span>{copiedResponse ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>

          {/* JSON Body */}
          <div className="p-4 overflow-y-auto max-h-[300px] leading-relaxed text-[11px] sm:text-xs">
            <pre className="text-emerald-400 font-mono whitespace-pre select-text">
              {hasRun
                ? JSON.stringify(currentEndpoint.mockResponse, null, 2)
                : currentEndpoint.defaultPayload}
            </pre>
          </div>

          {/* Terminal Status Footer */}
          <div className="mt-auto p-2.5 border-t border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500">
            <span className="text-zinc-400">
              curl -X {currentEndpoint.method} https://api.saswat.dev{currentEndpoint.path}
            </span>
            <span className="text-emerald-400 font-semibold">HTTP/2 200 OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
