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
  { name: "Next.js", category: "Framework", icon: Layers },
  { name: "React.js", category: "Frontend", icon: Code2 },
  { name: "NestJS", category: "Backend", icon: Zap },
  { name: "TypeScript", category: "Language", icon: Code2 },
  { name: "Claude Code", category: "Agentic AI", icon: Sparkles },
  { name: "AWS Bedrock", category: "Applied AI", icon: Cpu },
  { name: "pgvector", category: "Vector DB", icon: Database },
  { name: "Python", category: "Language", icon: Code2 },
  { name: "Node.js", category: "Runtime", icon: Zap },
  { name: "WebRTC", category: "Streaming", icon: Radio },
  { name: "FFmpeg", category: "Media Processing", icon: FileVideo },
  { name: "Redis", category: "Cache & State", icon: Database },
];

const TRACK_2: TechItem[] = [
  { name: "React Native", category: "Mobile", icon: Layers },
  { name: "PostgreSQL", category: "Database", icon: Database },
  { name: "Prisma ORM", category: "ORM", icon: Database },
  { name: "Docker", category: "DevOps", icon: Box },
  { name: "Express.js", category: "Backend", icon: Zap },
  { name: "Socket.io", category: "WebSockets", icon: Radio },
  { name: "Tailwind CSS", category: "Styling", icon: Layers },
  { name: "MongoDB", category: "NoSQL", icon: Database },
  { name: "Redux Toolkit", category: "State Store", icon: Workflow },
  { name: "Jest Testing", category: "QA Testing", icon: Sparkles },
  { name: "shadcn/ui", category: "Components", icon: Layers },
  { name: "RESTful APIs", category: "API Design", icon: Compass },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 sm:mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] xs:text-xs font-mono tracking-wider text-theme-accent uppercase min-w-0 font-medium">
          <Workflow size={13} className="flex-shrink-0" />
          <span className="truncate">Production Tech Stack &amp; Capabilities</span>
        </div>
        <span className="text-[11px] font-mono text-theme-muted/70 hidden sm:inline flex-shrink-0">
          Hover to pause stream
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
