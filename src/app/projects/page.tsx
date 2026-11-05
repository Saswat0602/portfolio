import type { Metadata } from "next";
import { ProjectsCatalog } from "@/features/projects/components/ProjectsCatalog";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Production Projects & AI Case Studies | Saswat Ranjan",
  description:
    "Enterprise RAG pipelines, AWS Bedrock systems, autonomous Agentic AI swarms, and scalable full-stack web platforms engineered by Saswat Ranjan.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen py-16 px-6 sm:px-8 bg-theme-base text-theme-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
            <Cpu size={13} />
            <span>Architecture &amp; Engineering Showcase</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-theme-primary tracking-tight mb-4 heading-display">
            Production Projects &amp; <span className="editorial-italic text-theme-accent">AI Systems</span>
          </h1>

          <p className="max-w-3xl text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
            A comprehensive catalog of real-world full-stack web and mobile applications, real-time WebRTC platforms, and modern AWS Bedrock AI and RAG architectures engineered over 3+ years.
          </p>
        </div>

        {/* Catalog Feature */}
        <ProjectsCatalog />
      </div>
    </main>
  );
}
