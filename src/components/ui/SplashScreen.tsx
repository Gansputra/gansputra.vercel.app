"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SplashScreenProps {
    onComplete: () => void;
}

const GLITCH_LOGS = [
    "LOADING_PROJECT_REPOS",
    "FETCHING_3D_GALLERY",
    "COMPILING_SKILL_MATRIX",
    "DECRYPTING_CREATIVE_STORY",
    "INITIALIZING_VFX_ENGINE",
    "RENDER_ENV_PREVIEW",
    "PORTFOLIO_HANDSHAKE_OK",
    "READY_FOR_EXPLORATION"
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [mounted, setMounted] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [logIndex, setLogIndex] = useState(0);
    const [isCracking, setIsCracking] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isStarted) return;
        const interval = setInterval(() => {
            setLogIndex(prev => (prev + 1) % GLITCH_LOGS.length);
        }, 100);
        return () => clearInterval(interval);
    }, [isStarted]);

    const handleStart = () => {
        setIsCracking(true);
        setTimeout(() => {
            setIsStarted(true);
            setTimeout(onComplete, 3500);
        }, 800);
    };

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                scaleY: 0.005,
                opacity: [1, 1, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden select-none"
        >
            {/* CRT Scanlines & Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Static Flicker Background */}
            <motion.div
                animate={{ opacity: [0.05, 0.1, 0.05, 0.15, 0.1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20"
            />

            <div className="relative z-10 w-full px-6 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {!isStarted ? (
                        <motion.div
                            key="malfunction"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ x: [0, -20, 20, -10, 10, 0], opacity: 0 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="relative space-y-2 text-center">
                                <motion.div
                                    animate={{
                                        x: [-2, 2, -1, 3, 0],
                                        skewX: [0, 5, -5, 2, 0]
                                    }}
                                    transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
                                    className="text-primary font-mono text-[10px] md:text-sm tracking-[0.5em] uppercase opacity-70"
                                >
                                    Initializing_Creative_Portfolio
                                </motion.div>
                                <h2 className="text-white font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter italic uppercase leading-none">
                                    PORTFOLIO <span className="text-primary glitch-text" data-text="GFX">DATABASE</span>
                                </h2>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleStart}
                                className={`group relative px-10 py-4 bg-transparent border-2 border-primary overflow-hidden transition-all duration-75 ${isCracking ? "animate-pulse" : ""}`}
                            >
                                {/* RGB Split Hover Effect */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="absolute translate-x-1 text-red-500 font-bold tracking-[0.3em] pointer-events-none">OVERRIDE</span>
                                    <span className="absolute -translate-x-1 text-blue-500 font-bold tracking-[0.3em] pointer-events-none">OVERRIDE</span>
                                </div>
                                <span className="relative z-10 text-primary font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                                    {isCracking ? "CRACKING..." : "OVERRIDE"}
                                </span>
                            </motion.button>

                            <div className="mt-4 font-mono text-[8px] md:text-[10px] text-white/30 flex gap-4">
                                <span>ERR_CODE: 0xJSJS</span>
                                <span>SEC_LVL: GANS_UNLIMITED</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="core-reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center w-full max-w-5xl"
                        >
                            {/* LOGS STREAM */}
                            <div className="mb-12 h-6 overflow-hidden">
                                <motion.div
                                    key={logIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="text-primary font-mono text-[10px] md:text-xs tracking-[0.5em] text-center"
                                >
                                    {">"} {GLITCH_LOGS[logIndex]}
                                </motion.div>
                            </div>

                            <div className="relative">
                                {/* Chromatic Aberration Layers */}
                                <motion.h1
                                    animate={{
                                        x: [-1, 1, -1],
                                        opacity: [0.8, 1, 0.9]
                                    }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="text-white font-black text-5xl md:text-9xl lg:text-[12rem] tracking-tighter uppercase leading-none mix-blend-screen relative z-10"
                                >
                                    GANSPUTRA
                                </motion.h1>
                                <motion.h1
                                    animate={{
                                        x: [2, -2, 2],
                                        y: [1, -1, 1],
                                    }}
                                    transition={{ duration: 0.05, repeat: Infinity }}
                                    className="absolute inset-0 text-primary font-black text-5xl md:text-9xl lg:text-[12rem] tracking-tighter uppercase leading-none opacity-40 -z-10"
                                >
                                    GANSPUTRA
                                </motion.h1>
                                <motion.h1
                                    animate={{
                                        x: [-3, 3, -2],
                                        y: [-2, 2, -1],
                                    }}
                                    transition={{ duration: 0.08, repeat: Infinity, delay: 0.02 }}
                                    className="absolute inset-0 text-[#00fff2] font-black text-5xl md:text-9xl lg:text-[12rem] tracking-tighter uppercase leading-none opacity-40 -z-10"
                                >
                                    GANSPUTRA
                                </motion.h1>
                            </div>

                            <motion.div
                                animate={{ opacity: [0, 1, 0.5, 1] }}
                                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                                className="mt-8 px-6 py-2 border border-primary/40 bg-primary/5 backdrop-blur-sm"
                            >
                                <p className="text-primary font-mono text-[9px] md:text-xs tracking-widest uppercase italic">
                                    Identity Verification: SUCCESSFUL
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Random Glitch Blocks */}
            <AnimatePresence>
                {isStarted && (
                    <>
                        <motion.div
                            animate={{
                                top: ["10%", "80%", "30%"],
                                left: ["5%", "60%", "10%"],
                                width: [50, 200, 100],
                                height: [10, 5, 20],
                                opacity: [0, 0.2, 0]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="fixed bg-white z-[60]"
                        />
                        <motion.div
                            animate={{
                                bottom: ["20%", "70%", "40%"],
                                right: ["10%", "50%", "20%"],
                                width: [100, 40, 150],
                                height: [2, 10, 4],
                                opacity: [0, 0.3, 0]
                            }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
                            className="fixed bg-primary z-[60]"
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
