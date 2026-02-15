"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Palette, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
    const skills = [
        { icon: <Code />, title: "Fullstack Dev", desc: "Crafting scalable architectures with Next.js & Node." },
        { icon: <Palette />, title: "Creative Design", desc: "Blending aesthetics with functional UX patterns." },
        { icon: <Zap />, title: "High Performance", desc: "Optimizing for speed and smooth 60FPS motion." },
    ];

    const stats = [
        { label: "Editing Experience", value: "3+", years: "2023 — 2026", color: "text-primary" },
        { label: "Coding Journey", value: "1+", years: "2025 — 2026", color: "text-secondary" },
        { label: "Design Projects", value: "3+", years: "2023 — 2026", color: "text-white" },
    ];

    const [currentStat, setCurrentStat] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="about" className="py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group p-4"
                    >
                        {/* Static Outer Ring */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-secondary rounded-full opacity-30 group-hover:opacity-60 blur-sm transition-opacity" />

                        <div className="aspect-square rounded-full overflow-hidden glass-morphism p-2 flex items-center justify-center relative border border-white/10 z-10 backdrop-blur-2xl">
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative bg-black/40">
                                <img
                                    src="/profile.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 relative z-10"
                                    onLoad={(e) => {
                                        e.currentTarget.parentElement?.querySelector('.placeholder-bg')?.classList.add('opacity-0');
                                    }}
                                />
                                <div className="placeholder-bg absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity duration-500">
                                    <User size={120} className="text-white/10 animate-pulse" />
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">Behind the Lens <br />& the Code</h2>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed">
                            I'm gansputra, a multidisciplinary creative bridging the gap between
                            backend logic and cinematic visuals. My journey started with a passion
                            for storytelling through video editing, which evolved into a career
                            building complex web applications.
                        </p>

                        {/* Experience Stats - Full Width & Detailed */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12 flex items-center gap-6 px-8 py-6 glass-morphism rounded-3xl border border-white/10 relative overflow-hidden group/stats"
                        >
                            {/* Decorative Background Glow */}
                            <div className={cn(
                                "absolute top-0 left-0 w-1 h-full transition-colors duration-500",
                                stats[currentStat].color.replace('text-', 'bg-')
                            )} />

                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover/stats:scale-110 transition-transform">
                                <Zap size={24} />
                            </div>

                            <div className="flex-1">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStat}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
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

                                        <div className="flex flex-col items-end">
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
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{skill.title}</h4>
                                        <p className="text-sm text-white/50">{skill.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};
