import { Hero } from "@/features/home/components/Hero";
import { Preloader } from "@/components/loaders";

export default function Home() {
  return (
    <Preloader>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
      </main>
    </Preloader>
  );
}
