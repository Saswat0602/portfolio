import type { Metadata } from "next";
import { AboutOverview } from "@/features/about/components/AboutOverview";

export const metadata: Metadata = {
  title: "About & Engineering Background | Saswat Ranjan Mohanty",
  description:
    "Learn about Saswat Ranjan Mohanty's 3+ years of engineering experience delivering full-stack web and mobile applications, NetTantra Technologies background, and applied AI systems.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary transition-colors duration-300 max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AboutOverview />
      </div>
    </main>
  );
}
