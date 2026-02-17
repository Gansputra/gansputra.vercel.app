"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

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
        <div className="h-screen w-full flex flex-col items-center justify-center pt-20 relative">
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
                    className="text-5xl md:text-9xl font-black text-foreground mb-8 tracking-tighter leading-[0.85] uppercase"
                >
                    CRAFTING <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-secondary animate-gradient-x">DIGITAL</span>
                    <br /> REALITIES
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-foreground/40 text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
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

                    <MovingBorderButton
                        borderRadius="3rem"
                        onClick={() => setActiveSection('about')}
                        className="bg-card/60 text-foreground border-border font-bold"
                        containerClassName="h-[52px] w-40"
                        borderClassName="bg-[radial-gradient(#00bfcf_40%,#7c7df6_60%,transparent_100%)] opacity-30"
                    >
                        About Me
                    </MovingBorderButton>
                </motion.div>
            </motion.div>

            {/* Bottom transition reveal */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: 1.5 }}
                    onClick={() => setActiveSection('amvs')}
                    className="text-foreground/10 hover:text-primary transition-all group flex items-center gap-3 p-4"
                >
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold group-hover:tracking-[0.6em] transition-all duration-500">Discover</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform duration-500" size={18} />
                </motion.button>
            </div>
        </div>
    );
};
