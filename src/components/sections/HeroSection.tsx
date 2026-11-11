"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDown, ArrowUpRight, Play, Sparkles, Code2, Film } from "lucide-react";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const HeroSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 relative overflow-hidden">
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Prestige Subtitle / Pill Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 border border-border/70 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-[11px] md:text-xs font-mono font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Fullstack Developer & Motion Artist
          </span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 tracking-tighter leading-[0.95] uppercase"
        >
          CRAFTING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-secondary animate-gradient-x">
            DIGITAL EXPERIENCES
          </span>
          <br /> & MOTION ART
        </motion.h1>

        {/* Value Proposition Description */}
        <motion.p
          variants={itemVariants}
          className="text-foreground/70 text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-normal"
        >
          I'm <span className="font-semibold text-foreground">Gansputra</span>. Bridging high-performance modern web engineering with cinematic video editing and graphic identity.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 w-full"
        >
          <Button
            size="lg"
            variant="secondary"
            onClick={() => scrollTo("projects")}
            className="group relative cursor-pointer px-8 py-3.5 shadow-neon hover:shadow-neon/80"
          >
            <Code2 size={18} className="text-primary-foreground group-hover:rotate-12 transition-transform" />
            <span>Explore Projects</span>
            <ArrowUpRight size={16} className="text-primary-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("amvs")}
            className="group relative cursor-pointer px-8 py-3.5 bg-card/50 backdrop-blur-md border-border/80 hover:border-primary/50"
          >
            <Film size={18} className="text-primary group-hover:scale-110 transition-transform" />
            <span>Watch AMVs</span>
          </Button>

          <Button
            size="lg"
            variant="ghost"
            onClick={() => scrollTo("contact")}
            className="group relative cursor-pointer px-6 py-3.5 hover:bg-card/40"
          >
            <span>Let's Talk</span>
          </Button>
        </motion.div>

        {/* Micro Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-14 pt-8 border-t border-border/40 grid grid-cols-3 gap-6 sm:gap-12 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-black text-foreground">3+</div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">Years Editing</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-primary">Next.js</div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">Tech Stack</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-foreground">100%</div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">Audio Reactive</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Smooth Scroll to Explore Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 flex flex-col items-center justify-center cursor-pointer group"
        onClick={() => scrollTo("amvs")}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/70 group-hover:text-primary transition-colors mb-2">
          Scroll To Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-border/70 flex items-start justify-center p-1.5 group-hover:border-primary transition-colors"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
};
