import { Hero } from "@/features/home/components/Hero";
import { WorkSection } from "@/features/projects/components/WorkSection";
import { CareerSection } from "@/features/about/components/CareerSection";
import { TechStack } from "@/features/about/components/TechStack";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { Preloader } from "@/components/loaders";

export default function Home() {
  return (
    <Preloader>
      <main className="bg-theme-base text-theme-primary min-h-screen transition-colors duration-300">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Full Stack & AI Capabilities */}
        <TechStack />

        {/* 3. Selected Real & Production Projects */}
        <WorkSection />

        {/* 4. Career & Experience Timeline at HyScaler */}
        <CareerSection />

        {/* 5. Contact Section with Email Copy & Direct Form */}
        <ContactSection />
      </main>
    </Preloader>
  );
}
