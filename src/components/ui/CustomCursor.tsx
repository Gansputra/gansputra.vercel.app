"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";
import { useTheme } from "next-themes";

export const CustomCursor = () => {
    const { reducedMotion } = useSettings();
    const { resolvedTheme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isWhite, setIsWhite] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            // Only disable for small screens, ignore touch support for laptops
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('data-cursor') === 'hover';

            const forceWhite = target.closest('[data-cursor="white"]') !== null;

            setIsHovered(!!isInteractive);
            setIsWhite(forceWhite);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    useEffect(() => {
        if (!isMobile && !reducedMotion) {
            document.documentElement.classList.add('custom-cursor-active');
        } else {
            document.documentElement.classList.remove('custom-cursor-active');
        }

        return () => {
            document.documentElement.classList.remove('custom-cursor-active');
        };
    }, [isMobile, reducedMotion]);

    if (!mounted || isMobile || reducedMotion) return null;

    const cursorColor = (resolvedTheme === 'dark' || isWhite) ? '#ffffff' : '#000000';

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        style={{
                            translateX: cursorXSpring,
                            translateY: cursorYSpring,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: isHovered ? 45 : 0
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="relative flex items-center justify-center w-0 h-0"
                    >
                        {/* Vertical Line */}
                        <motion.div
                            animate={{
                                height: isHovered ? 40 : 20,
                                width: isHovered ? 2 : 1,
                                backgroundColor: cursorColor
                            }}
                            className="absolute rounded-full"
                        />
                        {/* Horizontal Line */}
                        <motion.div
                            animate={{
                                width: isHovered ? 40 : 20,
                                height: isHovered ? 2 : 1,
                                backgroundColor: cursorColor
                            }}
                            className="absolute rounded-full"
                        />

                        {/* Inner Dot for precision */}
                        <motion.div
                            animate={{
                                scale: isHovered ? 0 : 1,
                                opacity: isHovered ? 0 : 1,
                                backgroundColor: cursorColor
                            }}
                            className="absolute w-1 h-1 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
