"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { AestheticThemeSwitcher } from "./AestheticThemeSwitcher";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { aesthetic } = useAestheticTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-theme-surface/90 backdrop-blur-xl border-b border-theme-border shadow-md py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.02] min-w-0 flex-shrink"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-theme-accent p-[1px] shadow-sm transition-colors duration-300 flex-shrink-0">
            <div className="w-full h-full bg-theme-surface rounded-[7px] flex items-center justify-center transition-colors">
              <span className={`text-xs font-black tracking-wider text-theme-accent group-hover:brightness-125 transition-all ${
                aesthetic === "editorial" ? "font-serif italic text-sm" : "font-mono"
              }`}>
                SR
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className={`text-xs sm:text-sm font-bold tracking-tight text-theme-primary group-hover:text-theme-accent transition-colors truncate max-w-[135px] xs:max-w-[200px] sm:max-w-none ${
              aesthetic === "editorial" ? "font-serif sm:text-base" : "font-sans"
            }`}>
              Saswat Ranjan Mohanty
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-theme-secondary hidden xs:flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="truncate">
                {aesthetic === "editorial" ? "Artisan Software Craftsman" : "Software Engineer • Applied AI"}
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-md">
          {siteConfig.navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href) &&
                  link.href !== "/#skills" &&
                  link.href !== "/#experience" &&
                  link.href !== "/#contact";

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-theme-accent-subtle text-theme-accent font-semibold shadow-xs"
                    : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Aesthetic Switcher + Socials + CTA */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
          {/* Header Switcher */}
          <AestheticThemeSwitcher />

          <div className="h-4 w-px bg-theme-border mx-1" />

          <a
            href="https://github.com/Saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent flex items-center justify-center text-theme-secondary hover:text-theme-primary transition-all"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href="https://www.linkedin.com/in/saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent flex items-center justify-center text-theme-secondary hover:text-theme-primary transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>

          <Link
            href="/#contact"
            className="btn-sheen group flex items-center gap-1.5 px-4 py-2 rounded-lg bg-theme-accent text-white dark:text-zinc-950 text-xs font-semibold hover:brightness-110 shadow-sm hover:shadow-md transition-all flex-shrink-0"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Right Bar: Compact Switcher + Hamburger Button */}
        <div className="md:hidden flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <AestheticThemeSwitcher compact />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg border border-theme-border bg-theme-surface flex items-center justify-center text-theme-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[56px] sm:top-[64px] bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-40 border-b border-theme-border bg-theme-surface/98 backdrop-blur-2xl px-4 sm:px-6 py-5 animate-in slide-in-from-top-3 duration-200 shadow-xl max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {/* Aesthetic Switcher in Drawer */}
          <div className="mb-4 pb-4 border-b border-theme-border flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
            <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
              Aesthetic &amp; Theme
            </span>
            <AestheticThemeSwitcher className="w-full xs:w-auto justify-between" />
          </div>

          <div className="flex flex-col gap-1.5 mb-5">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-theme-secondary hover:text-theme-primary hover:bg-theme-hover active:bg-theme-accent-subtle transition-colors flex items-center justify-between min-h-[44px] touch-manipulation"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} className="text-theme-muted" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 pt-4 border-t border-theme-border">
            <div className="flex items-center justify-center gap-2">
              <a
                href="https://github.com/Saswat0602"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 xs:flex-none w-auto xs:w-10 h-10 rounded-xl border border-theme-border flex items-center justify-center text-theme-secondary hover:text-theme-primary hover:bg-theme-hover transition-colors min-h-[44px]"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/saswat0602"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 xs:flex-none w-auto xs:w-10 h-10 rounded-xl border border-theme-border flex items-center justify-center text-theme-secondary hover:text-theme-primary hover:bg-theme-hover transition-colors min-h-[44px]"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>

            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-semibold shadow-sm min-h-[44px]"
            >
              <Terminal size={14} />
              <span>Contact Me</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
