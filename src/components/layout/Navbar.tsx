"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { useActiveSection } from "@/context/ActiveSectionContext";

const navItems = [
    { name: "Home", id: "hero" },
    { name: "AMVs", id: "amvs" },
    { name: "GFX", id: "gfx" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
];

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { activeSection, setActiveSection } = useActiveSection();

    const handleNavClick = (id: string) => {
        setActiveSection(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 px-6 py-4"
        >
            <div className={cn(
                "max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500",
                activeSection !== "hero" ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl" : "bg-transparent"
            )}>
                <motion.button
                    onClick={() => handleNavClick("hero")}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold tracking-tighter text-white group"
                >
                    {siteConfig.name.toUpperCase()}
                    <span className="text-primary group-hover:animate-pulse">.</span>
                </motion.button>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item, i) => (
                        <motion.button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full outline-none",
                                activeSection === item.id ? "text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <span className="relative z-10">{item.name}</span>
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="navActive"
                                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-all"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                                <Menu size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-3xl md:hidden"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-x-6 top-24 bottom-12 z-[150] bg-black/60 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-3xl justify-center"
                        >
                            <div className="flex flex-col gap-6 items-center">
                                {navItems.map((item, i) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNavClick(item.id)}
                                        className={cn(
                                            "text-2xl font-bold tracking-tight py-3 transition-all relative group",
                                            activeSection === item.id ? "text-white" : "text-white/30"
                                        )}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        {activeSection === item.id && (
                                            <motion.div
                                                layoutId="mobileActiveGlow"
                                                className="absolute -inset-x-6 inset-y-0 bg-primary/10 blur-xl rounded-full -z-10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            />
                                        )}
                                        <div className={cn(
                                            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 rounded-full",
                                            activeSection === item.id ? "w-4" : "group-hover:w-8 opacity-50"
                                        )} />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};
