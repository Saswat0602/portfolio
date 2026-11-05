"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { userData } from "@/lib/data";
import { Search, ExternalLink, Code2, ArrowRight, Sparkles, Filter } from "lucide-react";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

export function ProjectsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { aesthetic } = useAestheticTheme();

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "full stack", label: "Full Stack" },
    { id: "ai & rag", label: "AI & RAG" },
    { id: "mobile", label: "Mobile" },
    { id: "agentic ai", label: "Agentic AI" },
    { id: "web application", label: "Web Apps" },
  ];

  const filteredProjects = useMemo(() => {
    return userData.Projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" ||
        project.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.project_name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full text-theme-primary">
      {/* Controls Bar: Search & Category Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 p-4 sm:p-5 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, technology, or domain..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs font-mono text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-theme-muted hover:text-theme-primary cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-theme-accent text-white dark:text-zinc-950 font-bold shadow-xs"
                    : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-8 text-xs font-mono text-theme-muted">
        <span>
          Showing <span className="text-theme-primary font-bold">{filteredProjects.length}</span> of{" "}
          {userData.Projects.length} production projects
        </span>
        {searchQuery && (
          <span className="text-theme-accent">
            Filtered by &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center p-8 rounded-2xl border border-dashed border-theme-border bg-theme-surface/40">
          <Filter size={32} className="text-theme-muted mb-3" />
          <h3 className="text-base font-bold text-theme-primary mb-1">No matching projects found</h3>
          <p className="text-xs text-theme-secondary max-w-sm mb-4">
            Try adjusting your search query or switching categories.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg bg-theme-surface-elevated hover:bg-theme-hover text-xs font-mono text-theme-primary transition-colors cursor-pointer border border-theme-border"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <article
              key={project.slug || project.project_name}
              className="group flex flex-col justify-between rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl overflow-hidden hover:border-theme-accent hover:bg-theme-surface transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div>
                {/* Image Cover */}
                <div className="relative w-full h-52 overflow-hidden bg-black/30">
                  <Image
                    src={project.image}
                    alt={project.project_name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full border border-theme-border bg-theme-surface/85 backdrop-blur-md text-theme-accent ${
                      aesthetic === "editorial" ? "font-serif italic text-xs" : "font-mono"
                    }`}>
                      {project.category}
                    </span>
                    <span className={`text-xs text-theme-muted ${aesthetic === "editorial" ? "font-serif italic" : "font-mono"}`}>
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {project.metrics && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-surface-elevated border border-theme-border text-[11px] font-mono text-emerald-500 mb-3">
                      <Sparkles size={11} />
                      <span className="truncate">{project.metrics}</span>
                    </div>
                  )}

                  <h3 className={`text-lg font-bold text-theme-primary mb-2 leading-snug group-hover:text-theme-accent transition-colors ${
                    aesthetic === "editorial" ? "font-serif font-normal text-xl" : "font-sans"
                  }`}>
                    <Link href={`/projects/${project.slug}`}>
                      {project.project_name}
                    </Link>
                  </h3>

                  <p className="text-xs text-theme-secondary font-light leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-theme-surface-elevated border border-theme-border text-theme-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-theme-surface-elevated text-theme-muted">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-theme-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <a
                    href={project.code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    <Code2 size={13} />
                    <span>Code</span>
                  </a>

                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-theme-accent hover:brightness-125 transition-colors"
                    >
                      <ExternalLink size={13} />
                      <span>Live</span>
                    </a>
                  )}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-1 text-theme-secondary hover:text-theme-accent group-hover:translate-x-0.5 transition-all"
                >
                  <span>Case Study</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
