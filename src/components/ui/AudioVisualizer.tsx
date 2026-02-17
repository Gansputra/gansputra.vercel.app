"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, SkipForward, SkipBack, ChevronUp, ChevronDown } from "lucide-react";

// --- PLAYLIST CONFIGURATION ---
// Kamu bisa tambah lagu di sini King!
const PLAYLIST = [
    {
        title: "So Am I",
        artist: "Ava Max",
        src: "musics/musicSoAmI.mp3",
    },
    {
        title: "Lily",
        artist: "Alan Walker",
        src: "musics/musicLily.mp3",
    },
    {
        title: "Haunted",
        artist: "Chris Grey",
        src: "musics/musicHaunted.mp3",
    }
];

export const AudioVisualizer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const contextRef = useRef<AudioContext | null>(null);

    const currentTrack = PLAYLIST[currentTrackIndex];

    useEffect(() => {
        setMounted(true);
        audioRef.current = new Audio(currentTrack.src);
        audioRef.current.loop = false; // Kita handle loop manual atau auto-next

        const handleTimeUpdate = () => {
            if (audioRef.current && audioRef.current.duration) {
                const current = audioRef.current.currentTime;
                const total = audioRef.current.duration;
                if (!isNaN(total)) {
                    setProgress((current / total) * 100);
                }
            }
        };

        // Auto play next song when current finishes
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
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] pointer-events-none flex flex-col items-end justify-end">

            <AnimatePresence>
                {/* --- THE DYNAMIC DOCK (Expanded Mode) --- */}
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="pointer-events-auto w-[320px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Interactive Progress Bar */}
                        <div
                            className="h-1.5 w-full bg-white/10 relative cursor-pointer group"
                            onClick={handleSeek}
                        >
                            <motion.div
                                className="absolute h-full bg-primary shadow-[0_0_10px_#00bfcf]"
                                style={{ width: `${progress}%` }}
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
                                        <Music className="w-4 h-4 text-primary/40 absolute" />
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
                                <button onClick={prevTrack} className="p-2 text-white/60 hover:text-primary transition-colors">
                                    <SkipBack size={20} />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg"
                                >
                                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
                                </button>
                                <button onClick={nextTrack} className="p-2 text-white/60 hover:text-primary transition-colors">
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
                        className={`w-12 h-12 flex items-center justify-center shadow-2xl relative overflow-hidden border transition-all duration-500 rounded-full ${isPlaying
                            ? "bg-zinc-950 border-primary shadow-[0_0_20px_rgba(0,191,207,0.3)]"
                            : "bg-zinc-950 border-white/10 backdrop-blur-xl hover:border-primary/50"
                            }`}
                    >
                        <motion.div
                            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                            transition={isPlaying ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                            className="relative z-20"
                        >
                            <Music className={`w-5 h-5 ${isPlaying ? "text-primary" : "text-white/60"}`} />
                        </motion.div>

                        {/* Pulse effect when hidden but playing */}
                        {isPlaying && (
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-primary rounded-full"
                            />
                        )}
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};
