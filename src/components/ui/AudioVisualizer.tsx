"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, SkipForward, SkipBack, ChevronUp, ChevronDown } from "lucide-react";

import { useMusicTheme } from "@/context/MusicThemeContext";

// --- PLAYLIST CONFIGURATION ---
// Global Theme & Mood Data
const PLAYLIST = [
    {
        title: "So Am I",
        artist: "Ava Max",
        src: "musics/musicSoAmI.mp3",
        theme: {
            color: "#00bfcf", // Cyber Cyan
            primaryColor: "255, 100, 50",
            baseHue: 180, // Cyan/Blue
            rangeHue: 40,
            gradient: "radial-gradient(circle at 50% 50%, rgba(0, 191, 207, 0.25) 0%, rgba(0,0,0,0) 80%)",
            shadow: "rgba(0, 191, 207, 0.5)",
            cssVars: {
                "--primary": "#00bfcf",
                "--shadow-neon": "0 0 20px rgba(0, 191, 207, 0.4)",
            }
        }
    },
    {
        title: "Lily",
        artist: "Alan Walker",
        src: "musics/musicLily.mp3",
        theme: {
            color: "#10b981", // Emerald Green
            primaryColor: "16, 185, 129",
            baseHue: 150, // Green
            rangeHue: 50,
            gradient: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25) 0%, rgba(0,0,0,0) 80%)",
            shadow: "rgba(16, 185, 129, 0.5)",
            cssVars: {
                "--primary": "#10b981",
                "--shadow-neon": "0 0 20px rgba(16, 185, 129, 0.4)",
            }
        }
    },
    {
        title: "Haunted",
        artist: "Chris Grey",
        src: "musics/musicHaunted.mp3",
        theme: {
            color: "#8b5cf6", // Mystic Violet
            primaryColor: "139, 92, 246",
            baseHue: 270, // Purple
            rangeHue: 60,
            gradient: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.25) 0%, rgba(0,0,0,0) 80%)",
            shadow: "rgba(139, 92, 246, 0.5)",
            cssVars: {
                "--primary": "#8b5cf6",
                "--shadow-neon": "0 0 20px rgba(139, 92, 246, 0.4)",
            }
        }
    }
];

export const AudioVisualizer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [progress, setProgress] = useState(0);
    const { setTheme } = useMusicTheme();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const contextRef = useRef<AudioContext | null>(null);

    const currentTrack = PLAYLIST[currentTrackIndex];

    // --- GLOBAL THEME INJECTION ---
    useEffect(() => {
        if (!mounted) return;

        // Update Context for Vortex & Particles
        setTheme({
            color: currentTrack.theme.color,
            baseHue: currentTrack.theme.baseHue,
            rangeHue: currentTrack.theme.rangeHue
        });

        const root = document.documentElement;
        // Inject color variables globally
        root.style.setProperty("--primary", currentTrack.theme.cssVars["--primary"]);
        root.style.setProperty("--shadow-neon", currentTrack.theme.cssVars["--shadow-neon"]);
        // Optional: Add a transition class to body for smooth color changes
        root.style.transition = "all 1.5s ease";
    }, [currentTrackIndex, mounted, setTheme]);

    useEffect(() => {
        setMounted(true);
        audioRef.current = new Audio(currentTrack.src);
        audioRef.current.loop = false;

        const handleTimeUpdate = () => {
            if (audioRef.current && audioRef.current.duration) {
                const current = audioRef.current.currentTime;
                const total = audioRef.current.duration;
                if (!isNaN(total)) {
                    setProgress((current / total) * 100);
                }
            }
        };

        const handleEnded = () => nextTrack();

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current = null;
            }
        };
    }, []);

    // Update audio source when track changes
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.src = currentTrack.src;
            if (wasPlaying) {
                audioRef.current.play().catch(err => console.log("Play failed:", err));
            } else {
                setProgress(0);
            }
        }
    }, [currentTrackIndex]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = x / width;

        if (isFinite(audioRef.current.duration)) {
            const newTime = percentage * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(percentage * 100);
        }
    };

    const initAudioContext = () => {
        if (!contextRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            contextRef.current = new AudioContextClass();
        }
    };

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
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

    const nextTrack = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    const prevTrack = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    };

    if (!mounted) return null;

    return (
        <>
            {/* --- GLOBAL ATMOSPHERE TINT --- */}
            {/* This layer sits on top of everything (z-[1]) but blends with valid pointer events passing through (pointer-events-none) */}
            <AnimatePresence mode="wait">
                {isPlaying && (
                    <motion.div
                        key={currentTrackIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="fixed inset-0 pointer-events-none z-[1] mix-blend-soft-light"
                        style={{
                            background: currentTrack.theme.gradient,
                            // backdropFilter: "blur(20px)" /* Removed to keep particles visible */
                        }}
                    />
                )}
            </AnimatePresence>

            {/* --- SECONDARY GLOW LAYER (Bottom Up) --- */}
            <AnimatePresence mode="wait">
                {isPlaying && (
                    <motion.div
                        key={`glow-${currentTrackIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="fixed bottom-0 left-0 right-0 h-[50vh] pointer-events-none z-[0]"
                        style={{
                            background: `linear-gradient(to top, ${currentTrack.theme.color}40, transparent)`
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] pointer-events-none flex flex-col items-end justify-end">

                <AnimatePresence>
                    {/* --- THE DYNAMIC DOCK (Expanded Mode) --- */}
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="pointer-events-auto w-[320px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                            style={{ boxShadow: `0 20px 50px -10px ${currentTrack.theme.shadow}` }}
                        >
                            {/* Interactive Progress Bar */}
                            <div
                                className="h-1.5 w-full bg-white/10 relative cursor-pointer group"
                                onClick={handleSeek}
                            >
                                <motion.div
                                    className="absolute h-full"
                                    style={{ width: `${progress}%`, backgroundColor: currentTrack.theme.color }}
                                />
                                {/* Hover handle indicator */}
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none"
                                    style={{ left: `${progress}%` }}
                                />
                            </div>

                            <div className="p-4 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    {/* Spinning Disc Small */}
                                    <div className="relative w-10 h-10 flex-shrink-0">
                                        <motion.div
                                            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-full bg-zinc-900 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden"
                                        >
                                            <div className="w-2 h-2 bg-zinc-950 rounded-full border border-white/10 z-10" />
                                            <Music className="w-4 h-4 opacity-50 absolute" style={{ color: currentTrack.theme.color }} />
                                        </motion.div>
                                    </div>

                                    {/* Track Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-bold text-sm truncate uppercase tracking-tight">
                                            {currentTrack.title}
                                        </h4>
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">
                                            {currentTrack.artist}
                                        </p>
                                    </div>

                                    {/* Minimize Handle (Top Right) */}
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-colors"
                                    >
                                        <ChevronDown size={16} />
                                    </button>
                                </div>

                                {/* Controls - Full Width Row */}
                                <div className="flex items-center justify-between px-2">
                                    <button onClick={prevTrack} className="p-2 text-white/60 hover:text-white transition-colors" style={{ '&:hover': { color: currentTrack.theme.color } } as any}>
                                        <SkipBack size={20} />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg"
                                        style={{ backgroundColor: currentTrack.theme.color }}
                                    >
                                        {isPlaying ? <Pause size={24} fill="white" className="text-white" /> : <Play size={24} className="ml-1 text-white" fill="white" />}
                                    </button>
                                    <button onClick={nextTrack} className="p-2 text-white/60 hover:text-white transition-colors" style={{ '&:hover': { color: currentTrack.theme.color } } as any}>
                                        <SkipForward size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- MINIMIZED FLOATING BUBBLE --- */}
                {!isExpanded && (
                    <motion.div
                        layoutId="music-control"
                        className="pointer-events-auto"
                    >
                        <motion.button
                            layout
                            onClick={() => setIsExpanded(true)}
                            className={`w-12 h-12 flex items-center justify-center shadow-2xl relative overflow-hidden border transition-all duration-500 rounded-full bg-zinc-950`}
                            style={{
                                borderColor: isPlaying ? currentTrack.theme.color : 'rgba(255,255,255,0.1)',
                                boxShadow: isPlaying ? `0 0 20px ${currentTrack.theme.shadow}` : 'none'
                            }}
                        >
                            <motion.div
                                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                                transition={isPlaying ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                                className="relative z-20"
                            >
                                <Music className={`w-5 h-5`} style={{ color: isPlaying ? currentTrack.theme.color : 'rgba(255,255,255,0.6)' }} />
                            </motion.div>

                            {/* Pulse effect when hidden but playing */}
                            {isPlaying && (
                                <motion.div
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: currentTrack.theme.color }}
                                />
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </>
    );
};
