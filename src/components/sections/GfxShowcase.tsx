"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { gfxData } from "@/data/gfxData";
import { Maximize2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useRef } from "react";

import { useTheme } from "next-themes";

const GfxCard = ({ item, setSelectedImage, index, order }: { item: any, setSelectedImage: (img: string) => void, index: number, order: number }) => {
    const [mounted, setMounted] = useState(false);
    const isMobileQuery = useMediaQuery("(max-width: 1024px)");
    const isMobile = mounted && isMobileQuery;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Base motion value for spring
    const opacityValue = useMotionValue(0);
    const spotlightOpacity = useSpring(opacityValue, { stiffness: 300, damping: 30 });

    const { theme } = useTheme();
    const isDark = mounted && theme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    const maskImage = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(200px circle at ${x}px ${y}px, ${isDark ? 'black' : 'white'} 0%, transparent 100%)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => opacityValue.set(1);
    const handleMouseLeave = () => opacityValue.set(0);

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative"
        >
            <Card className="p-0 bg-card/80 overflow-hidden group cursor-pointer h-full flex flex-col" glow>
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                    {/* Base Image (Full color on mobile, dimmed on desktop) */}
                    <img
                        src={item.image}
                        alt={item.title}
                        className={cn(
                            "w-full h-full object-cover transition-all duration-700",
                            isMobile ? "grayscale opacity-60" : "opacity-30 grayscale"
                        )}
                    />

                    {/* Spotlight Image (Desktop only) */}
                    {!isMobile && (
                        <motion.div
                            className="absolute inset-0 z-10 pointer-events-none"
                            style={{
                                opacity: spotlightOpacity,
                                WebkitMaskImage: maskImage,
                                maskImage: maskImage,
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Tech Scanner Line Wrapper (Desktop only) */}
                    {!isMobile && (
                        <motion.div
                            className="absolute inset-0 z-20 pointer-events-none"
                            style={{ opacity: spotlightOpacity }}
                        >
                            {/* Vertical Scanner Line */}
                            <motion.div
                                style={{ left: mouseX }}
                                className="absolute top-0 bottom-0 w-[1px] bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                            />
                            {/* Horizontal Scanner Line */}
                            <motion.div
                                style={{ top: mouseY }}
                                className="absolute left-0 right-0 h-[1px] bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                            />
                        </motion.div>
                    )}

                    {/* Regular Metallic Shine Effect (Mobile only) */}
                    {isMobile && (
                        <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
                            <motion.div
                                initial={{ left: "-150%" }}
                                animate={{ left: "150%" }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2.2,
                                    repeatDelay: (gfxData.length * 1) + 1, // Total wait time
                                    delay: order * 1, // Delay based on shuffled order
                                    ease: "linear"
                                }}
                                className="absolute inset-y-0 w-[50%] z-50 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                                    transform: 'skewX(-25deg)',
                                }}
                            />
                        </div>
                    )}

                    {/* Overlay Action */}
                    <div
                        onClick={() => setSelectedImage(item.image)}
                        className={cn(
                            "absolute inset-0 z-30 flex items-center justify-center transition-all duration-300",
                            isMobile
                                ? "bg-background/10 opacity-100"
                                : "bg-background/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]"
                        )}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "p-3 md:p-4 rounded-full bg-primary/20 border border-primary/50 text-primary transition-all duration-500",
                                !isMobile && "translate-y-4 group-hover:translate-y-0"
                            )}
                        >
                            <Maximize2 size={isMobile ? 20 : 24} />
                        </motion.div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-40">
                        <span className="px-3 py-1 bg-card/80 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/30">
                            {item.category}
                        </span>
                    </div>
                </div>

                <div className="p-6 h-[88px] flex items-center justify-center">
                    <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors text-center leading-tight line-clamp-2">{item.title}</h3>
                </div>
            </Card>
        </motion.div>
    );
};

export const GfxShowcase = () => {
    const [mounted, setMounted] = useState(false);
    const isMobileQuery = useMediaQuery("(max-width: 1024px)");
    const isMobile = mounted && isMobileQuery;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Create a stable random-looking order for the cards
    const shuffleOrder = React.useMemo(() => {
        const arr = gfxData.map((_, i) => i);
        // Simple deterministic shuffle to keep it stable across renders
        for (let i = arr.length - 1; i > 0; i--) {
            const j = (i * 7 + 3) % (i + 1); // Not truly random, but looks random and stays stable
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="py-24 px-6 relative overflow-hidden">
            {/* Background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-auto"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                <Palette size={20} />
                            </div>
                            <span className="text-primary font-bold tracking-widest uppercase text-xs">Visual Arts</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tighter">GFX Design</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6" />
                        <p className="text-muted-foreground max-w-lg">
                            Visual storytelling through static graphics. From branding to digital illustrations and concept art.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 text-left"
                >
                    {gfxData.map((item, index) => (
                        <GfxCard
                            key={item.id}
                            item={item}
                            setSelectedImage={setSelectedImage}
                            index={index}
                            order={shuffleOrder[index]}
                        />
                    ))}
                </motion.div>

                {/* See More - Pinterest Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://pin.it/o8f9moE93"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "group relative flex items-center gap-3 px-8 py-4 border rounded-full transition-all duration-500 shadow-lg",
                            "bg-[#E60023] border-[#E60023] text-white md:bg-[#E60023]/10 md:border-[#E60023]/20 md:text-foreground md:dark:text-white md:hover:bg-[#E60023] md:hover:shadow-[#E60023]/40"
                        )}
                    >
                        {/* 1. Outer Glow (Must be outside overflow-hidden) */}
                        <div className="md:hidden">
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [0.95, 1.15, 0.95]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{ willChange: "transform, opacity" }}
                                className="absolute -inset-3 bg-[#E60023] blur-2xl -z-10 rounded-full"
                            />
                        </div>

                        {/* 2. Inner Clipped Effects (Liquid & Shine) */}
                        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            {/* Liquid Flow (Mobile Only) */}
                            <motion.div
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    background: "linear-gradient(270deg, #ff3d5d, #E60023, #a10018)",
                                    backgroundSize: "200% 200%",
                                    willChange: "background-position"
                                }}
                                className="absolute inset-0 opacity-60 z-0 md:hidden"
                            />

                            {/* Glazing Shine Loop (Mobile) */}
                            <motion.div
                                initial={{ x: "-150%", skewX: -25 }}
                                animate={{ x: "250%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1.5,
                                    ease: "linear"
                                }}
                                style={{ willChange: "transform" }}
                                className="absolute inset-y-0 w-1/2 bg-white/30 z-10 block md:hidden"
                            />

                            {/* Desktop Hover Shine */}
                            <motion.div
                                initial={{ x: "-150%", skewX: -25 }}
                                whileHover={{ x: "250%" }}
                                transition={{ duration: 0.7 }}
                                style={{ willChange: "transform" }}
                                className="absolute inset-y-0 w-1/2 bg-white/10 z-10 hidden md:block"
                            />
                        </div>

                        <div className="relative z-20 flex items-center gap-3">
                            <div className="bg-[#E60023] p-2 rounded-full group-hover:bg-white group-hover:text-[#E60023] transition-colors md:bg-transparent md:text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                >
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.992 5.368 18.625 0 12.017 0z" />
                                </svg>
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">See More on Pinterest</span>
                        </div>
                    </motion.a>
                </motion.div>
            </div>

            {/* Simple Lightbox Modal */}
            <Modal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                className="max-w-4xl p-0 bg-transparent border-none shadow-none"
            >
                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt="Full Preview"
                        className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-all"
                    />
                )}
            </Modal>
        </div>
    );
};
