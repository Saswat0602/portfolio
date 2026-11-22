import type { Metadata } from "next";
import { ProjectsCatalog } from "@/features/projects/components/ProjectsCatalog";
import { GitHubContributionGraph } from "@/features/projects/components/GitHubContributionGraph";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Production Projects & AI Systems | Saswat Ranjan Mohanty",
  description:
    "Production engineering systems by Saswat Ranjan Mohanty: Orbito enterprise AI platform, AI Learning Platform, ReviewSage autonomous research agent, Oryn UI component library, and Shomes geospatial marketplace.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Page Header */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
            <Cpu size={13} className="flex-shrink-0" />
            <span>Architecture &amp; Engineering Showcase</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-theme-primary tracking-tight mb-3 sm:mb-4 heading-display break-words">
            Production Projects &amp; <span className="text-theme-accent">AI Systems</span>
          </h1>

          <p className="max-w-3xl text-sm sm:text-base md:text-lg text-theme-secondary font-light leading-relaxed">
            A comprehensive catalog of real-world full-stack web and mobile applications, real-time WebRTC platforms, and modern AWS Bedrock AI and RAG architectures engineered over 3+ years.
          </p>
        </div>

        {/* 1. TOP: Live GitHub Analytics & 365-Day Contributions Heatmap */}
        <section aria-label="GitHub Engineering Analytics">
          <GitHubContributionGraph />
        </section>

        {/* 2. Flagship Production Projects Catalog */}
        <section aria-label="Production Systems Catalog">
          <ProjectsCatalog />
        </section>
      </div>
    </main>
  );
}
