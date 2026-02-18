"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";
import { HeroGlobe } from "@/components/ui/HeroGlobe";

export const HeroSection = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { setActiveSection } = useActiveSection();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

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
        <div className="h-screen w-full flex flex-col items-center justify-center pt-20 relative overflow-hidden">
            <HeroGlobe />

            <motion.div
                className="relative z-10 text-center px-6 mt-12 md:mt-0 pointer-events-none"
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


                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
                >
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => setActiveSection('projects')}
                        className="group relative overflow-hidden"
                    >
                        <span className="relative z-10">My Work</span>
                    </Button>

                    <MovingBorderButton
                        borderRadius="3rem"
                        onClick={() => setActiveSection('about')}
                        className="bg-card/70 text-foreground border-border font-bold group/about"
                        containerClassName={cn(
                            "h-[52px] w-40 transition-all duration-500",
                            isDark ? "shadow-glow hover:shadow-neon" : "shadow-sm"
                        )}
                        borderClassName={cn(
                            "bg-[radial-gradient(var(--primary)_40%,var(--secondary)_60%,transparent_100%)] h-24 w-24",
                            isDark ? "opacity-70 group-hover/about:opacity-100" : "opacity-0"
                        )}
                    >
                        About Me
                    </MovingBorderButton>
                </motion.div>
            </motion.div>

            {/* Bottom transition reveal */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: 1.5 }}
                    onClick={() => setActiveSection('amvs')}
                    className="text-foreground/10 hover:text-primary transition-all group flex items-center gap-3 p-4 pointer-events-auto"
                >
                </motion.button>
            </div>
        </div>
    );
};
