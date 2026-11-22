"use client";

import { useState } from "react";
import {
  GitCommit,
  GitBranch,
  GitPullRequest,
  Copy,
  Check,
  FileCode,
  Terminal,
  Columns,
  List,
} from "lucide-react";

interface DiffLine {
  type: "context" | "addition" | "deletion";
  oldLineNumber?: number;
  newLineNumber?: number;
  text: string;
}

interface GitCommitItem {
  hash: string;
  shortHash: string;
  branch: string;
  branchColor: string;
  message: string;
  author: string;
  time: string;
  fileName: string;
  stats: { additions: number; deletions: number };
  diffLines: DiffLine[];
}

const COMMITS_DATA: GitCommitItem[] = [
  {
    hash: "a94ef20b78c91d8e1234567890abcdef12345678",
    shortHash: "a94ef20",
    branch: "feat/bedrock-rag",
    branchColor: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
    message: "feat(ai): integrate AWS Bedrock Titan v2 with pgvector cosine similarity",
    author: "Saswat Ranjan <saswat@dev>",
    time: "2 hours ago",
    fileName: "src/services/ai/retrievalEngine.ts",
    stats: { additions: 14, deletions: 4 },
    diffLines: [
      { type: "context", oldLineNumber: 42, newLineNumber: 42, text: "export async function queryCurriculumCorpus(" },
      { type: "context", oldLineNumber: 43, newLineNumber: 43, text: "  prompt: string," },
      { type: "context", oldLineNumber: 44, newLineNumber: 44, text: "  topK: number = 5" },
      { type: "context", oldLineNumber: 45, newLineNumber: 45, text: "): Promise<KnowledgeChunk[]> {" },
      { type: "deletion", oldLineNumber: 46, text: "-   // Legacy keyword search fallback with unindexed LIKE filter" },
      { type: "deletion", oldLineNumber: 47, text: "-   const legacy = await db.query('SELECT * FROM chunks WHERE content ILIKE $1', [prompt]);" },
      { type: "deletion", oldLineNumber: 48, text: "-   return legacy.rows.slice(0, topK);" },
      { type: "addition", newLineNumber: 46, text: "+   // 1. Invoke AWS Bedrock Titan Text v2 embedding model" },
      { type: "addition", newLineNumber: 47, text: "+   const { embedding } = await bedrockClient.generateEmbedding({" },
      { type: "addition", newLineNumber: 48, text: "+     modelId: 'amazon.titan-embed-text-v2:0'," },
      { type: "addition", newLineNumber: 49, text: "+     inputText: prompt," },
      { type: "addition", newLineNumber: 50, text: "+     dimensions: 1024," },
      { type: "addition", newLineNumber: 51, text: "+   });" },
      { type: "addition", newLineNumber: 52, text: "+" },
      { type: "addition", newLineNumber: 53, text: "+   // 2. Perform HNSW cosine similarity index lookup in pgvector" },
      { type: "addition", newLineNumber: 54, text: "+   const query = `SELECT id, content, 1 - (embedding <=> $1) AS score" },
      { type: "addition", newLineNumber: 55, text: "+                  FROM curriculum_vectors" },
      { type: "addition", newLineNumber: 56, text: "+                  ORDER BY embedding <=> $1 LIMIT $2`;" },
      { type: "addition", newLineNumber: 57, text: "+   const { rows } = await pool.query(query, [JSON.stringify(embedding), topK]);" },
      { type: "context", oldLineNumber: 49, newLineNumber: 58, text: "   return rows.map(formatVectorScore);" },
      { type: "context", oldLineNumber: 50, newLineNumber: 59, text: "}" },
    ],
  },
  {
    hash: "c381e4b901d8e1234567890abcdef1234567890a",
    shortHash: "c381e4b",
    branch: "feat/ffmpeg-worker",
    branchColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    message: "perf(media): add Redis BullMQ queue concurrency & zero-copy video stitching",
    author: "Saswat Ranjan <saswat@dev>",
    time: "1 day ago",
    fileName: "src/workers/mediaSynthesizer.ts",
    stats: { additions: 9, deletions: 3 },
    diffLines: [
      { type: "context", oldLineNumber: 88, newLineNumber: 88, text: "export const mediaQueueWorker = new Worker(" },
      { type: "context", oldLineNumber: 89, newLineNumber: 89, text: "  'media-synthesis-queue'," },
      { type: "context", oldLineNumber: 90, newLineNumber: 90, text: "  async (job: Job<BatchSynthesizePayload>) => {" },
      { type: "deletion", oldLineNumber: 91, text: "-     // Sequential blocking spawn without stream pipes" },
      { type: "deletion", oldLineNumber: 92, text: "-     await execPromise(`ffmpeg -i ${job.data.input} output.mp4`);" },
      { type: "deletion", oldLineNumber: 93, text: "-     return { success: true };" },
      { type: "addition", newLineNumber: 91, text: "+     const { rawClips, audioManifest, outputDest } = job.data;" },
      { type: "addition", newLineNumber: 92, text: "+     // Non-blocking FFmpeg worker node with hardware acceleration" },
      { type: "addition", newLineNumber: 93, text: "+     return new Promise((resolve, reject) => {" },
      { type: "addition", newLineNumber: 94, text: "+       ffmpeg()" },
      { type: "addition", newLineNumber: 95, text: "+         .input(rawClips.videoTrack)" },
      { type: "addition", newLineNumber: 96, text: "+         .input(audioManifest.voiceTrack)" },
      { type: "addition", newLineNumber: 97, text: "+         .outputOptions(['-c:v libx264', '-preset ultrafast', '-c:a aac'])" },
      { type: "addition", newLineNumber: 98, text: "+         .on('end', () => resolve({ path: outputDest, latencyMs: Date.now() - job.timestamp }))" },
      { type: "addition", newLineNumber: 99, text: "+         .save(outputDest);" },
      { type: "context", oldLineNumber: 94, newLineNumber: 100, text: "   }," },
      { type: "context", oldLineNumber: 95, newLineNumber: 101, text: "  { concurrency: 8, connection: redisClient }" },
      { type: "context", oldLineNumber: 96, newLineNumber: 102, text: ");" },
    ],
  },
  {
    hash: "f72a819c901d8e1234567890abcdef1234567890b",
    shortHash: "f72a819",
    branch: "main",
    branchColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    message: "fix(webrtc): handle ICE candidate trickle failure & dynamic STUN fallback",
    author: "Saswat Ranjan <saswat@dev>",
    time: "3 days ago",
    fileName: "src/lib/webrtc/peerManager.ts",
    stats: { additions: 8, deletions: 2 },
    diffLines: [
      { type: "context", oldLineNumber: 110, newLineNumber: 110, text: "private setupIceCandidateHandlers(pc: RTCPeerConnection) {" },
      { type: "context", oldLineNumber: 111, newLineNumber: 111, text: "  pc.onicecandidateerror = async (event) => {" },
      { type: "deletion", oldLineNumber: 112, text: "-     console.error('ICE Candidate failed', event);" },
      { type: "deletion", oldLineNumber: 113, text: "-     this.disconnect();" },
      { type: "addition", newLineNumber: 112, text: "+     if (this.retryAttempts < MAX_ICE_RETRIES) {" },
      { type: "addition", newLineNumber: 113, text: "+       this.retryAttempts++;" },
      { type: "addition", newLineNumber: 114, text: "+       const fallbackServer = await fetchTurnCredentials();" },
      { type: "addition", newLineNumber: 115, text: "+       pc.setConfiguration({ iceServers: fallbackServer });" },
      { type: "addition", newLineNumber: 116, text: "+       await pc.restartIce();" },
      { type: "addition", newLineNumber: 117, text: "+       return;" },
      { type: "addition", newLineNumber: 118, text: "+     }" },
      { type: "context", oldLineNumber: 114, newLineNumber: 119, text: "    this.emit('connection_failed', event);" },
      { type: "context", oldLineNumber: 115, newLineNumber: 120, text: "  };" },
      { type: "context", oldLineNumber: 116, newLineNumber: 121, text: "}" },
    ],
  },
];

export function GitDiffVisualizer() {
  const [selectedCommitHash, setSelectedCommitHash] = useState<string>(COMMITS_DATA[0].hash);
  const [diffMode, setDiffMode] = useState<"unified" | "split">("unified");
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const currentCommit =
    COMMITS_DATA.find((c) => c.hash === selectedCommitHash) || COMMITS_DATA[0];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(currentCommit.hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="w-full flex flex-col rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl overflow-hidden shadow-lg">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-theme-border bg-theme-surface-elevated/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-theme-border bg-theme-surface flex items-center justify-center text-theme-accent">
            <GitPullRequest size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-theme-primary">
                Git Branch DAG &amp; Real Code Diff Inspector
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-theme-border bg-theme-surface text-theme-muted">
                3 Production Branches
              </span>
            </div>
            <span className="text-[11px] font-mono text-theme-secondary">
              Click commits to inspect production architectural diffs
            </span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-theme-border bg-theme-surface p-1 text-xs font-mono">
            <button
              type="button"
              onClick={() => setDiffMode("unified")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                diffMode === "unified"
                  ? "bg-theme-accent text-white dark:text-zinc-950 font-semibold"
                  : "text-theme-secondary hover:text-theme-primary"
              }`}
            >
              <List size={13} />
              <span>Unified Diff</span>
            </button>
            <button
              type="button"
              onClick={() => setDiffMode("split")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                diffMode === "split"
                  ? "bg-theme-accent text-white dark:text-zinc-950 font-semibold"
                  : "text-theme-secondary hover:text-theme-primary"
              }`}
            >
              <Columns size={13} />
              <span>Split Diff</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: DAG Commit Graph (Left 4 cols) vs Diff Inspector (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left Column: DAG Commit Tree */}
        <div className="lg:col-span-5 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-theme-border flex flex-col gap-3 bg-theme-surface/50">
          <div className="flex items-center justify-between text-xs font-mono text-theme-muted px-1">
            <span className="flex items-center gap-1.5 font-semibold">
              <GitBranch size={13} />
              <span>COMMIT GRAPH (DAG)</span>
            </span>
            <span>HEAD: origin/main</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {COMMITS_DATA.map((commit) => {
              const isSelected = commit.hash === currentCommit.hash;
              return (
                <button
                  key={commit.hash}
                  type="button"
                  onClick={() => setSelectedCommitHash(commit.hash)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? "border-theme-accent bg-theme-accent-subtle/40 shadow-sm"
                      : "border-theme-border/70 bg-theme-surface-elevated/40 hover:bg-theme-hover hover:border-theme-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <GitCommit
                        size={14}
                        className={isSelected ? "text-theme-accent" : "text-theme-muted"}
                      />
                      <span className="font-mono text-xs font-bold text-theme-primary">
                        {commit.shortHash}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-medium ${commit.branchColor}`}
                      >
                        {commit.branch}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-theme-muted">
                      {commit.time}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-theme-primary line-clamp-2 leading-relaxed">
                    {commit.message}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-theme-secondary pt-1 border-t border-theme-border/50">
                    <span className="text-theme-muted">{commit.author}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-semibold">
                        +{commit.stats.additions}
                      </span>
                      <span className="text-rose-500 font-semibold">
                        -{commit.stats.deletions}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Diff View */}
        <div className="lg:col-span-7 flex flex-col bg-zinc-950 text-zinc-100 font-mono text-xs overflow-hidden">
          {/* Diff File Header */}
          <div className="flex items-center justify-between p-3.5 border-b border-zinc-800 bg-zinc-900/80">
            <div className="flex items-center gap-2 min-w-0">
              <FileCode size={14} className="text-cyan-400 flex-shrink-0" />
              <span className="font-semibold text-zinc-200 truncate">
                {currentCommit.fileName}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                diff --git
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyHash}
                className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors cursor-pointer"
                title="Copy commit SHA"
              >
                {copiedHash ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copiedHash ? "Copied" : currentCommit.shortHash}</span>
              </button>
            </div>
          </div>

          {/* Diff Lines Container */}
          <div className="p-3 overflow-x-auto max-h-[360px] overflow-y-auto leading-relaxed select-text font-mono">
            {diffMode === "unified" ? (
              <table className="w-full border-collapse">
                <tbody>
                  {currentCommit.diffLines.map((line, idx) => {
                    const isAdd = line.type === "addition";
                    const isDel = line.type === "deletion";

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors font-mono text-[11px] sm:text-xs ${
                          isAdd
                            ? "bg-emerald-950/40 text-emerald-300 hover:bg-emerald-950/60"
                            : isDel
                            ? "bg-rose-950/40 text-rose-300 hover:bg-rose-950/60"
                            : "text-zinc-400 hover:bg-zinc-900/50"
                        }`}
                      >
                        {/* Old Line # */}
                        <td className="w-8 text-right pr-2 text-zinc-600 select-none border-r border-zinc-800/80">
                          {line.oldLineNumber || ""}
                        </td>
                        {/* New Line # */}
                        <td className="w-8 text-right pr-3 pl-2 text-zinc-600 select-none border-r border-zinc-800/80">
                          {line.newLineNumber || ""}
                        </td>
                        {/* Indicator */}
                        <td className="w-4 text-center select-none font-bold">
                          {isAdd ? "+" : isDel ? "-" : " "}
                        </td>
                        {/* Code Text */}
                        <td className="pl-2 whitespace-pre font-mono">
                          {line.text}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              // Split Diff View
              <div className="grid grid-cols-2 gap-2">
                <div className="border-r border-zinc-800 pr-2">
                  <div className="text-[10px] text-zinc-500 mb-1 border-b border-zinc-800 pb-1">
                    BEFORE (HEAD~1)
                  </div>
                  {currentCommit.diffLines
                    .filter((l) => l.type !== "addition")
                    .map((l, i) => (
                      <div
                        key={i}
                        className={`text-[11px] whitespace-pre truncate ${
                          l.type === "deletion"
                            ? "bg-rose-950/40 text-rose-300 px-1"
                            : "text-zinc-400"
                        }`}
                      >
                        {l.text}
                      </div>
                    ))}
                </div>

                <div className="pl-2">
                  <div className="text-[10px] text-zinc-500 mb-1 border-b border-zinc-800 pb-1">
                    AFTER (COMMITTED)
                  </div>
                  {currentCommit.diffLines
                    .filter((l) => l.type !== "deletion")
                    .map((l, i) => (
                      <div
                        key={i}
                        className={`text-[11px] whitespace-pre truncate ${
                          l.type === "addition"
                            ? "bg-emerald-950/40 text-emerald-300 px-1"
                            : "text-zinc-400"
                        }`}
                      >
                        {l.text}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Diff Footer status bar */}
          <div className="p-2.5 border-t border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Terminal size={12} className="text-zinc-400" />
              <span>git diff {currentCommit.shortHash}^! --stat</span>
            </span>
            <span className="text-zinc-400">
              +{currentCommit.stats.additions} / -{currentCommit.stats.deletions} lines modified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
