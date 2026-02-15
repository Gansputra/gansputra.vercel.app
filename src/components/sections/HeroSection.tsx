"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-secondary font-medium tracking-[0.2em] uppercase text-sm mb-4">
                        Creative Developer & Editor
                    </h2>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
                        CRAFTING <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">DIGITAL</span>
                        <br /> EXPERIENCES
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Building fast web experiences and cinematic visual storytelling.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" variant="secondary">
                            View Projects
                        </Button>
                        <Button size="lg" variant="outline">
                            About Me
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            >
                <ChevronDown className="animate-bounce" />
            </motion.div>
        </section>
    );
};
