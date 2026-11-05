import Link from "next/link";
import { Home, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-theme-base text-theme-primary transition-colors duration-300">
      <div className="max-w-md mx-auto p-8 sm:p-10 rounded-3xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-xl">
        <span className="text-xs font-mono uppercase tracking-widest text-theme-accent font-bold block mb-3">
          404 // Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-theme-primary tracking-tight mb-3 heading-display">
          Page Not <span className="editorial-italic text-theme-accent">Found</span>
        </h1>

        <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed mb-8">
          The requested route, case study, or resource does not exist or has been relocated in the architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold transition-all shadow-sm hover:brightness-110"
          >
            <Home size={14} />
            <span>Return Home</span>
          </Link>

          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated hover:bg-theme-hover text-theme-primary text-xs font-mono transition-all"
          >
            <Layers size={14} />
            <span>All Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
