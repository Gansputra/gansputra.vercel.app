"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { useSettings } from "@/context/SettingsContext";

export const MouseGlow = () => {
    const { activeSection } = useActiveSection();
    const { reducedMotion } = useSettings();
    const isGlowVisible = !reducedMotion && (activeSection === "hero" || activeSection === "contact");

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <AnimatePresence>
            {isGlowVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-transparent"
                        style={{
                            background: `radial-gradient(800px circle at ${springX}px ${springY}px, rgba(120, 119, 198, 0.15), transparent 80%)`,
                            mixBlendMode: 'plus-lighter'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
