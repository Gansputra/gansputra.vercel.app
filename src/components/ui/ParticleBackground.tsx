"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const ParticleBackground = () => {
    const [isMounted, setIsMounted] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });

    useEffect(() => {
        setIsMounted(true);
        // Optimize: Only track mouse on desktop
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };

        if (!isMobile) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* LAYER 1: Deep Slow Glows - Reduced Blur */}
            <ParallaxLayer x={springX} y={springY} factor={10}>
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[80px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/5 blur-[100px] rounded-full" />
            </ParallaxLayer>

            {/* LAYER 2: Floating Frames (Reduced Count) */}
            <ParallaxLayer x={springX} y={springY} factor={25}>
                <div className="absolute top-[20%] right-[15%] w-60 h-80 border border-white/[0.02] rounded-[4rem] rotate-[30deg]" />
                <div className="absolute bottom-[20%] left-[10%] w-72 h-52 border border-white/[0.02] rounded-[3rem] -rotate-[15deg]" />
            </ParallaxLayer>

            {/* LAYER 3: Technical Elements (Simplified) */}
            <ParallaxLayer x={springX} y={springY} factor={45}>
                <div className="absolute top-[0%] left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
                <div className="absolute bottom-[0%] right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

                <PlusSign className="absolute top-[15%] left-[45%] opacity-[0.03] scale-[2]" />
            </ParallaxLayer>

            {/* LAYER 4: Micro Particles (Significant Reduction from 60 to 20) */}
            <ParallaxLayer x={springX} y={springY} factor={70}>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-white/10 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </ParallaxLayer>

            {/* Removed Noise Filter as it consumes a lot of GPU resources */}
        </div>
    );
};

const PlusSign = ({ className }: { className?: string }) => (
    <div className={`relative w-3 h-3 ${className}`}>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-current" />
    </div>
);

const ParallaxLayer = ({ children, x, y, factor }: { children: React.ReactNode, x: any, y: any, factor: number }) => {
    const translateX = useTransform(x, (val: number) => val * factor);
    const translateY = useTransform(y, (val: number) => val * factor);

    return (
        <motion.div
            style={{ x: translateX, y: translateY, willChange: "transform" }}
            className="absolute inset-0"
        >
            {children}
        </motion.div>
    );
};
