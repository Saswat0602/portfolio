import type { Metadata } from "next";
import { AboutOverview } from "@/features/about/components/AboutOverview";

export const metadata: Metadata = {
  title: "About & Engineering Background | Saswat Ranjan",
  description:
    "Learn about Saswat Ranjan's 3+ years of engineering experience delivering full-stack web and mobile applications, AWS Bedrock systems, and enterprise RAG pipelines.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen py-16 px-6 sm:px-8 bg-theme-base text-theme-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <AboutOverview />
      </div>
    </main>
  );
}
