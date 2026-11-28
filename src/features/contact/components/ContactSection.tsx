"use client";

import { useState, useEffect } from "react";
import { userData } from "@/lib/data";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  MessageCircle,
  FileText,
  Briefcase,
  Rocket,
  Cpu,
  MessageSquare,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { CoordinateInkButton } from "@/components/ui/CoordinateInkButton";

export interface ContactSectionProps {
  isStandalone?: boolean;
}

interface TopicPreset {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  subject: string;
  starterBody: string;
}

const TOPIC_PRESETS: TopicPreset[] = [
  {
    id: "fulltime",
    label: "Full-Time Role",
    badge: "Full-Time / SDE",
    icon: Briefcase,
    subject: "Full-Stack & Applied AI Engineer Opportunity",
    starterBody: `Hi Saswat,\n\nI reviewed your portfolio and would like to speak with you regarding an engineering opportunity with our team.\n\nCompany / Team: \nRole Scope: Full-Stack & Applied AI (SDE)\nLocation / Setup: Remote / Hybrid\nTimeline: \n\nLooking forward to connecting!`,
  },
  {
    id: "freelance",
    label: "Freelance & Contract",
    badge: "Freelance / MVP",
    icon: Rocket,
    subject: "Freelance Project & Contract Development Inquiry",
    starterBody: `Hi Saswat,\n\nI would like to hire you for a freelance project / contract development.\n\nProject Scope: (Web Platform / Mobile App / AI Integration / MVP)\nKey Deliverables: \nTarget Timeline & Budget: \n\nLet me know your availability!`,
  },
  {
    id: "ai-agents",
    label: "Claude Code & AI Systems",
    badge: "AI Copilots & RAG",
    icon: Cpu,
    subject: "Agentic AI & LLM Systems Collaboration",
    starterBody: `Hi Saswat,\n\nI am interested in your work with Claude Code, multi-agent co-work architectures, AWS Bedrock, and pgvector RAG.\n\nProject Scope: \nKey Requirements: \nTarget Timeline: \n\nBest regards,`,
  },
  {
    id: "advisory",
    label: "Technical Advisory",
    badge: "Advisory & Architecture",
    icon: MessageSquare,
    subject: "Technical Architecture & Advisory Consultation",
    starterBody: `Hi Saswat,\n\nI would love to connect and chat about software architecture, system design, or engineering advisory.\n\nDiscussion Topic: \n\nCheers,`,
  },
];

export function ContactSection({ isStandalone = false }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("fulltime");
  const [localTime, setLocalTime] = useState<string>("");

  const selectedTopic =
    TOPIC_PRESETS.find((t) => t.id === selectedTopicId) || TOPIC_PRESETS[0];

  const [draftSubject, setDraftSubject] = useState(selectedTopic.subject);
  const [draftBody, setDraftBody] = useState(selectedTopic.starterBody);

  // Live Indian Standard Time (IST) clock
  useEffect(() => {
    const updateLocalTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setLocalTime(`${formatted} IST (UTC+5:30)`);
      } catch {
        setLocalTime("IST (UTC+5:30)");
      }
    };

    updateLocalTime();
    const timer = setInterval(updateLocalTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectTopic = (topic: TopicPreset) => {
    setSelectedTopicId(topic.id);
    setDraftSubject(topic.subject);
    setDraftBody(topic.starterBody);
  };

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(userData.about.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = userData.about.email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Fallback handled gracefully
    }
  };

  const handleCopyDraft = async () => {
    try {
      const fullText = `Subject: ${draftSubject}\n\n${draftBody}`;
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = fullText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2400);
    } catch {
      // Fallback handled gracefully
    }
  };

  // Structured mailto URL with user-edited subject and message
  const mailtoSubject = encodeURIComponent(draftSubject || selectedTopic.subject);
  const mailtoBody = encodeURIComponent(draftBody || selectedTopic.starterBody);
  const mailtoUrl = `mailto:${userData.about.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Direct WhatsApp chat link
  const whatsappUrl = `https://wa.me/919178842947?text=${encodeURIComponent(
    `Hi Saswat,\n\nRegarding ${draftSubject}:`
  )}`;

  const content = (
    <div className="max-w-5xl mx-auto">
      {/* 1. Header (Open, typography-led, no boxes) */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 text-xs font-mono text-theme-accent uppercase tracking-wider mb-3 font-medium">
          <span>Open for Full-Time Roles &amp; Freelance Projects</span>
        </div>

        {isStandalone ? (
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans text-theme-primary tracking-tight mb-4 break-words">
            Let&apos;s build something <span className="text-theme-accent">exceptional</span> together.
          </h1>
        ) : (
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans text-theme-primary tracking-tight mb-4 break-words">
            Let&apos;s build something <span className="text-theme-accent">exceptional</span> together.
          </h2>
        )}

        <p className="text-sm sm:text-base md:text-lg text-theme-secondary font-light max-w-2xl leading-relaxed">
          {userData.contact.message}
        </p>
      </div>

      {/* 2. Direct Email Action (Large typography, no box container) */}
      <div className="pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-theme-border/60 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted block mb-2 font-medium">
            Direct Inbound Email
          </span>
          <a
            href={mailtoUrl}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-theme-primary hover:text-theme-accent transition-colors tracking-tight flex items-center gap-2 sm:gap-3 group break-all"
            title="Click to draft an email"
          >
            <span>{userData.about.email}</span>
            <ArrowUpRight
              size={26}
              className="text-theme-muted group-hover:text-theme-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0"
            />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-theme-border hover:border-theme-accent bg-theme-surface/60 hover:bg-theme-hover text-xs font-mono text-theme-primary transition-all cursor-pointer shadow-2xs"
          >
            {copiedEmail ? (
              <>
                <Check size={14} className="text-theme-accent" />
                <span className="text-theme-accent font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-theme-muted" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-mono text-emerald-400 transition-all shadow-2xs"
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 3. Direct Channels & Telemetry (Pure inline links, no card boxes) */}
      <div className="pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-theme-border/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 sm:gap-7">
          <a
            href={`tel:${userData.about.phone}`}
            className="flex items-center gap-1.5 text-theme-secondary hover:text-theme-primary transition-colors group"
          >
            <span className="text-theme-muted">Tel:</span>
            <span className="font-semibold text-theme-primary">{userData.about.phone}</span>
          </a>

          <a
            href="https://github.com/Saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-theme-secondary hover:text-theme-primary transition-colors group"
          >
            <GithubIcon size={14} className="text-theme-accent" />
            <span>GitHub</span>
            <ArrowUpRight size={11} className="text-theme-muted group-hover:text-theme-primary transition-colors" />
          </a>

          <a
            href="https://www.linkedin.com/in/saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-theme-secondary hover:text-theme-primary transition-colors group"
          >
            <LinkedinIcon size={14} className="text-theme-accent" />
            <span>LinkedIn</span>
            <ArrowUpRight size={11} className="text-theme-muted group-hover:text-theme-primary transition-colors" />
          </a>

          <a
            href="/saswat_ranjan_mohanty.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-theme-secondary hover:text-theme-primary transition-colors group"
          >
            <FileText size={14} className="text-theme-accent" />
            <span>Resume PDF</span>
            <ArrowUpRight size={11} className="text-theme-muted group-hover:text-theme-primary transition-colors" />
          </a>
        </div>

        <div className="flex items-center gap-2 text-theme-muted text-[11px]">
          <span>Bhubaneswar, IN</span>
          <span>•</span>
          <span>{localTime || "IST (UTC+5:30)"}</span>
        </div>
      </div>

      {/* 4. Open-Notepad Mail Launcher (Frameless, subtle accent line, NO box-in-box) */}
      <div>
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-semibold block mb-1">
              Quick Email Starter
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-sans text-theme-primary tracking-tight">
              Customize &amp; Launch in Your Mail App
            </h3>
          </div>

          <span className="text-xs font-mono text-theme-muted">
            Tap a topic to auto-fill the draft
          </span>
        </div>

        {/* Soft topic chips (clean text pills, no heavy bordered boxes) */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
          {TOPIC_PRESETS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleSelectTopic(topic)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-theme-accent text-white dark:text-zinc-950 font-semibold shadow-xs"
                    : "text-theme-secondary hover:text-theme-primary hover:bg-theme-surface border border-transparent hover:border-theme-border/60"
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>

        {/* Seamless Notepad Canvas (open, single left accent line, no container card) */}
        <div className="relative border-l-2 border-theme-accent/60 pl-4 sm:pl-6 py-2 mb-6 flex flex-col gap-4">
          {/* Subject Line */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 text-xs font-mono">
            <span className="text-theme-muted uppercase tracking-wider text-[11px] flex-shrink-0 font-medium">
              Subject:
            </span>
            <input
              type="text"
              value={draftSubject}
              onChange={(e) => setDraftSubject(e.target.value)}
              className="flex-1 bg-transparent text-sm sm:text-base font-mono font-medium text-theme-primary focus:outline-none placeholder:text-theme-muted border-b border-theme-border/50 pb-1 focus:border-theme-accent transition-colors"
            />
          </div>

          {/* Message Body */}
          <div className="flex flex-col gap-1 text-xs font-mono">
            <span className="text-theme-muted uppercase tracking-wider text-[10px]">
              Draft Template (Editable):
            </span>
            <textarea
              rows={6}
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-mono text-theme-secondary focus:text-theme-primary focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-3">
          <CoordinateInkButton
            href={mailtoUrl}
            label="Open in Email App"
            variant="primary"
            size="md"
            rounded="xl"
            icon={<Mail size={15} />}
            iconPosition="left"
            className="font-mono text-xs font-bold"
          />

          <button
            type="button"
            onClick={handleCopyDraft}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-theme-border hover:border-theme-accent bg-theme-surface/60 hover:bg-theme-hover text-xs font-mono text-theme-primary transition-all cursor-pointer shadow-2xs"
          >
            {copiedDraft ? (
              <>
                <Check size={14} className="text-theme-accent" />
                <span className="font-semibold text-theme-accent">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-theme-muted" />
                <span>Copy Message Text</span>
              </>
            )}
          </button>

          <span className="text-[11px] font-mono text-theme-muted hidden sm:inline ml-auto">
            Launches default mail client (Gmail, Apple Mail, Outlook)
          </span>
        </div>
      </div>
    </div>
  );

  if (isStandalone) {
    return <div className="w-full text-theme-primary max-w-full overflow-hidden">{content}</div>;
  }

  return (
    <section
      id="contact"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary relative z-10 border-t border-theme-border/60 transition-colors duration-300 max-w-full overflow-hidden"
    >
      {content}
    </section>
  );
}
