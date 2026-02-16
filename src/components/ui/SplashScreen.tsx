"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [counter, setCounter] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

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
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                y: -100,
                filter: "blur(20px)",
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden select-none cursor-default"
        >
            {/* Ambient Background - Static until started */}
            <motion.div
                animate={isStarted ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 90, 180, 270, 360],
                } : {
                    opacity: 0.05
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute w-[800px] h-[800px] rounded-full bg-primary/20 blur-[150px]"
            />

            <AnimatePresence mode="wait">
                {!isStarted ? (
                    <motion.div
                        key="start-trigger"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="flex items-center gap-2 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-white/40 font-outfit tracking-[0.4em] text-[10px] uppercase">Experience Initializing</span>
                        </motion.div>

                        <button
                            onClick={handleStart}
                            className="group relative flex flex-col items-center gap-6 cursor-pointer"
                        >
                            <div className="relative">
                                {/* Button Rings */}
                                <div className="absolute inset-0 rounded-full border border-primary/20 scale-150 animate-ping group-hover:border-primary/50" />
                                <div className="absolute inset-0 rounded-full border border-primary/10 scale-125 group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 shadow-2xl">
                                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                                    <Play className="w-8 h-8 text-white group-hover:text-primary fill-current transition-all duration-300 translate-l-1" />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-white/60 font-outfit tracking-[0.2em] text-xs uppercase group-hover:text-primary transition-colors duration-300"
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
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Animated Text */}
                        <div className={`mb-8 flex items-center justify-center ${!isFinished ? "overflow-hidden h-[80px] md:h-[120px]" : "h-auto py-10"}`}>
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
                                        transition={{ duration: 0.5 }}
                                        className="text-4xl md:text-6xl font-black font-outfit tracking-[0.2em] text-white relative"
                                    >
                                        <span className="relative z-10">
                                            {words[Math.min(Math.floor(counter / 25), words.length - 1)]}
                                        </span>
                                        {/* Glitch Layers */}
                                        <motion.span
                                            animate={{
                                                x: [-3, 3, -3],
                                                opacity: [0, 0.6, 0],
                                            }}
                                            transition={{ duration: 0.15, repeat: Infinity }}
                                            className="absolute inset-0 text-[#00fff2] z-0 translate-x-1 opacity-50"
                                        >
                                            {words[Math.min(Math.floor(counter / 25), words.length - 1)]}
                                        </motion.span>
                                        <motion.span
                                            animate={{
                                                x: [3, -3, 3],
                                                opacity: [0, 0.6, 0],
                                            }}
                                            transition={{ duration: 0.15, repeat: Infinity, delay: 0.05 }}
                                            className="absolute inset-0 text-[#ff00c1] z-0 -translate-x-1 opacity-50"
                                        >
                                            {words[Math.min(Math.floor(counter / 25), words.length - 1)]}
                                        </motion.span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
                                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                        className="text-8xl md:text-12xl font-black font-outfit tracking-tighter text-white text-center"
                                    >
                                        Portfolio
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!isFinished && (
                            <div className="flex flex-col items-center">
                                {/* Loading Bar Container */}
                                <div className="w-[200px] md:w-[350px] h-[2px] bg-white/5 relative overflow-hidden rounded-full border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${counter}%` }}
                                        transition={{ ease: "linear" }}
                                        className="h-full bg-primary shadow-[0_0_15px_rgba(0,191,207,0.5)]"
                                    />
                                </div>

                                {/* Counter */}
                                <div className="mt-8 flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#00bfcf]"
                                        />
                                        <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
                                            Loading Core {counter}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Grain/Noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            {/* Decorative Lines - more subtle when not started */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "100%", opacity: isStarted ? 0.05 : 0.01 }}
                        transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
                        className="absolute top-0 w-[1px] bg-white"
                        style={{ left: `${(i + 1) * 16.66}%` }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
