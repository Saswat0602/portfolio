import type { Metadata } from "next";
import { Suspense } from "react";
import { PlaygroundHub } from "@/features/playground/components/PlaygroundHub";

export const metadata: Metadata = {
  title: "Engineering Playground | Saswat Ranjan Mohanty",
  description:
    "Interactive engineering laboratory showcasing real-time AI system flows, 60fps neural particle canvas, developer CLI terminal runners, and 3D spring-physics interactions.",
};

export default function PlaygroundPage() {
  return (
    <main className="w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={null}>
          <PlaygroundHub />
        </Suspense>
      </div>
    </main>
  );
}
