"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, Sparkles } from "lucide-react";
import { userData } from "@/lib/data";

interface TerminalHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const INITIAL_HISTORY: TerminalHistoryItem[] = [
  {
    id: "init",
    command: "saswat --version",
    timestamp: "ready",
    output: (
      <div className="flex flex-col gap-1.5 text-xs font-mono text-zinc-300">
        <span className="text-sky-400 font-bold">
          Saswat Ranjan Mohanty — CLI Environment v3.4.1 (x86_64-apple-darwin)
        </span>
        <span className="text-zinc-400">
          Software Engineer (SDE 1) at NetTantra Technologies • Full-Stack &amp; Applied AI.
        </span>
        <span className="text-emerald-400 text-[11px]">
          Type <code className="text-amber-300 font-bold">help</code> or click any quick command below to begin.
        </span>
      </div>
    ),
  },
];

export function DevTerminalRunner() {
  const [inputVal, setInputVal] = useState<string>("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>(INITIAL_HISTORY);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setEnteredCommands((prev) => [...prev, trimmed]);
    setCommandIndex(-1);

    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    let outputNode: React.ReactNode;

    const lower = trimmed.toLowerCase();

    if (lower === "clear" || lower === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    } else if (lower === "help") {
      outputNode = (
        <div className="flex flex-col gap-1 text-xs font-mono text-zinc-300">
          <span className="text-sky-400 font-bold mb-1">Available System Commands:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            <div><span className="text-amber-300">projects</span> — List flagship engineering systems</div>
            <div><span className="text-amber-300">skills</span> — Full-stack &amp; Applied AI capabilities</div>
            <div><span className="text-amber-300">ai.pipeline</span> — AWS Bedrock &amp; FFmpeg architecture</div>
            <div><span className="text-amber-300">metrics</span> — Production turnaround &amp; reliability stats</div>
            <div><span className="text-amber-300">contact</span> — Reach out via email, WhatsApp &amp; LinkedIn</div>
            <div><span className="text-amber-300">sudo hire</span> — Fast-track engineer recruitment</div>
            <div><span className="text-amber-300">clear</span> — Reset terminal output</div>
          </div>
        </div>
      );
    } else if (lower === "projects") {
      outputNode = (
        <div className="flex flex-col gap-2 text-xs font-mono text-zinc-300">
          <span className="text-sky-400 font-bold">Shipped Flagship Engineering Systems:</span>
          <div className="flex flex-col gap-1.5 pl-2 border-l border-zinc-700">
            {userData.Projects.slice(0, 5).map((p) => (
              <div key={p.slug} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="text-emerald-400 font-bold">{p.project_name.split("—")[0].trim()}</span>
                  <span className="text-zinc-500 text-[11px] ml-2">({p.category})</span>
                </div>
                <span className="text-zinc-400 text-[11px] truncate max-w-xs">{p.metrics}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (lower === "skills") {
      outputNode = (
        <div className="flex flex-col gap-2 text-xs font-mono text-zinc-300">
          <span className="text-sky-400 font-bold">Technical Stack &amp; Specializations:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-emerald-400 font-bold block mb-0.5">Applied AI &amp; RAG</span>
              <span className="text-zinc-400">Claude Code, AWS Bedrock, pgvector, LangGraph, DOM Agent SDKs</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-sky-400 font-bold block mb-0.5">Full Stack Web</span>
              <span className="text-zinc-400">Next.js 15, React 19, TypeScript, Python FastAPI, Node.js, NestJS</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-purple-400 font-bold block mb-0.5">Mobile &amp; Real-Time</span>
              <span className="text-zinc-400">React Native, WebRTC mesh, Socket.io, Redis, WebSockets</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-amber-400 font-bold block mb-0.5">Cloud &amp; Media</span>
              <span className="text-zinc-400">FFmpeg, Docker, PostgreSQL, HeyGen API, BullMQ, AWS S3</span>
            </div>
          </div>
        </div>
      );
    } else if (lower === "ai.pipeline") {
      outputNode = (
        <div className="flex flex-col gap-1.5 text-xs font-mono text-zinc-300">
          <span className="text-purple-400 font-bold">Hybrid AI Media &amp; Agent Pipeline Architecture:</span>
          <pre className="text-[11px] text-zinc-400 bg-zinc-900 p-2.5 rounded border border-zinc-800 overflow-x-auto leading-relaxed">
{`Prompt Intent ─► [Claude 3.5 Sonnet] ─► [pgvector RAG]
                        │
                        ▼
             [HeyGen & FFmpeg Nodes] ──► -60% Batch Latency
                        │
                        ▼
             [WebRTC Streaming Room] ──► Sub-100ms Delivery`}
          </pre>
        </div>
      );
    } else if (lower === "metrics") {
      outputNode = (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
            <span className="text-sky-400 text-lg font-bold block">3+ YOE</span>
            <span className="text-zinc-500 text-[10px]">NetTantra SDE 1</span>
          </div>
          <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
            <span className="text-emerald-400 text-lg font-bold block">98%</span>
            <span className="text-zinc-500 text-[10px]">Action Success</span>
          </div>
          <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
            <span className="text-purple-400 text-lg font-bold block">-60%</span>
            <span className="text-zinc-500 text-[10px]">Turnaround Cut</span>
          </div>
          <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
            <span className="text-amber-400 text-lg font-bold block">33</span>
            <span className="text-zinc-500 text-[10px]">Unit Test Suites</span>
          </div>
        </div>
      );
    } else if (lower === "contact") {
      outputNode = (
        <div className="flex flex-col gap-1 text-xs font-mono text-zinc-300">
          <span className="text-emerald-400 font-bold">Connect with Saswat Ranjan:</span>
          <div>Email: <a href="mailto:saswatranjan0602@gmail.com" className="text-sky-400 underline">saswatranjan0602@gmail.com</a></div>
          <div>Phone / WhatsApp: <a href="tel:+919178842947" className="text-sky-400">+91 91788 42947</a></div>
          <div>GitHub: <a href="https://github.com/Saswat0602" target="_blank" className="text-sky-400 underline">github.com/Saswat0602</a></div>
          <div>LinkedIn: <a href="https://linkedin.com/in/saswat0602" target="_blank" className="text-sky-400 underline">linkedin.com/in/saswat0602</a></div>
        </div>
      );
    } else if (lower.includes("sudo hire") || lower === "hire") {
      outputNode = (
        <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
          <span className="font-bold block mb-1">🎉 Access Granted! Priority Inbound Mode Activated.</span>
          <span>
            Saswat is open to Full-Time SDE / Full-Stack &amp; Applied AI roles and high-impact freelance projects worldwide (Remote / Hybrid).
            Click here to write directly:{" "}
            <a href="mailto:saswatranjan0602@gmail.com?subject=Engineering%20Opportunity" className="underline font-bold text-white">
              saswatranjan0602@gmail.com
            </a>
          </span>
        </div>
      );
    } else {
      outputNode = (
        <span className="text-rose-400 text-xs font-mono">
          zsh: command not found: {trimmed}. Type <code className="text-amber-300 font-bold">help</code> to list commands.
        </span>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output: outputNode,
        timestamp: now,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (enteredCommands.length === 0) return;
      const nextIdx = commandIndex === -1 ? enteredCommands.length - 1 : Math.max(0, commandIndex - 1);
      setCommandIndex(nextIdx);
      setInputVal(enteredCommands[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandIndex === -1) return;
      const nextIdx = commandIndex + 1;
      if (nextIdx >= enteredCommands.length) {
        setCommandIndex(-1);
        setInputVal("");
      } else {
        setCommandIndex(nextIdx);
        setInputVal(enteredCommands[nextIdx]);
      }
    }
  };

  const quickCommands = ["projects", "skills", "ai.pipeline", "metrics", "contact", "sudo hire", "clear"];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Terminal Window Box */}
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col">
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-zinc-400">
              <TerminalIcon size={13} className="text-sky-400" />
              <span className="font-semibold text-zinc-300">saswat@macbook: ~ (zsh)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHistory([])}
            className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Clear Terminal"
          >
            <Trash2 size={12} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        {/* Terminal Content Screen */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 min-h-[300px] max-h-[460px] overflow-y-auto flex flex-col gap-4 font-mono text-xs cursor-text"
        >
          {history.map((item) => (
            <div key={item.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">saswat.dev</span>
                <span className="text-zinc-600">❯</span>
                <span className="text-zinc-100 font-semibold">{item.command}</span>
                <span className="text-zinc-600 text-[10px] ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-zinc-100 pt-1">
            <span className="text-emerald-400 font-bold flex-shrink-0">saswat.dev</span>
            <span className="text-zinc-600 flex-shrink-0">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. 'help', 'projects', 'metrics')..."
              className="flex-1 bg-transparent text-xs font-mono text-zinc-100 focus:outline-none placeholder:text-zinc-600 caret-sky-400"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-sky-400 transition-colors"
            >
              <CornerDownLeft size={13} />
            </button>
          </div>

          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Quick Command Pills */}
      <div className="flex flex-wrap items-center gap-2 px-1 text-xs font-mono">
        <span className="text-theme-muted text-[11px] flex items-center gap-1 mr-1">
          <Sparkles size={12} className="text-theme-accent" />
          <span>Quick Commands:</span>
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="px-2.5 py-1 rounded-md border border-theme-border bg-theme-surface/80 hover:bg-theme-hover hover:border-theme-accent text-theme-secondary hover:text-theme-primary text-[11px] font-mono transition-all cursor-pointer"
          >
            ❯ {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
