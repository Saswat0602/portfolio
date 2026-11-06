"use client";

import React from "react";
import {
  Cpu,
  Layers,
  Sparkles,
  Database,
  Code2,
  Workflow,
  Radio,
  FileVideo,
  Box,
  Compass,
  Zap,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ElementType;
}

const TRACK_1: TechItem[] = [
  { name: "Next.js 15", category: "Framework", icon: Layers },
  { name: "React 19", category: "Frontend", icon: Code2 },
  { name: "AWS Bedrock", category: "Applied AI", icon: Cpu },
  { name: "Claude 3.5 Sonnet", category: "LLM", icon: Sparkles },
  { name: "pgvector", category: "Vector DB", icon: Database },
  { name: "LangGraph", category: "Agentic AI", icon: Workflow },
  { name: "Python FastAPI", category: "Backend", icon: Zap },
  { name: "WebRTC", category: "Streaming", icon: Radio },
  { name: "FFmpeg Pipeline", category: "Media Processing", icon: FileVideo },
  { name: "TypeScript", category: "Language", icon: Code2 },
  { name: "HeyGen AI API", category: "Generative Video", icon: Sparkles },
  { name: "Redis Caching", category: "State & Cache", icon: Database },
];

const TRACK_2: TechItem[] = [
  { name: "React Native", category: "Cross-Platform", icon: Layers },
  { name: "PostgreSQL & PostGIS", category: "Spatial DB", icon: Database },
  { name: "Shadow DOM SDK", category: "SDK Architecture", icon: Box },
  { name: "Docker & Containers", category: "DevOps", icon: Box },
  { name: "Node.js & Express", category: "Microservices", icon: Zap },
  { name: "Socket.io", category: "WebSockets", icon: Radio },
  { name: "Tailwind CSS", category: "Design System", icon: Layers },
  { name: "MongoDB", category: "NoSQL", icon: Database },
  { name: "Redux Toolkit", category: "State Store", icon: Workflow },
  { name: "Web Audio DSP", category: "Audio Engine", icon: Radio },
  { name: "HNSW Vector Indexing", category: "Retrieval", icon: Compass },
  { name: "WAI-ARIA Accessibility", category: "Standards", icon: Sparkles },
];

function TechCard({ item }: { item: TechItem }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-theme-border bg-theme-surface/80 hover:border-theme-accent hover:bg-theme-surface transition-all select-none group">
      <Icon size={14} className="text-theme-accent group-hover:scale-110 transition-transform" />
      <span className="text-xs font-medium text-theme-primary whitespace-nowrap">
        {item.name}
      </span>
      <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider px-1.5 py-0.5 rounded bg-theme-base/60">
        {item.category}
      </span>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="w-full py-12 overflow-hidden border-y border-theme-border bg-theme-surface/40 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-theme-accent uppercase">
          <Workflow size={13} />
          <span>PRODUCTION TECH STACK &amp; CAPABILITIES</span>
        </div>
        <span className="text-[11px] font-mono text-theme-muted hidden sm:inline">
          [HOVER TO PAUSE STREAM]
        </span>
      </div>

      <div className="marquee-container marquee-mask space-y-4">
        {/* Track 1: Leftward Infinite Stream */}
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-4 pr-4 animate-marquee-left">
            {TRACK_1.map((item, idx) => (
              <TechCard key={`t1-a-${idx}`} item={item} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-4 pr-4 animate-marquee-left" aria-hidden="true">
            {TRACK_1.map((item, idx) => (
              <TechCard key={`t1-b-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Track 2: Rightward Infinite Stream */}
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-4 pr-4 animate-marquee-right">
            {TRACK_2.map((item, idx) => (
              <TechCard key={`t2-a-${idx}`} item={item} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-4 pr-4 animate-marquee-right" aria-hidden="true">
            {TRACK_2.map((item, idx) => (
              <TechCard key={`t2-b-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
