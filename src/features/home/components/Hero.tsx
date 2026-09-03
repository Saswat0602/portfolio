"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-image-gradient-fade z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong bg-bg-elevated/50 backdrop-blur-md mb-8"
        >
          <Terminal size={16} className="text-accent" />
          <span className="text-sm font-mono text-text-secondary">Software Engineer & Builder</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-primary"
        >
          Crafting digital 
          <span className="block mt-2 text-transparent bg-clip-text bg-image-gradient-accent drop-shadow-sm">
            experiences that matter.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-text-secondary mb-10 leading-relaxed"
        >
          I specialize in building scalable web applications with Next.js, React, and modern web technologies. Focused on performance, design, and user experience.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="group relative flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-accent text-text-inverse font-medium transition-all hover:bg-accent-hover hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0">
            View Projects
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="px-8 py-3 rounded-md border border-border-strong text-text-primary font-medium transition-all hover:bg-bg-hover hover:border-text-tertiary">
            Contact Me
          </button>
        </motion.div>

      </div>
    </section>
  );
}
