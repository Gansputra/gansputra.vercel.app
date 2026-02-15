"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { useActiveSection } from "@/context/ActiveSectionContext";

export const HeroSection = () => {
    const { setActiveSection } = useActiveSection();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Section-specific Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] -z-10"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[140px] -z-10"
            />

            <motion.div
                className="relative z-10 text-center px-6 mt-12 md:mt-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-secondary font-medium tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 opacity-70"
                >
                    Creative Developer & Editor
                </motion.h2>
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase"
                >
                    CRAFTING <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-x">DIGITAL</span>
                    <br /> REALITIES
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-white/40 text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Merging backend logic with cinematic visual storytelling
                    to create immersive web experiences.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => setActiveSection('projects')}
                        className="group relative overflow-hidden"
                    >
                        <span className="relative z-10">Explore Work</span>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setActiveSection('about')}
                        className="backdrop-blur-md"
                    >
                        Learn More
                    </Button>
                </motion.div>
            </motion.div>

            {/* Bottom transition reveal */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => setActiveSection('amvs')}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/10 hover:text-primary transition-all group flex flex-col items-center gap-3"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold group-hover:tracking-[0.6em] transition-all duration-500">Discover</span>
                <ChevronDown className="group-hover:translate-y-1 transition-transform duration-500" size={18} />
            </motion.button>
        </div>
    );
};
