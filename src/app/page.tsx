import { Hero } from "@/features/home/components/Hero";
import { WorkSection } from "@/features/projects/components/WorkSection";
import { CareerSection } from "@/features/about/components/CareerSection";
import { TechStack } from "@/features/about/components/TechStack";
import { Preloader } from "@/components/loaders";

export default function Home() {
  return (
    <Preloader>
      <main className="bg-[#0a0a0a] text-[#f5f5f5]">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Horizontal-scroll Work/Projects */}
        <WorkSection />

        {/* 3. Career & Experience timeline */}
        <CareerSection />

        {/* 4. Tech Stack pyramid */}
        <TechStack />
      </main>
    </Preloader>
  );
}
