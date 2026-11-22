"use client";

import Link from "next/link";
import { userData } from "@/lib/data";
import {
  Brain,
  Layers,
  ShieldCheck,
  Zap,
  GraduationCap,
  Briefcase,
  ArrowRight,
  MapPin,
  Mail,
  Compass,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Code2,
  Server,
  Database,
  Cpu,
  Smartphone,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function AboutOverview() {
  const principles = [
    {
      title: "Full-Stack & Type-Safe Architecture",
      description:
        "Building scalable web and mobile applications with Next.js, React, React Native, and NestJS, adhering to strict TypeScript patterns, clean architectural separation, and deterministic contracts.",
      icon: Layers,
    },
    {
      title: "Generative AI & Agentic Workflows",
      description:
        "Engineering production-grade AI architectures leveraging AWS Bedrock, RAG execution engines, zero-dependency DOM translation SDKs, and automated media pipelines.",
      icon: Brain,
    },
    {
      title: "Low-Latency & Real-Time Performance",
      description:
        "Implementing WebSocket macro executors, Socket.io bidirectional channels, WebRTC media streaming, and Redis caching for optimal sub-second responsiveness.",
      icon: Zap,
    },
    {
      title: "Production Rigor & Automated QA",
      description:
        "Instituting robust testing suites with Jest and React Testing Library (85%+ coverage), maintaining zero runtime crashes, and cutting production defects by 30%.",
      icon: ShieldCheck,
    },
  ];

  const skillCategories = [
    {
      title: "Frontend & Mobile",
      icon: Smartphone,
      skills: ["React.js", "Next.js (App Router)", "React Native", "Redux Toolkit", "Tailwind CSS", "shadcn/ui", "Zustand"],
    },
    {
      title: "Languages",
      icon: Code2,
      skills: ["TypeScript", "JavaScript (ES6+)", "Python", "HTML5", "CSS3", "SQL"],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      skills: ["NestJS", "Node.js", "Express.js", "Django REST Framework", "RESTful APIs", "WebSockets", "Socket.io"],
    },
    {
      title: "Databases & Cloud",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "Prisma ORM", "Redis", "SQLite", "AWS (S3, EC2, ELB)", "Firebase"],
    },
    {
      title: "Applied AI & Agentic Systems",
      icon: Brain,
      skills: ["Claude Code", "Multi-Agent Co-work", "AWS Bedrock", "Agentic Copilots", "MCP Integration", "pgvector RAG", "LangGraph"],
    },
    {
      title: "Tools & DevOps",
      icon: Cpu,
      skills: ["Git", "Docker", "Jest", "React Testing Library", "WebRTC", "Postman", "FFmpeg"],
    },
  ];

  return (
    <div className="w-full text-theme-primary">
      {/* Hero / Intro Card */}
      <section className="mb-10 sm:mb-14 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-theme-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
            <span className="px-3 sm:px-3.5 py-1 text-xs font-mono uppercase tracking-wider rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent font-medium">
              3+ Years Production Experience
            </span>
            <span className="text-theme-border hidden xs:inline">•</span>
            <span className="text-xs font-mono text-theme-secondary flex items-center gap-1.5">
              <MapPin size={12} className="text-theme-accent" />
              {userData.location}
            </span>
            <span className="text-theme-border hidden xs:inline">•</span>
            <span className="text-xs font-mono text-theme-muted">
              NETTANTRA (SDE 1)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl text-theme-primary tracking-tight leading-tight mb-4 sm:mb-6 font-sans font-black break-words">
            Saswat Ranjan Mohanty
          </h1>

          <p className="text-base sm:text-xl font-mono font-medium text-theme-accent mb-4">
            Software Engineer • Full-Stack, Mobile &amp; Applied AI Workflows
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-theme-secondary font-light leading-relaxed mb-6 sm:mb-8 font-sans">
            <p>
              Software Engineer with <strong>3+ years of experience</strong> building scalable full-stack applications using <strong>React, Next.js, and NestJS</strong>. Specialized in client performance, distributed real-time architectures, and deploying production-grade generative AI workflows.
            </p>
            <p>
              Currently serving as <strong>Software Development Engineer (SDE 1)</strong> at NetTantra Technologies in Bhubaneswar, India. Architecting agentic AI execution engines, enterprise RAG workflows, low-latency WebSocket communication systems, and high-coverage test suites.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="/saswat_ranjan_mohanty.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold hover:brightness-110 transition-all shadow-sm w-full sm:w-auto font-mono"
            >
              <FileText size={15} />
              <span>View Official Resume (PDF)</span>
              <ExternalLink size={13} className="opacity-75" />
            </a>

            <a
              href="/saswat_ranjan_mohanty.pdf"
              download="Saswat_Ranjan_Mohanty_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-primary text-xs font-mono transition-all w-full sm:w-auto"
            >
              <Download size={14} className="text-theme-accent" />
              <span>Download CV</span>
            </a>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-secondary hover:text-theme-primary text-xs font-mono transition-all w-full sm:w-auto"
            >
              <span>Shipped Projects</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-secondary hover:text-theme-primary text-xs font-mono transition-all w-full sm:w-auto"
            >
              <Mail size={14} />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Official Resume & Technical Credentials Card */}
      <section className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-theme-border bg-theme-surface/75 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-accent mb-2 font-medium">
              <FileText size={14} />
              <span>Curriculum Vitae &amp; Verified Credentials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-theme-primary tracking-tight mb-2">
              Official Resume Document
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
              Updated technical profile summarizing 3+ years of software engineering achievements, verified production metrics, academic background, and core technology proficiencies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="/saswat_ranjan_mohanty.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-semibold hover:brightness-110 shadow-sm transition-all font-mono"
            >
              <FileText size={14} />
              <span>Open PDF Fullscreen</span>
              <ExternalLink size={12} />
            </a>

            <a
              href="/saswat_ranjan_mohanty.pdf"
              download="Saswat_Ranjan_Mohanty_Resume.pdf"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-primary text-xs font-mono transition-all"
            >
              <Download size={14} className="text-theme-accent" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-theme-border/70">
          <div className="p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40">
            <div className="text-xl sm:text-2xl font-black font-mono text-theme-primary">3+ YOE</div>
            <div className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">Software Engineer</div>
          </div>
          <div className="p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40">
            <div className="text-xl sm:text-2xl font-black font-mono text-theme-accent">98%</div>
            <div className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">Action Success Rate</div>
          </div>
          <div className="p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40">
            <div className="text-xl sm:text-2xl font-black font-mono text-theme-primary">85%+</div>
            <div className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">Jest Code Coverage</div>
          </div>
          <div className="p-3.5 rounded-xl border border-theme-border/60 bg-theme-surface-elevated/40">
            <div className="text-xl sm:text-2xl font-black font-mono text-theme-accent">MCA</div>
            <div className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">2021 – 2023 Batch</div>
          </div>
        </div>
      </section>

      {/* Experience Timeline (Synchronized from Resume) */}
      <section className="mb-14 sm:mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-accent mb-2 font-medium">
          <Briefcase size={14} />
          <span>Work History &amp; Production Track Record</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-sans text-theme-primary tracking-tight mb-8">
          Professional Experience
        </h2>

        <div className="flex flex-col gap-6 sm:gap-8">
          {userData.experience.map((exp) => (
            <div
              key={exp.title}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary">
                    {exp.title}
                  </h3>
                  <div className="text-sm font-semibold text-theme-accent font-sans mt-0.5">
                    {exp.company} • <span className="font-mono text-xs font-normal text-theme-muted">{exp.location}</span>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 text-xs font-mono rounded-lg border border-theme-border bg-theme-accent-subtle text-theme-accent font-medium">
                  {exp.duration}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Verified Bullet Points */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="flex flex-col gap-2.5 mb-5 pt-3 border-t border-theme-border/50">
                  {exp.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-theme-secondary leading-relaxed">
                      <CheckCircle2 size={15} className="text-theme-accent mt-0.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-theme-surface-elevated border border-theme-border text-theme-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structured Technical Skills Categories */}
      <section className="mb-14 sm:mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-accent mb-2 font-medium">
          <Code2 size={14} />
          <span>Technical Domain Competencies</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-sans text-theme-primary tracking-tight mb-8">
          Skills &amp; Technology Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-5 sm:p-6 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg border border-theme-border bg-theme-surface-elevated flex items-center justify-center text-theme-accent">
                      <Icon size={16} />
                    </div>
                    <h3 className="text-base font-bold font-sans text-theme-primary">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-theme-border bg-theme-surface-elevated text-theme-secondary hover:text-theme-primary hover:border-theme-accent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Engineering Principles */}
      <section className="mb-14 sm:mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-theme-accent mb-2 font-medium">
          <Compass size={14} />
          <span>Core Engineering Principles</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-sans text-theme-primary tracking-tight mb-8">
          Engineering Philosophy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <SpotlightCard
                key={principle.title}
                className="p-5 sm:p-7 rounded-2xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl hover:border-theme-accent transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl border border-theme-border bg-theme-surface-elevated flex items-center justify-center text-theme-accent mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-theme-primary mb-2 group-hover:text-theme-accent transition-colors break-words">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Education & Academic Credentials */}
      <section className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-theme-border bg-theme-surface/90 backdrop-blur-xl shadow-sm mb-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-accent mb-3">
          <GraduationCap size={16} />
          <span>Academic Background</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-sans text-theme-primary mb-6">
          Education &amp; Credentials
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl border border-theme-border/70 bg-theme-surface-elevated/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-theme-accent font-semibold block mb-1">
                Postgraduate Degree • 2021 – 2023
              </span>
              <h4 className="text-base sm:text-lg font-bold text-theme-primary mb-1">
                Master of Computer Applications (MCA)
              </h4>
              <p className="text-xs sm:text-sm text-theme-secondary font-light">
                United School of Business Management, Bhubaneswar, India
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-theme-border/50 text-xs font-mono text-theme-muted">
              Advanced Software Engineering, Database Systems &amp; Distributed Architectures
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-theme-border/70 bg-theme-surface-elevated/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-theme-accent font-semibold block mb-1">
                Undergraduate Degree
              </span>
              <h4 className="text-base sm:text-lg font-bold text-theme-primary mb-1">
                Bachelor of Science (BSc)
              </h4>
              <p className="text-xs sm:text-sm text-theme-secondary font-light">
                Utkal University, Bhubaneswar, India
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-theme-border/50 text-xs font-mono text-theme-muted">
              Computer Science, Discrete Mathematics &amp; Computational Foundations
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
