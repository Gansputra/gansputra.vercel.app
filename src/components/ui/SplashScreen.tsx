"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth cinematic counter from 0% -> 100% in 1.6s
  useEffect(() => {
    if (!mounted) return;

    const startTime = Date.now();
    const duration = 1600; // 1.6s counter

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const next = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(next);

      if (next < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        setIsFinishing(true);
        setTimeout(onComplete, 400);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 sm:p-14 bg-[#050507] text-white overflow-hidden select-none"
    >
      {/* Ambient Focal Glow in Center */}
      <motion.div
        animate={{
          scale: [0.8, 1.15, 1],
          opacity: [0.15, 0.35, 0.2],
        }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/25 via-secondary/20 to-primary/10 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-white/50 uppercase">
            Edition • 2026
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onComplete}
          className="text-[11px] font-mono tracking-widest text-white/40 hover:text-primary transition-colors uppercase px-3.5 py-1.5 rounded-full border border-white/10 hover:border-primary/50 cursor-pointer backdrop-blur-md"
        >
          Skip →
        </motion.button>
      </div>

      {/* Centerpiece: Masked Kinetic Wordmark */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
        {/* Subtle Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-primary mb-6 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>Fullstack Developer & Motion Artist</span>
        </motion.div>

        {/* Wordmark with smooth mask reveal */}
        <div className="overflow-hidden relative py-2 px-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter uppercase leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
          >
            GANSPUTRA
          </motion.h1>

          {/* Shimmer Light Flare passing through */}
          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12 pointer-events-none blur-sm"
          />
        </div>

        {/* Subtitle Identity */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-xs sm:text-sm font-mono text-white/40 tracking-[0.35em] uppercase mt-4"
        >
          Code • Cinematic Motion • Graphic Art
        </motion.p>
      </div>

      {/* Bottom Counter & Glowing Hairline Bar */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-white/40 tracking-widest uppercase text-[11px]">
            {isFinishing ? "Experience Ready" : "Preparing Stage"}
          </span>
          <span className="font-bold text-primary font-mono text-sm tracking-wider">
            {progress.toString().padStart(2, "0")}%
          </span>
        </div>

        {/* Hairline 2px glowing progress bar */}
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-cyan-300 to-primary shadow-neon"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
