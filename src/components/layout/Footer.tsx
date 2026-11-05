"use client";

import { useState } from "react";
import Link from "next/link";
import { userData } from "@/lib/data";
import { Mail, MapPin, ArrowUpRight, Cpu, Copy, Check, Compass } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const { aesthetic } = useAestheticTheme();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userData.about.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <footer className="w-full border-t border-theme-border bg-theme-base text-theme-secondary relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Col 1: Bio & Positioning */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-theme-accent p-[1px]">
                <div className="w-full h-full bg-theme-surface rounded-[7px] flex items-center justify-center">
                  {aesthetic === "blueprint" ? (
                    <Compass size={14} className="text-theme-accent" />
                  ) : (
                    <Cpu size={14} className="text-theme-accent" />
                  )}
                </div>
              </div>
              <span className={`text-base font-bold text-theme-primary tracking-tight ${
                aesthetic === "editorial" ? "font-serif text-lg font-normal" : "font-sans"
              }`}>
                {userData.name}
              </span>
            </div>

            <p className="text-sm text-theme-secondary leading-relaxed font-light max-w-sm">
              Full Stack Developer with 3+ years of experience engineering high-performance web applications, cross-platform mobile apps, and modern AI architectures with AWS Bedrock and RAG pipelines.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-theme-secondary">
                Software Development Engineer I at HyScaler
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-theme-primary font-semibold mb-2">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono">
              <li>
                <Link href="/" className="hover:text-theme-primary hover:text-theme-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-theme-primary hover:text-theme-accent transition-colors">
                  About &amp; Career
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-theme-primary hover:text-theme-accent transition-colors">
                  Projects &amp; Demos
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-theme-primary hover:text-theme-accent transition-colors">
                  Technical Capabilities
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-theme-primary hover:text-theme-accent transition-colors">
                  Experience Timeline
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-theme-primary hover:text-theme-accent transition-colors">
                  Contact / Email Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-theme-primary font-semibold mb-2">
              Direct Contact
            </h4>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl border border-theme-border bg-theme-surface">
                <a
                  href={`mailto:${userData.about.email}`}
                  className="flex items-center gap-2.5 text-theme-secondary hover:text-theme-primary transition-colors"
                >
                  <Mail size={16} className="text-theme-accent" />
                  <span className="font-mono text-xs">{userData.about.email}</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-1 rounded text-theme-muted hover:text-theme-primary transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-theme-border bg-theme-surface text-xs font-mono text-theme-muted">
                <MapPin size={16} className="text-amber-500" />
                <span>{userData.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/Saswat0602"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-secondary hover:text-theme-primary transition-all"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/saswat0602"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-secondary hover:text-theme-primary transition-all"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>

              <Link
                href="/#contact"
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-theme-accent-subtle border border-theme-border text-xs font-mono text-theme-accent hover:brightness-125 transition-all"
              >
                <span>Email Me</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-theme-muted">
          <p>© {new Date().getFullYear()} Saswat Ranjan. Engineered with Next.js &amp; TypeScript.</p>
          <div className="flex items-center gap-3">
            <span>Full Stack</span>
            <span>•</span>
            <span>AWS Bedrock</span>
            <span>•</span>
            <span>RAG &amp; Agentic AI</span>
            <span>•</span>
            <span>HyScaler</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
