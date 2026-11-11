"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { User, Code, Palette, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
  const skills = [
    {
      icon: <Code size={20} />,
      title: "Fullstack Architecture",
      desc: "Engineering high-performance web applications with Next.js, React, TypeScript, and modern backend logic.",
    },
    {
      icon: <Palette size={20} />,
      title: "Cinematic Motion & AMV",
      desc: "3+ years of After Effects video storytelling, flow synchronization, complex VFX, and color grading.",
    },
    {
      icon: <Zap size={20} />,
      title: "Creative Art & Graphic Identity",
      desc: "Designing bold anime posters, typography, and visual assets tailored for creators and brands.",
    },
  ];

  const stats = [
    { label: "AMV & Video Editing", value: "3+ Years", timeline: "2023 — Present", color: "text-primary" },
    { label: "Software Engineering", value: "1+ Years", timeline: "2025 — Present", color: "text-secondary" },
    { label: "Digital Art & GFX", value: "3+ Years", timeline: "2023 — Present", color: "text-foreground" },
  ];

  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [stats.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Avatar with Ambient Halo & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center p-4"
          >
            {/* Ambient Multi-Hue Ring */}
            <div className="absolute inset-4 bg-gradient-to-tr from-primary/30 via-secondary/20 to-primary/10 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />

            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-full p-3 bg-card/60 backdrop-blur-2xl border border-border/80 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-black/40 border border-white/10 group">
                <motion.img
                  src="/profile.png"
                  alt="Gansputra Profile"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover scale-105"
                />
              </div>

              {/* Floating Code Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 right-6 px-4 py-2 bg-card/90 backdrop-blur-xl rounded-2xl border border-border shadow-neon flex items-center gap-2"
              >
                <Code className="text-primary" size={18} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">Developer</span>
              </motion.div>

              {/* Floating Motion Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 left-6 px-4 py-2 bg-card/90 backdrop-blur-xl rounded-2xl border border-border shadow-neon flex items-center gap-2"
              >
                <Palette className="text-secondary" size={18} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">Motion Artist</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio & Experience Metrics */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold uppercase tracking-wider">
                <User size={14} />
                <span>Biography & Vision</span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tighter uppercase leading-tight"
            >
              Behind the Lens <br />& the Code
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              I&apos;m <span className="text-foreground font-semibold">Gansputra</span>, a multidisciplinary creative bridging software engineering with cinematic digital art. My journey began with a passion for video storytelling and kinetic editing, which evolved into building responsive, scalably architected web experiences.
            </motion.p>

            {/* Rotating Stats Bento Card */}
            <motion.div
              variants={itemVariants}
              className="mb-8 p-6 rounded-3xl bg-card/80 border border-border/80 shadow-xl backdrop-blur-xl relative overflow-hidden"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0">
                  <Zap size={24} />
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStat}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className={cn("text-2xl sm:text-3xl font-black tracking-tight", stats[currentStat].color)}>
                          {stats[currentStat].value}
                        </div>
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                          {stats[currentStat].label}
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest block">
                          Timeline
                        </span>
                        <span className="text-xs font-mono font-medium text-foreground">
                          {stats[currentStat].timeline}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Core Competencies List */}
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-card/40 hover:bg-card/80 border border-border/50 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="p-3 bg-muted rounded-xl text-primary flex-shrink-0 mt-0.5">
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm sm:text-base mb-1">
                      {skill.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
