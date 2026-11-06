import { Hero } from "@/features/home/components/Hero";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { ArchitectureExplorer } from "@/features/home/components/ArchitectureExplorer";
import { WorkSection } from "@/features/projects/components/WorkSection";
import { CareerSection } from "@/features/about/components/CareerSection";
import { TechStack } from "@/features/about/components/TechStack";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { Preloader } from "@/components/loaders";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <Preloader>
      <main className="bg-theme-base text-theme-primary min-h-screen transition-colors duration-300">
        {/* 1. Hero with Interactive 32px Dot Grid Drift & Animated Metric Counters */}
        <Hero />

        {/* 2. Infinite Dual-Track Tech Marquee */}
        <ScrollReveal>
          <TechMarquee />
        </ScrollReveal>

        {/* 3. System Architecture Explorer with Animated Data Flow Pulse */}
        <ScrollReveal>
          <ArchitectureExplorer />
        </ScrollReveal>

        {/* 4. Full-Stack & Applied AI Capabilities */}
        <ScrollReveal>
          <TechStack />
        </ScrollReveal>

        {/* 5. Selected Production Projects (VSA, Taskosaur, Shomes, Mad-UI, etc.) */}
        <ScrollReveal>
          <WorkSection />
        </ScrollReveal>

        {/* 6. Career Chronology at NetTantra Technologies */}
        <ScrollReveal>
          <CareerSection />
        </ScrollReveal>

        {/* 7. Contact Section */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>
    </Preloader>
  );
}
