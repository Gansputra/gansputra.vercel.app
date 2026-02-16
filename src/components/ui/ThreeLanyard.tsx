"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const ThreeLanyard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isPressed, setIsPressed] = useState(false);
    const lastPos = useRef({ x: 0, y: 0 });

    // Rotation values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth movement springs
    const mouseXSpring = useSpring(x, { stiffness: 80, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 80, damping: 25 });

    // 360 Degree Rotation Mapping - Ensuring wide range for full rotation
    const rotateX = useTransform(mouseYSpring, [-300, 300], [180, -180]);
    const rotateY = useTransform(mouseXSpring, [-300, 300], [-180, 180]);

    // Global Interaction Handlers
    useEffect(() => {
        const updateRotation = (clientX: number, clientY: number) => {
            if (!isPressed) return;
            const deltaX = clientX - lastPos.current.x;
            const deltaY = clientY - lastPos.current.y;
            x.set(x.get() + deltaX * 1.5);
            y.set(y.get() + deltaY * 1.5);
            lastPos.current = { x: clientX, y: clientY };
        };

        const handleMouseMove = (e: MouseEvent) => updateRotation(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
            updateRotation(e.touches[0].clientX, e.touches[0].clientY);
        };

        const stopInteraction = () => {
            setIsPressed(false);
            x.set(0);
            y.set(0);
        };

        if (isPressed) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", stopInteraction);
            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            window.addEventListener("touchend", stopInteraction);
            window.addEventListener("touchcancel", stopInteraction);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", stopInteraction);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", stopInteraction);
            window.removeEventListener("touchcancel", stopInteraction);
        };
    }, [isPressed, x, y]);

    const handleStart = (clientX: number, clientY: number) => {
        setIsPressed(true);
        lastPos.current = { x: clientX, y: clientY };
    };

    // Settings
    const thicknessScale = 8; // Number of volume planes
    const borderRadius = "4rem";

    return (
        <div className="w-full h-full flex items-center justify-center p-8 perspective-[2500px] select-none touch-none outline-none">
            <motion.div
                ref={cardRef}
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{
                    opacity: 1,
                    scale: isPressed ? 1.05 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-[340px] aspect-[1/1.55] group outline-none cursor-none"
                data-cursor="hover"
            >
                {/* --- 3D VOLUME LAYERS --- */}
                {/* CRITICAL: backfaceVisibility must be "visible" (default) or omitted so thickness is seen from both sides */}
                {[...Array(thicknessScale)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            transform: `translateZ(${i - thicknessScale / 2}px)`,
                            borderRadius: borderRadius,
                            background: i === 0 || i === thicknessScale - 1 ? "#222" : "#111",
                            // removed backface-hidden here to ensure volume stays visible during rotation
                        }}
                        className="absolute inset-0 border border-white/5 pointer-events-none"
                    />
                ))}

                {/* --- FRONT FACE --- */}
                <div
                    style={{
                        transform: `translateZ(${thicknessScale / 2 + 1}px)`,
                        borderRadius: borderRadius,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 border-2 border-white/20 overflow-hidden bg-[#050505] transform-gpu"
                >
                    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[20px] z-0" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black to-primary/10 opacity-90" />

                    {/* CONTENT FRONT */}
                    <div style={{ transform: "translateZ(50px)" }} className="relative z-30 h-full flex flex-col items-center justify-center p-12 space-y-10 pointer-events-none">
                        <h3 className="text-5xl font-black text-white tracking-tighter leading-none text-center drop-shadow-2xl">
                            GANSPUTRA
                        </h3>

                        <div className="w-full max-w-[180px] h-[3px] bg-white/10 rounded-full relative overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-1/2 h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),1)]"
                            />
                        </div>

                        <div className="space-y-3 text-center">
                            <p className="text-primary font-bold text-xs tracking-[0.4em] uppercase">
                                Creative Developer
                            </p>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000" />
                </div>

                {/* --- BACK FACE --- */}
                <div
                    style={{
                        transform: `rotateY(180deg) translateZ(${thicknessScale / 2 + 1}px)`,
                        borderRadius: borderRadius,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 bg-[#0a0a0a] border-2 border-white/10 flex flex-col items-center justify-center overflow-hidden transform-gpu"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-40 z-0" />

                    <div style={{ transform: "translateZ(40px)" }} className="relative z-10 flex flex-col items-center pointer-events-none">
                        <div className="text-2xl font-black text-white tracking-[0.6em] opacity-40 uppercase">HQ</div>
                        <div className="mt-4 h-[1px] w-20 bg-primary/30" />
                        <div className="mt-4 text-[9px] font-mono text-white/20 tracking-[0.3em]">ENCRYPTED IDENT</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
