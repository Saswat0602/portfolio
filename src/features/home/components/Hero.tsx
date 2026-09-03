"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { userData } from "@/lib/data";

export function Hero() {
  const topSkills = ["React", "React Native", "Node.js", "TypeScript", "Next.js"];

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-12">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-image-gradient-fade z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[350px] md:h-[450px] bg-[#3b82f6]/15 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute -top-10 left-1/4 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#121212]/80 backdrop-blur-md mb-8 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#3b82f6]">
            <Terminal size={14} />
            <span>{userData.about.current_position}</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-1 text-xs font-mono text-[#a3a3a3]">
            <MapPin size={12} className="text-[#f59e0b]" />
            <span>{userData.location}</span>
          </div>
        </motion.div>

        {/* Main Title & Personal Name */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mb-6"
        >
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-[#3b82f6] font-semibold mb-2">
            {userData.title}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-[#f5f5f5]">
            {userData.name}
          </h1>
        </motion.div>

        {/* Introduction Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-[#a3a3a3] mb-8 leading-relaxed font-light"
        >
          {userData.introduction}{" "}
          <span className="text-[#f5f5f5] font-normal">
            Specializing in crafting responsive user interfaces and robust backend architectures.
          </span>
        </motion.p>

        {/* Highlight Skills Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/5 text-[#a3a3a3]"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/projects"
            className="group relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#3b82f6] text-[#0a0a0a] font-semibold transition-all hover:bg-[#60a5fa] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore {userData.Projects.length} Projects</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-[#121212]/50 backdrop-blur-md text-[#f5f5f5] font-medium transition-all hover:bg-[#1f1f1f] hover:border-white/20"
          >
            <Sparkles size={16} className="text-[#f59e0b]" />
            <span>Get in Touch</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
