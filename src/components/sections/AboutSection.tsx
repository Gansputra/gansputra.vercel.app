"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { User, Code, Palette, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
    const skills = [
        { icon: <Code size={20} />, title: "Fullstack Dev", desc: "Crafting scalable architectures with Next.js & Node." },
        { icon: <Palette size={20} />, title: "Creative Design", desc: "Blending aesthetics with functional UX patterns." },
        { icon: <Zap size={20} />, title: "High Performance", desc: "Optimizing for speed and smooth 60FPS motion." },
    ];

    const stats = [
        { label: "Editing Experience", value: "3+", years: "2023 — 2026", color: "text-primary" },
        { label: "Coding Journey", value: "1+", years: "2025 — 2026", color: "text-secondary" },
        { label: "Design Projects", value: "3+", years: "2023 — 2026", color: "text-white" },
    ];

    const [currentStat, setCurrentStat] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative group p-4"
                    >
                        {/* Static Outer Ring */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-secondary rounded-full opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-1000" />

                        <div className="aspect-square rounded-full overflow-hidden glass-morphism p-2 flex items-center justify-center relative border border-white/5 z-10 backdrop-blur-3xl shadow-2xl">
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative bg-black/40">
                                <motion.img
                                    src="/profile.png"
                                    alt="Profile"
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-1000 scale-110 relative z-10"
                                    onLoad={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.parentElement?.querySelector('.placeholder-bg')?.classList.add('opacity-0');
                                    }}
                                />
                                <div className="placeholder-bg absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 transition-opacity duration-700">
                                    <User size={120} className="text-white/5 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Tech Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 right-10 p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-neon z-20 hidden md:block"
                        >
                            <Code className="text-primary" size={24} />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 left-10 p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-neon z-20 hidden md:block"
                        >
                            <Palette className="text-secondary" size={24} />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Behind the Lens <br />& the Code
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-white/60 text-lg mb-8 leading-relaxed max-w-xl">
                            I'm gansputra, a multidisciplinary creative bridging the gap between
                            backend logic and cinematic visuals. My journey started with a passion
                            for storytelling through video editing, which evolved into a career
                            building complex web applications.
                        </motion.p>

                        {/* Experience Stats Carousel */}
                        <motion.div
                            variants={itemVariants}
                            className="mb-12 flex items-center gap-6 px-8 py-6 glass-morphism rounded-3xl border border-white/5 relative overflow-hidden group/stats shadow-xl"
                        >
                            <div className={cn(
                                "absolute top-0 left-0 w-1 h-full transition-colors duration-700",
                                stats[currentStat].color.replace('text-', 'bg-')
                            )} />

                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover/stats:scale-110 transition-transform duration-500">
                                <Zap size={24} />
                            </div>

                            <div className="flex-1">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStat}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={cn("text-4xl font-black tracking-tighter", stats[currentStat].color)}>
                                                {stats[currentStat].value}
                                            </span>
                                            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                                            <span className="text-white font-bold uppercase tracking-widest text-xs leading-tight">
                                                {stats[currentStat].label}
                                            </span>
                                        </div>

                                        <div className="flex flex-col md:items-end">
                                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Timeline</span>
                                            <span className="text-white/80 font-mono text-sm">{stats[currentStat].years}</span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                    className="flex gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] group border border-transparent hover:border-white/5"
                                >
                                    <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-all shadow-lg">
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{skill.title}</h4>
                                        <p className="text-sm text-white/50">{skill.desc}</p>
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
