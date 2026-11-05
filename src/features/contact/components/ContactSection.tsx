"use client";

import { useState, useEffect } from "react";
import { userData } from "@/lib/data";
import {
  Mail,
  Copy,
  Check,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Clock,
  MapPin,
  Sparkles,
  Compass,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

export interface ContactSectionProps {
  isStandalone?: boolean;
}

interface TopicPreset {
  id: string;
  label: string;
  badge: string;
  subject: string;
  starterBody: string;
}

const TOPIC_PRESETS: TopicPreset[] = [
  {
    id: "fullstack",
    label: "Full Stack & AI Role",
    badge: "💼 Hiring",
    subject: "Full Stack & AI Engineer Opportunity",
    starterBody: `Hi Saswat,\n\nI reviewed your portfolio and would like to speak with you regarding an engineering opportunity.\n\nCompany / Team: \nRole Scope: \nTimeline: \n\nLooking forward to connecting!`,
  },
  {
    id: "bedrock",
    label: "AWS Bedrock / RAG",
    badge: "🤖 Generative AI",
    subject: "AWS Bedrock & Enterprise RAG Pipeline Project",
    starterBody: `Hi Saswat,\n\nWe are looking to architect a generative AI solution with AWS Bedrock, vector search, and agentic workflows.\n\nProject Scope: \nKey Objectives: \n\nBest regards,`,
  },
  {
    id: "mobile",
    label: "Mobile App Development",
    badge: "📱 React Native",
    subject: "Mobile Application Engineering (React Native)",
    starterBody: `Hi Saswat,\n\nI would like to discuss building a cross-platform mobile application with React Native.\n\nApp Concept: \nTarget Platforms: iOS & Android\n\nThanks!`,
  },
  {
    id: "collab",
    label: "Technical Advisory / Chat",
    badge: "⚡ Technical Chat",
    subject: "Technical Architecture & Collaboration",
    starterBody: `Hi Saswat,\n\nI would love to connect and chat about technical architecture, system design, or engineering collaboration.\n\nDiscussion Topic: \n\nCheers,`,
  },
];

export function ContactSection({ isStandalone = false }: ContactSectionProps) {
  const { aesthetic } = useAestheticTheme();
  const [copied, setCopied] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("fullstack");
  const [localTime, setLocalTime] = useState<string>("");

  const selectedTopic =
    TOPIC_PRESETS.find((t) => t.id === selectedTopicId) || TOPIC_PRESETS[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: TOPIC_PRESETS[0].subject,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Live Indian Standard Time (IST) clock for clean location widget
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback handled gracefully
    }
  };

  const handleSelectTopic = (topic: TopicPreset) => {
    setSelectedTopicId(topic.id);
    setFormData((prev) => ({
      ...prev,
      subject: topic.subject,
    }));
  };

  // Structured mailto with topic subject and starter template body
  const mailtoSubject = encodeURIComponent(formData.subject || selectedTopic.subject);
  const mailtoBody = encodeURIComponent(
    formData.message ? formData.message : selectedTopic.starterBody
  );
  const mailtoUrl = `mailto:${userData.about.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: selectedTopic.subject,
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please email directly."
      );
    }
  };

  const content = (
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div
        className={`flex flex-col mb-8 sm:mb-10 ${
          isStandalone ? "items-start text-left" : "items-center text-center"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-xs font-mono uppercase tracking-wider mb-4">
          {aesthetic === "blueprint" ? <Compass size={13} /> : <Sparkles size={13} />}
          <span>{aesthetic === "blueprint" ? "TELEMETRY // DIRECT_CONNECTION" : "Direct Connection Hub"}</span>
        </div>

        {isStandalone ? (
          <h1 className={`text-4xl sm:text-5xl md:text-6xl text-theme-primary tracking-tight mb-4 ${
            aesthetic === "editorial" ? "font-serif font-normal" : "font-sans font-black"
          }`}>
            Let&apos;s Build{" "}
            <span className={aesthetic === "editorial" ? "italic text-theme-accent" : "text-theme-accent"}>
              Something Great
            </span>
          </h1>
        ) : (
          <h2 className={`text-3xl sm:text-4xl md:text-5xl text-theme-primary tracking-tight mb-4 ${
            aesthetic === "editorial" ? "font-serif font-normal" : "font-sans font-black"
          }`}>
            Let&apos;s Build{" "}
            <span className={aesthetic === "editorial" ? "italic text-theme-accent" : "text-theme-accent"}>
              Something Great
            </span>
          </h2>
        )}

        <p className="max-w-2xl text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          {userData.contact.message}
        </p>
      </div>

      {/* Modern Location & Status Bar */}
      <div
        className={`flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono mb-10 sm:mb-12 ${
          isStandalone ? "justify-start" : "justify-center"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-md text-theme-secondary shadow-xs">
          <MapPin size={13} className="text-amber-500" />
          <span>Bhubaneswar, India</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-md text-theme-secondary shadow-xs">
          <Clock size={13} className="text-theme-accent" />
          <span>{localTime || "IST (UTC+5:30)"}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Worldwide Remote &amp; Relocation Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Flagship "Email Me" Command Center */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-7 sm:p-8 rounded-3xl border border-theme-border bg-theme-surface/95 backdrop-blur-xl relative overflow-hidden shadow-xl">
            {/* Ambient blur */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-theme-accent/15 blur-[60px] pointer-events-none rounded-full" />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-theme-accent-subtle border border-theme-border flex items-center justify-center text-theme-accent shadow-xs">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-theme-accent font-bold block">
                    Direct Email
                  </span>
                  <span className="text-xs text-theme-muted font-light">Primary Contact Method</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-theme-border bg-theme-accent-subtle text-theme-accent text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-pulse" />
                <span>Inbox Ready</span>
              </span>
            </div>

            {/* Prominent Email Address */}
            <div className="mb-5 p-3.5 rounded-xl border border-theme-border bg-theme-surface-elevated/70 backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase text-theme-muted block mb-1">
                Direct Inbox Address
              </span>
              <a
                href={mailtoUrl}
                className="text-base sm:text-lg font-mono font-bold text-theme-primary hover:text-theme-accent transition-colors break-all flex items-center gap-2 group"
                title="Click to write an email"
              >
                <span>{userData.about.email}</span>
                <ArrowUpRight
                  size={16}
                  className="text-theme-muted group-hover:text-theme-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                />
              </a>
            </div>

            {/* Action Buttons: Email Me & Copy Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold font-mono hover:brightness-110 active:scale-[0.98] transition-all shadow-sm"
              >
                <Mail size={15} />
                <span>Email Me</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-xs font-mono transition-all active:scale-[0.98] cursor-pointer ${
                  copied
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-500 shadow-xs"
                    : "border-theme-border bg-theme-surface-elevated hover:bg-theme-hover hover:border-theme-accent text-theme-primary"
                }`}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-500" />
                    <span className="font-semibold text-emerald-500">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} className="text-theme-muted" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Conversation Starter Chips */}
            <div className="pt-5 border-t border-theme-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-theme-secondary font-semibold block">
                  Select a Conversation Topic:
                </span>
                <span className="text-[10px] font-mono text-theme-muted">
                  Pre-fills subject &amp; starter
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOPIC_PRESETS.map((topic) => {
                  const isSelected = selectedTopicId === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleSelectTopic(topic)}
                      className={`text-left p-2.5 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                        isSelected
                          ? "border-theme-accent bg-theme-accent-subtle text-theme-accent font-semibold shadow-xs"
                          : "border-theme-border bg-theme-surface-elevated/40 hover:bg-theme-hover text-theme-secondary"
                      }`}
                    >
                      <div className="text-[10px] text-theme-accent font-semibold mb-0.5">
                        {topic.badge}
                      </div>
                      <div className="truncate text-[11px] font-medium">{topic.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verified Engineering Profiles */}
            <div className="mt-6 pt-5 border-t border-theme-border">
              <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted font-semibold block mb-3">
                Verified Engineering Profiles
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/Saswat0602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40 hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-secondary hover:text-theme-primary transition-all group"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight
                    size={11}
                    className="text-theme-muted group-hover:text-theme-primary transition-colors"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/saswat0602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated/40 hover:bg-theme-hover hover:border-theme-accent text-xs font-mono text-theme-secondary hover:text-theme-primary transition-all group"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight
                    size={11}
                    className="text-theme-muted group-hover:text-theme-primary transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Note Console (Form) */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-9 rounded-3xl border border-theme-border bg-theme-surface/95 backdrop-blur-xl shadow-xl relative">
            <div className="mb-6">
              <h3 className={`text-xl sm:text-2xl font-bold text-theme-primary mb-2 ${
                aesthetic === "editorial" ? "font-serif font-normal" : "font-sans"
              }`}>
                Send a Direct Note
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-light">
                Prefer to write right here? Leave your message below and it will land straight in my inbox.
              </p>
            </div>

            {/* Selected Topic Synchronizer Banner */}
            <div className="mb-5 p-3 rounded-xl border border-theme-border bg-theme-accent-subtle flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-theme-secondary">
                <span className="text-theme-accent font-semibold">Active Topic:</span>
                <span className="text-theme-primary font-medium">
                  {selectedTopic.badge} {selectedTopic.label}
                </span>
              </div>
              <span className="text-[10px] text-theme-muted hidden sm:inline">
                Synced with topic chips
              </span>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4 shadow-sm">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className={`text-xl font-bold text-theme-primary mb-2 ${
                  aesthetic === "editorial" ? "font-serif font-normal" : "font-sans"
                }`}>
                  Note Received Successfully
                </h4>
                <p className="text-xs sm:text-sm text-theme-secondary max-w-sm mb-6 leading-relaxed">
                  Thank you for reaching out! Your message has been safely delivered to my inbox and I will respond to you promptly.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-5 py-2.5 rounded-xl bg-theme-surface-elevated hover:bg-theme-hover border border-theme-border text-xs font-mono text-theme-primary transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                  <a
                    href={mailtoUrl}
                    className="px-5 py-2.5 rounded-xl border border-theme-accent/40 bg-theme-accent-subtle hover:bg-theme-accent/20 text-xs font-mono text-theme-accent transition-colors inline-flex items-center gap-1.5"
                  >
                    <Mail size={13} />
                    <span>Email Me Directly</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                {status === "error" && (
                  <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} className="flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={mailtoUrl}
                      className="text-xs font-mono text-theme-accent underline hover:brightness-125"
                    >
                      Email directly
                    </a>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-theme-muted">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="px-4 py-3 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs font-mono text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent/30 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-theme-muted">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. jane@company.com"
                      className="px-4 py-3 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs font-mono text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono text-theme-muted">
                    Subject Line
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Subject of your message"
                    className="px-4 py-3 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs font-mono text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent/30 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-theme-muted">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, role, or technical objectives..."
                    className="px-4 py-3 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs font-mono text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent/30 transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-theme-accent text-white dark:text-zinc-950 text-xs font-bold font-mono hover:brightness-110 disabled:opacity-50 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
                >
                  <Send size={14} />
                  <span>
                    {status === "submitting" ? "Delivering Message..." : "Send Message Note"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isStandalone) {
    return <div className="w-full text-theme-primary">{content}</div>;
  }

  return (
    <section
      id="contact"
      className="w-full py-24 px-6 sm:px-8 bg-theme-base text-theme-primary relative z-10 border-t border-theme-border transition-colors duration-300"
    >
      {content}
    </section>
  );
}
