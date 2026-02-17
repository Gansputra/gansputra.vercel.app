"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [mounted, setMounted] = useState(false);
    const [counter, setCounter] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const { theme } = useTheme();
    const isDark = mounted && theme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isStarted) return;

        const timer = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsFinished(true), 500);
                    return 100;
                }
                // Exactly 1 second per word (25 units * 40ms = 1000ms)
                return Math.min(prev + 1, 100);
            });
        }, 40);

        return () => clearInterval(timer);
    }, [isStarted]);

    // Auto-complete after logo is shown if you want, 
    // or keep the button. User asked to "stop" until play, 
    // let's make the entry to the site smooth after loading.
    useEffect(() => {
        if (isFinished) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 2500); // Give time to admire the final logo
            return () => clearTimeout(timeout);
        }
    }, [isFinished, onComplete]);

    const words = ["CREATIVE", "DEVELOPER", "EDITOR", "Gansputra"];

    const handleStart = () => {
        setTimeout(() => {
            setIsStarted(true);
        }, 800);
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                y: -40,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden select-none cursor-default"
        >
            {/* Ambient Background - Optimized with radial-gradient instead of blur filter */}
            <motion.div
                animate={isStarted ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.15, 0.05],
                } : {
                    opacity: 0.03
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    willChange: "transform, opacity",
                    background: !mounted
                        ? "radial-gradient(circle, rgba(0,191,207,0.1) 0%, rgba(5,5,5,0) 70%)"
                        : isDark
                            ? "radial-gradient(circle, rgba(0,191,207,0.15) 0%, rgba(5,5,5,0) 70%)"
                            : "radial-gradient(circle, rgba(0,191,207,0.08) 0%, rgba(250,250,250,0) 70%)"
                }}
                className="absolute w-[800px] h-[800px] pointer-events-none"
            />

            <AnimatePresence mode="wait">
                {!isStarted ? (
                    <motion.div
                        key="start-trigger"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="flex items-center gap-2 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-foreground/40 font-outfit tracking-[0.4em] text-[10px] uppercase">Experience Initializing</span>
                        </motion.div>

                        <button
                            onClick={handleStart}
                            className="group relative flex flex-col items-center gap-6 cursor-pointer"
                        >
                            <div className="relative">
                                {/* Button Rings */}
                                <div className="absolute inset-0 rounded-full border border-primary/20 scale-150 animate-ping group-hover:border-primary/50" />
                                <div className="absolute inset-0 rounded-full border border-primary/10 scale-125 group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative w-22 h-22 flex items-center justify-center rounded-full bg-primary/5 border border-border group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                                    <Play className="w-7 h-7 text-foreground group-hover:text-primary fill-current transition-all duration-300" />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-foreground/60 font-outfit tracking-[0.2em] text-xs uppercase group-hover:text-primary transition-colors duration-300"
                                >
                                    Press to Play
                                </motion.span>
                            </div>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="loading-sequence"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 flex flex-col items-center w-full"
                    >
                        {/* Animated Text */}
                        <div className={`mb-8 flex items-center justify-center w-full ${!isFinished ? "overflow-hidden h-[80px] md:h-[120px]" : "h-auto py-10"}`}>
                            <AnimatePresence mode="wait">
                                {!isFinished ? (
                                    <motion.div
                                        key={Math.floor(counter / 25)}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0.8, 1],
                                            x: [0, -3, 3, -1, 0],
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 5
                                        }}
                                        transition={{ duration: 0.4 }}
                                        style={{ willChange: "transform, opacity" }}
                                        className="text-4xl md:text-6xl font-black font-outfit tracking-[0.2em] text-foreground relative px-4 text-center"
                                    >
                                        <span className="relative z-10">
                                            {words[Math.min(Math.floor(counter / 25), words.length - 1)]}
                                        </span>
                                        {/* Glitch Layers */}
                                        <motion.span
                                            animate={{
                                                x: [-2, 2, -2],
                                                opacity: [0, 0.4, 0],
                                            }}
                                            transition={{ duration: 0.2, repeat: Infinity }}
                                            className="absolute inset-0 text-[#00fff2] z-0 translate-x-1"
                                        >
                                            {words[Math.min(Math.floor(counter / 25), words.length - 1)]}
                                        </motion.span>
                                        <motion.span
                                            animate={{
                                                x: [2, -2, 2],
                                                opacity: [0, 0.4, 0],
                                            }}
                                            transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                                            className="absolute inset-0 text-[#ff00c1] z-0 -translate-x-1"
                                        >
                                            {words[Math.min(Math.floor(counter / 25), words.length - 1)]}
                                        </motion.span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                        style={{ willChange: "transform, opacity" }}
                                        className="text-7xl md:text-9xl lg:text-[12rem] font-black font-outfit tracking-tighter text-foreground text-center leading-none"
                                    >
                                        Portfolio
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!isFinished && (
                            <div className="flex flex-col items-center">
                                {/* Loading Bar Container */}
                                <div className="w-[180px] md:w-[300px] h-[1px] bg-white/5 relative overflow-hidden rounded-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${counter}%` }}
                                        transition={{ ease: "linear" }}
                                        className="h-full bg-primary"
                                    />
                                </div>

                                {/* Counter */}
                                <div className="mt-6 flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="w-1 h-1 rounded-full bg-primary"
                                        />
                                        <span className="font-mono text-[9px] tracking-[0.3em] text-foreground/20 uppercase">
                                            Loading {counter}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Grain/Noise - Simplified */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Decorative Lines - Optimized with scaleY */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: isStarted ? 0.03 : 0.01 }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        style={{
                            originY: 0,
                            willChange: "transform, opacity",
                            left: `${(i + 1) * 20}%`
                        }}
                        className="absolute top-0 w-[1px] h-full bg-foreground"
                    />
                ))}
            </div>
        </motion.div>
    );
};
