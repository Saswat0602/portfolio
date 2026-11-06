import { Hero } from "@/features/home/components/Hero";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { WorkSection } from "@/features/projects/components/WorkSection";
import { CareerSection } from "@/features/about/components/CareerSection";
import { TechStack } from "@/features/about/components/TechStack";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { Preloader } from "@/components/loaders";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <Preloader>
      <main className="bg-theme-base text-theme-primary min-h-screen transition-colors duration-300 w-full max-w-full overflow-x-hidden">
        {/* 1. Hero with Interactive 32px Dot Grid Drift & Animated Metric Counters */}
        <Hero />

        {/* 2. Infinite Dual-Track Tech Marquee */}
        <ScrollReveal>
          <TechMarquee />
        </ScrollReveal>

        {/* 3. Full-Stack & Applied AI Capabilities */}
        <ScrollReveal>
          <TechStack />
        </ScrollReveal>

        {/* 4. Selected Production Projects (VSA, Taskosaur, Shomes, Mad-UI, etc.) */}
        <ScrollReveal>
          <WorkSection />
        </ScrollReveal>

        {/* 5. Career Chronology at NetTantra Technologies */}
        <ScrollReveal>
          <CareerSection />
        </ScrollReveal>

        {/* 6. Contact Section */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>
    </Preloader>
  );
}
