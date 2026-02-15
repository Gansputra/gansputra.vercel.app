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
        { label: "Editing", value: "3+", color: "text-primary" },
        { label: "Coding", value: "1+", color: "text-secondary" },
        { label: "Designing", value: "3+", color: "text-white" },
    ];

    const [currentStat, setCurrentStat] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group p-4"
                    >
                        {/* Rotating Outer Ring (Cyberpunk Style) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-secondary rounded-full animate-spin-slow opacity-30 group-hover:opacity-100 blur-sm transition-opacity" />

                        <div className="aspect-square rounded-full overflow-hidden glass-morphism p-2 flex items-center justify-center relative border border-white/10 z-10 backdrop-blur-2xl">
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative bg-black/40">
                                <img
                                    src="/profile.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 relative z-10"
                                    onLoad={(e) => {
                                        e.currentTarget.parentElement?.querySelector('.placeholder-bg')?.classList.add('opacity-0');
                                    }}
                                />
                                <div className="placeholder-bg absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity duration-500">
                                    <User size={120} className="text-white/10 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Rotating floating stats */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute -bottom-2 -right-2 md:-bottom-2 md:-right-2 p-5 glass-morphism rounded-2xl shadow-2xl animate-float z-20 border border-white/10 backdrop-blur-3xl min-w-[140px]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStat}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <p className={cn("text-3xl font-black mb-1", stats[currentStat].color)}>
                                        {stats[currentStat].value}
                                    </p>
                                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest leading-tight">
                                        Years <br /> {stats[currentStat].label}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">Behind the Lens <br />& the Code</h2>
                        <p className="text-white/60 text-lg mb-10 leading-relaxed">
                            I'm gansputra, a multidisciplinary creative bridging the gap between
                            backend logic and cinematic visuals. My journey started with a passion
                            for storytelling through video editing, which evolved into a career
                            building complex web applications.
                        </p>

                        <div className="space-y-6">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
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
        </section>
    );
};
