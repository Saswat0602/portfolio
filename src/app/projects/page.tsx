import type { Metadata } from "next";
import { ProjectsCatalog } from "@/features/projects/components/ProjectsCatalog";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Production Projects & AI Case Studies | Saswat Ranjan Mohanty",
  description:
    "Applied AI video pipelines, Taskosaur Any agentic copilot, Shomes real estate spatial search, Mad-UI, and scalable full-stack platforms engineered by Saswat Ranjan Mohanty.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary transition-colors duration-300 max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col items-start mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
            <Cpu size={13} className="flex-shrink-0" />
            <span>Architecture &amp; Engineering Showcase</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-theme-primary tracking-tight mb-3 sm:mb-4 heading-display break-words">
            Production Projects &amp; <span className="editorial-italic text-theme-accent">AI Systems</span>
          </h1>

          <p className="max-w-3xl text-sm sm:text-base md:text-lg text-theme-secondary font-light leading-relaxed">
            A comprehensive catalog of real-world full-stack web and mobile applications, real-time WebRTC platforms, and modern AWS Bedrock AI and RAG architectures engineered over 3+ years.
          </p>
        </div>

        {/* Catalog Feature */}
        <ProjectsCatalog />
      </div>
    </main>
  );
}
