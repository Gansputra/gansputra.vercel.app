"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

export const AudioVisualizer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const contextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        setMounted(true);
        audioRef.current = new Audio("/music.mp3");
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const initAudioContext = () => {
        if (!contextRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            contextRef.current = new AudioContextClass();
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            initAudioContext();
            if (contextRef.current?.state === "suspended") {
                contextRef.current.resume();
            }
            audioRef.current.play().catch(err => console.log("Audio play failed:", err));
        }
        setIsPlaying(!isPlaying);
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-10 right-6 md:bottom-10 md:right-10 z-[100] pointer-events-auto">
            <motion.button
                layout
                onClick={togglePlay}
                className={`w-12 h-12 flex items-center justify-center shadow-2xl relative overflow-hidden border transition-all duration-500 rounded-full ${isPlaying
                    ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(0,191,207,0.3)]"
                    : "bg-card/40 border-border backdrop-blur-xl hover:border-primary/50 opacity-80 md:opacity-100"
                    }`}
            >
                <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                    className="relative z-20"
                >
                    <Music className={`w-5 h-5 ${isPlaying ? "text-primary" : "text-foreground"}`} />
                </motion.div>

                {isPlaying && (
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/20 rounded-full"
                    />
                )}
            </motion.button>
        </div>
    );
};
