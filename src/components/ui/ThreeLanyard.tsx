"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Sparkles, Move3d, QrCode, Cpu, ShieldCheck } from "lucide-react";

export const ThreeLanyard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Rotation values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth movement springs
  const mouseXSpring = useSpring(x, { stiffness: 90, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 90, damping: 25 });

  // 360 Degree Rotation Mapping
  const rotateX = useTransform(mouseYSpring, [-300, 300], [180, -180]);
  const rotateY = useTransform(mouseXSpring, [-300, 300], [-180, 180]);

  // Global Interaction Handlers
  useEffect(() => {
    const updateRotation = (clientX: number, clientY: number) => {
      if (!isPressed) return;
      const deltaX = clientX - lastPos.current.x;
      const deltaY = clientY - lastPos.current.y;
      x.set(x.get() + deltaX * 1.4);
      y.set(y.get() + deltaY * 1.4);
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

  // Card thickness setup
  const thicknessScale = 8;
  const borderRadius = "2.5rem";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-6 perspective-[2500px] select-none touch-none outline-none">
      {/* Hanging Lanyard Strap & Clip */}
      <div className="relative flex flex-col items-center -mb-5 z-40 pointer-events-none">
        {/* Woven Strap */}
        <div className="w-9 h-14 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border-x border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)]" />
          <span className="text-[7px] font-mono font-bold tracking-widest text-primary/70 uppercase rotate-90 whitespace-nowrap">
            GANSPUTRA
          </span>
        </div>

        {/* Metallic Clip */}
        <div className="w-7 h-6 rounded-b-md bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 border border-white/30 shadow-md flex items-center justify-center">
          <div className="w-3 h-2 rounded-full bg-black/60 border border-white/20" />
        </div>
      </div>

      {/* 3D Rotating Card Container */}
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
          scale: isPressed ? 1.04 : 1,
        }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[320px] aspect-[1/1.55] group outline-none cursor-grab active:cursor-grabbing"
      >
        {/* --- 3D VOLUME EDGES --- */}
        {[...Array(thicknessScale)].map((_, i) => (
          <div
            key={i}
            style={{
              transform: `translateZ(${i - thicknessScale / 2}px)`,
              borderRadius: borderRadius,
              background:
                i === 0 || i === thicknessScale - 1
                  ? isDark
                    ? "#1a1a22"
                    : "#d0d0d8"
                  : isDark
                  ? "#0d0d12"
                  : "#e5e5ec",
            }}
            className="absolute inset-0 border border-border/10 pointer-events-none"
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
          className="absolute inset-0 border-2 border-white/20 overflow-hidden bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col justify-between p-7 transform-gpu text-foreground"
        >
          {/* Ambient Multi-Hue Gradient Foil */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15 pointer-events-none" />

          {/* Holographic Sheen Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />

          {/* Top Bar: Chip & Status */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Gold NFC/SIM Chip */}
            <div className="w-10 h-8 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/50 p-1 flex flex-col justify-between shadow-inner">
              <div className="h-[1px] w-full bg-amber-800/40" />
              <div className="flex justify-between items-center px-1">
                <div className="w-1.5 h-2.5 rounded-sm border border-amber-900/40" />
                <Cpu size={12} className="text-amber-950/70" />
                <div className="w-1.5 h-2.5 rounded-sm border border-amber-900/40" />
              </div>
              <div className="h-[1px] w-full bg-amber-800/40" />
            </div>

            {/* Online Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 border border-border/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-green-500">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Center Identity */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-primary via-white to-secondary shadow-neon mb-3.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img
                  src="/profile.png"
                  alt="Gansputra"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-2xl font-black tracking-tight uppercase leading-none text-foreground">
              Gansputra
            </h3>
            <p className="text-[10px] font-mono tracking-[0.25em] text-primary uppercase mt-1 font-bold">
              Creative Technologist
            </p>

            {/* Role Pills */}
            <div className="flex items-center gap-1.5 mt-3">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20 uppercase">
                Dev
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-secondary/10 text-secondary border border-secondary/20 uppercase">
                Motion
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-white/5 text-foreground/70 border border-white/10 uppercase">
                GFX
              </span>
            </div>
          </div>

          {/* Bottom Footer: Barcode & Serial */}
          <div className="relative z-10 pt-3 border-t border-border/60 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono uppercase text-muted-foreground tracking-widest">
                PASS IDENT
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider text-foreground">
                #GP-2026-DEV
              </span>
            </div>

            {/* Faux Mini Barcode */}
            <div className="flex items-end gap-[2px] h-5 opacity-70">
              <div className="w-[1.5px] h-full bg-foreground" />
              <div className="w-[3px] h-full bg-foreground" />
              <div className="w-[1px] h-3 bg-foreground" />
              <div className="w-[2px] h-full bg-foreground" />
              <div className="w-[1px] h-4 bg-foreground" />
              <div className="w-[3px] h-full bg-foreground" />
              <div className="w-[1.5px] h-full bg-foreground" />
              <div className="w-[1px] h-2 bg-foreground" />
              <div className="w-[2px] h-full bg-foreground" />
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          style={{
            transform: `rotateY(180deg) translateZ(${thicknessScale / 2 + 1}px)`,
            borderRadius: borderRadius,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="absolute inset-0 border-2 border-white/20 bg-card/95 backdrop-blur-2xl flex flex-col justify-between p-7 transform-gpu text-foreground shadow-2xl"
        >
          {/* Top Magnetic Stripe */}
          <div className="w-full h-8 bg-zinc-900 -mx-7 px-7 flex items-center justify-between border-y border-white/10">
            <span className="text-[7px] font-mono tracking-widest text-white/30 uppercase">
              SECURITY MAGNETICS
            </span>
            <ShieldCheck size={12} className="text-primary" />
          </div>

          {/* Center Back Info */}
          <div className="flex flex-col items-center text-center my-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center">
              <QrCode size={36} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold tracking-wider uppercase text-foreground">
                PORTFOLIO HQ
              </p>
              <p className="text-[9px] font-mono text-muted-foreground mt-0.5">
                gansputra.vercel.app
              </p>
            </div>
          </div>

          {/* Signature Strip */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-[8px] font-mono uppercase text-muted-foreground">
              AUTH SIGNATURE
            </span>
            <span className="font-serif italic font-bold text-sm tracking-wider text-primary">
              Gansputra
            </span>
          </div>
        </div>
      </motion.div>

      {/* Interactive Helper Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-border/80 text-[10px] font-mono text-muted-foreground backdrop-blur-md shadow-md"
      >
        <Move3d size={13} className="text-primary animate-pulse" />
        <span>Drag or swipe card to rotate 360°</span>
      </motion.div>
    </div>
  );
};
