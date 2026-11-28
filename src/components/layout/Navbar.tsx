"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { ThemeToggle } from "./ThemeToggle";
import { GooeyNav } from "./GooeyNav";
import { CoordinateInkButton } from "@/components/ui/CoordinateInkButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return `/${window.location.hash}`;
    }
    return "";
  });
  const pathname = usePathname();

  // Determine active tab across dynamic routes and homepage sections
  const activeTab = (() => {
    if (pathname === "/about") return "/about";
    if (pathname.startsWith("/projects")) return "/projects";
    if (pathname.startsWith("/playground")) return "/playground";
    if (pathname === "/") return activeSection;
    return pathname;
  })();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on the homepage during scroll
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["skills", "experience", "contact"];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      if (window.scrollY < 260) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!sectionElements.length) {
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(`/#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  // Smooth in-page scrolling when navigating to hash sections
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleNavClick = (
    e?: React.MouseEvent<HTMLElement>,
    href: string = "/"
  ) => {
    if (href.startsWith("/#") && pathname === "/") {
      e?.preventDefault();
      setActiveSection(href);
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
      setMobileMenuOpen(false);
    } else if (href === "/" && pathname === "/") {
      e?.preventDefault();
      setActiveSection("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

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
          onClick={(e) => handleNavClick(e, "/")}
          className="group flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.02] min-w-0 flex-shrink"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-theme-accent p-[1px] shadow-sm transition-colors duration-300 flex-shrink-0">
            <div className="w-full h-full bg-theme-surface rounded-[7px] flex items-center justify-center transition-colors">
              <span className="text-xs font-black tracking-wider text-theme-accent group-hover:brightness-125 transition-all font-mono">
                SR
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-theme-primary group-hover:text-theme-accent transition-colors truncate max-w-[135px] xs:max-w-[200px] sm:max-w-none font-sans">
              Saswat Ranjan Mohanty
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-theme-secondary hidden xs:block truncate">
              Software Engineer • Applied AI
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links with Liquid-Mercury Gooey Metaball Pill */}
        <nav className="hidden lg:flex items-center justify-center">
          <GooeyNav
            items={siteConfig.navLinks.map((link) => ({
              id: link.href,
              label: link.label,
              href: link.href,
            }))}
            activeId={activeTab}
            onSelect={(id, href, e) => handleNavClick(e, href || id)}
          />
        </nav>

        {/* Right Controls: Theme Toggle + Resume + Socials + CTA */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
          <ThemeToggle />

          <a
            href="/saswat_ranjan_mohanty.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-hover hover:border-theme-accent text-theme-secondary hover:text-theme-primary text-xs font-mono font-medium transition-all"
            aria-label="View Resume (PDF)"
          >
            <FileText size={14} className="text-theme-accent" />
            <span>Resume</span>
          </a>

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

          <CoordinateInkButton
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            label="Let's Connect"
            variant="primary"
            size="sm"
            rounded="lg"
            icon={<ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
            className="flex-shrink-0"
          />
        </div>

        {/* Mobile Right Bar: Theme Toggle + Hamburger Button */}
        <div className="md:hidden flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <ThemeToggle />

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
          {/* Theme Mode in Drawer */}
          <div className="mb-4 pb-4 border-b border-theme-border flex items-center justify-between gap-2.5">
            <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
              Theme Mode
            </span>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-1.5 mb-5">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-theme-secondary hover:text-theme-primary hover:bg-theme-hover active:bg-theme-accent-subtle transition-colors flex items-center justify-between min-h-[44px] touch-manipulation"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} className="text-theme-muted" />
              </Link>
            ))}

            <a
              href="/saswat_ranjan_mohanty.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-theme-accent bg-theme-accent-subtle border border-theme-border flex items-center justify-between min-h-[44px] touch-manipulation font-mono"
            >
              <span className="flex items-center gap-2">
                <FileText size={15} />
                <span>Resume (PDF)</span>
              </span>
              <ArrowUpRight size={14} />
            </a>
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

            <CoordinateInkButton
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              label="Let's Connect"
              variant="primary"
              size="sm"
              rounded="xl"
              icon={<ArrowUpRight size={14} />}
              className="flex-1 xs:flex-none min-h-[44px]"
            />
          </div>
        </div>
      )}
    </header>
  );
}
