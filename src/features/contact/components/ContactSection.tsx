"use client";

import { useState, useEffect } from "react";
import { userData } from "@/lib/data";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  MapPin,
  Compass,
  Briefcase,
  Cpu,
  MessageSquare,
  Globe,
  Terminal,
  MessageCircle,
  FileText,
  Rocket,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

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
    label: "Full-Time Engineering Role",
    badge: "Full-Time / SDE",
    icon: Briefcase,
    subject: "Full-Stack & Applied AI Engineer Opportunity",
    starterBody: `Hi Saswat,\n\nI reviewed your portfolio and would like to speak with you regarding an engineering opportunity with our team.\n\nCompany / Team: \nRole Scope: Full-Stack & Applied AI (SDE)\nLocation / Setup: Remote / Hybrid\nTimeline: \n\nLooking forward to connecting!`,
  },
  {
    id: "freelance",
    label: "Freelance & Contract Project",
    badge: "Freelance / MVP / Contract",
    icon: Rocket,
    subject: "Freelance Project & Contract Development Inquiry",
    starterBody: `Hi Saswat,\n\nI would like to hire you for a freelance project / contract development.\n\nProject Scope: (Web Platform / Mobile App / AI Integration / MVP)\nKey Deliverables: \nTarget Timeline & Budget: \n\nLet me know your availability!`,
  },
  {
    id: "ai-agents",
    label: "Claude Code & Agentic Systems",
    badge: "Applied AI & Copilots",
    icon: Cpu,
    subject: "Agentic AI & LLM Systems Collaboration",
    starterBody: `Hi Saswat,\n\nI am interested in your work with Claude Code, multi-agent co-work architectures, AWS Bedrock, and pgvector RAG.\n\nProject Scope: \nKey Requirements: \nTarget Timeline: \n\nBest regards,`,
  },
  {
    id: "advisory",
    label: "Technical Advisory & Consultation",
    badge: "Advisory & Consultation",
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

  // Live Indian Standard Time (IST) clock for location widget
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
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div
        className={`flex flex-col mb-8 sm:mb-10 ${
          isStandalone ? "items-start text-left" : "items-center text-center"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4 font-medium">
          <Compass size={13} className="flex-shrink-0" />
          <span>Direct Communication Hub</span>
        </div>

        {isStandalone ? (
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans text-theme-primary tracking-tight mb-3 sm:mb-4 break-words">
            Let&apos;s Build{" "}
            <span className="text-theme-accent">Something Great</span>
          </h1>
        ) : (
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-sans text-theme-primary tracking-tight mb-3 sm:mb-4 break-words">
            Let&apos;s Build{" "}
            <span className="text-theme-accent">Something Great</span>
          </h2>
        )}

        <p className="max-w-2xl text-xs sm:text-sm md:text-base text-theme-secondary font-light leading-relaxed px-2">
          {userData.contact.message}
        </p>
      </div>

      {/* Location & Status Bar */}
      <div
        className={`flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono mb-8 sm:mb-12 max-w-full ${
          isStandalone ? "justify-start" : "justify-center"
        }`}
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-md text-theme-secondary shadow-xs text-[11px] sm:text-xs">
          <MapPin size={13} className="text-theme-accent flex-shrink-0" />
          <span>Bhubaneswar, India</span>
        </div>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-md text-theme-secondary shadow-xs text-[11px] sm:text-xs">
          <Clock size={13} className="text-theme-accent flex-shrink-0" />
          <span>{localTime || "IST (UTC+5:30)"}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-md text-theme-secondary shadow-xs text-[11px] sm:text-xs">
          <Globe size={13} className="text-theme-accent flex-shrink-0" />
          <span>Worldwide Remote • Full-Time &amp; Freelance Ready</span>
        </div>
      </div>

      {/* Main 2-Column Command Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
        {/* Left Column: Direct Verified Channels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
          {/* Direct Email Card */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-theme-border bg-theme-surface/95 backdrop-blur-xl relative overflow-hidden shadow-xl">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-theme-accent/15 blur-[60px] pointer-events-none rounded-full" />

            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-theme-accent-subtle border border-theme-border flex items-center justify-center text-theme-accent shadow-xs flex-shrink-0">
                  <Mail size={17} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-bold block truncate">
                    Direct Email
                  </span>
                  <span className="text-xs text-theme-muted font-light">Full-Time &amp; Freelance Inbound</span>
                </div>
              </div>

              <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-[10px] font-mono font-medium flex-shrink-0">
                Inbox Monitored
              </span>
            </div>

            {/* Email Address Link */}
            <div className="mb-4 sm:mb-5 p-3.5 rounded-xl border border-theme-border bg-theme-surface-elevated/70 backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase text-theme-muted block mb-1">
                Direct Inbox Address
              </span>
              <a
                href={mailtoUrl}
                className="text-sm sm:text-base md:text-lg font-mono font-bold text-theme-primary hover:text-theme-accent transition-colors break-all flex items-center gap-2 group"
                title="Click to write an email"
              >
                <span className="truncate">{userData.about.email}</span>
                <ArrowUpRight
                  size={16}
                  className="text-theme-muted group-hover:text-theme-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                />
              </a>
            </div>

            {/* 1-Click Primary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-5">
              <a
                href={mailtoUrl}
                className="btn-sheen inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold font-mono hover:brightness-110 active:scale-[0.98] transition-all shadow-sm w-full min-h-[44px]"
              >
                <Mail size={15} />
                <span>Email Me</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono transition-all active:scale-[0.98] cursor-pointer w-full min-h-[44px] ${
                  copiedEmail
                    ? "border-theme-accent bg-theme-accent-subtle text-theme-accent shadow-xs"
                    : "border-theme-border bg-theme-surface-elevated hover:bg-theme-hover hover:border-theme-accent text-theme-primary"
                }`}
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check size={15} className="text-theme-accent" />
                    <span className="font-semibold text-theme-accent">Copied Email!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} className="text-theme-muted" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Line & WhatsApp Card */}
            <div className="p-3.5 rounded-xl border border-theme-border bg-theme-surface-elevated/70 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <span className="text-[10px] font-mono uppercase text-theme-muted block mb-0.5">
                  Direct Line &amp; WhatsApp
                </span>
                <a
                  href={`tel:${userData.about.phone}`}
                  className="text-sm font-mono font-bold text-theme-primary hover:text-theme-accent transition-colors"
                >
                  {userData.about.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-medium transition-colors"
                  title="Chat directly on WhatsApp"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp</span>
                  <ArrowUpRight size={10} className="opacity-70" />
                </a>

                <a
                  href={`tel:${userData.about.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-hover text-theme-primary text-xs font-mono transition-colors"
                >
                  <span>Call</span>
                </a>
              </div>
            </div>

            {/* Verified External Profiles */}
            <div className="pt-4 border-t border-theme-border">
              <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted font-semibold block mb-2.5">
                Verified Professional Networks
              </span>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/Saswat0602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40 hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-secondary hover:text-theme-primary transition-all group"
                  title="View GitHub Profile"
                >
                  <GithubIcon size={13} />
                  <span className="truncate">GitHub</span>
                  <ArrowUpRight size={10} className="text-theme-muted group-hover:text-theme-primary transition-colors flex-shrink-0" />
                </a>

                <a
                  href="https://www.linkedin.com/in/saswat0602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40 hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-secondary hover:text-theme-primary transition-all group"
                  title="Connect on LinkedIn"
                >
                  <LinkedinIcon size={13} />
                  <span className="truncate">LinkedIn</span>
                  <ArrowUpRight size={10} className="text-theme-muted group-hover:text-theme-primary transition-colors flex-shrink-0" />
                </a>

                <a
                  href="/saswat_ranjan_mohanty.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40 hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-secondary hover:text-theme-primary transition-all group"
                  title="View Resume PDF"
                >
                  <FileText size={13} />
                  <span className="truncate">Resume</span>
                  <ArrowUpRight size={10} className="text-theme-muted group-hover:text-theme-primary transition-colors flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Smart Mail & Message Composer (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-theme-border bg-theme-surface/95 backdrop-blur-xl shadow-xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-theme-primary tracking-tight">
                  Draft &amp; Launch a Message
                </h3>
              </div>
            </div>

            {/* Conversation Topic Selector */}
            <div className="mb-5 sm:mb-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-theme-secondary font-semibold block mb-2.5">
                1. Select Conversation Topic:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {TOPIC_PRESETS.map((topic) => {
                  const isSelected = selectedTopicId === topic.id;
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleSelectTopic(topic)}
                      className={`text-left p-3 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                        isSelected
                          ? "border-theme-accent bg-theme-accent-subtle text-theme-accent font-semibold shadow-xs"
                          : "border-theme-border bg-theme-surface-elevated/40 hover:bg-theme-hover text-theme-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-theme-accent font-semibold mb-1">
                        <Icon size={12} className="flex-shrink-0" />
                        <span>{topic.badge}</span>
                      </div>
                      <div className="truncate text-xs font-medium text-theme-primary">
                        {topic.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Terminal / Editor Draft Window */}
            <div className="mb-5 sm:mb-6 rounded-xl border border-theme-border bg-theme-surface-elevated/90 overflow-hidden shadow-inner">
              {/* Window Header */}
              <div className="px-4 py-2.5 border-b border-theme-border bg-theme-surface/80 flex items-center justify-between text-xs font-mono text-theme-muted">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-theme-secondary font-medium ml-2 flex items-center gap-1">
                    <Terminal size={12} className="text-theme-accent" />
                    <span>message_draft.eml</span>
                  </span>
                </div>

                <span className="text-[10px] text-theme-muted font-mono">
                  Live Synced
                </span>
              </div>

              {/* Draft Content Fields */}
              <div className="p-4 sm:p-5 flex flex-col gap-3.5">
                {/* To: Destination */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs font-mono">
                  <span className="text-theme-muted uppercase tracking-wider text-[10px] sm:w-16">
                    To:
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-theme-surface border border-theme-border text-theme-primary font-semibold text-xs inline-block">
                    {userData.about.email}
                  </span>
                </div>

                {/* Subject Line */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs font-mono">
                  <span className="text-theme-muted uppercase tracking-wider text-[10px] sm:w-16">
                    Subject:
                  </span>
                  <input
                    type="text"
                    value={draftSubject}
                    onChange={(e) => setDraftSubject(e.target.value)}
                    placeholder="Subject line"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface text-xs font-mono text-theme-primary focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent/30 transition-colors"
                  />
                </div>

                {/* Message Body */}
                <div className="flex flex-col gap-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-[10px] text-theme-muted uppercase tracking-wider">
                    <span>Message Body (Editable):</span>
                    <span className="text-theme-secondary lowercase font-mono">
                      {draftBody.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={7}
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-lg border border-theme-border bg-theme-surface text-xs font-mono text-theme-primary focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent/30 transition-colors resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Action CTAs: Launch in Email / Copy Draft */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={mailtoUrl}
                className="btn-sheen flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold font-mono hover:brightness-110 active:scale-[0.99] transition-all shadow-sm min-h-[46px]"
              >
                <Mail size={15} />
                <span>Launch in Your Email App</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                type="button"
                onClick={handleCopyDraft}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border text-xs font-mono transition-all active:scale-[0.99] cursor-pointer min-h-[46px] ${
                  copiedDraft
                    ? "border-theme-accent bg-theme-accent-subtle text-theme-accent shadow-xs"
                    : "border-theme-border bg-theme-surface-elevated hover:bg-theme-hover text-theme-primary"
                }`}
                title="Copy drafted text to clipboard"
              >
                {copiedDraft ? (
                  <>
                    <Check size={14} className="text-theme-accent" />
                    <span className="font-semibold text-theme-accent">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-theme-muted" />
                    <span>Copy Draft</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono transition-colors min-h-[46px]"
                title="Send as WhatsApp chat"
              >
                <MessageCircle size={15} />
                <span className="hidden sm:inline">WhatsApp</span>
                <ArrowUpRight size={11} className="opacity-70" />
              </a>
            </div>
          </div>
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
      className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary relative z-10 border-t border-theme-border transition-colors duration-300 max-w-full overflow-hidden"
    >
      {content}
    </section>
  );
}
