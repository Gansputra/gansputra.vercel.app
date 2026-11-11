"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Video,
  Palette,
  Briefcase,
  User,
  Mail,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: <Home size={15} /> },
  { id: "amvs", label: "AMVs", icon: <Video size={15} /> },
  { id: "gfx", label: "GFX", icon: <Palette size={15} /> },
  { id: "projects", label: "Projects", icon: <Briefcase size={15} /> },
  { id: "about", label: "About", icon: <User size={15} /> },
  { id: "contact", label: "Contact", icon: <Mail size={15} /> },
];

export const Navbar = () => {
  const { activeSection, setActiveSection } = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      {/* Desktop Floating Capsule */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl",
          scrolled
            ? "bg-card/85 border-border/70 shadow-black/30"
            : "bg-card/60 border-border/40 shadow-black/20"
        )}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 pl-3 pr-4 py-1.5 text-xs font-black tracking-wider uppercase text-foreground hover:text-primary transition-colors group cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse group-hover:scale-125 transition-transform" />
          <span>GANSPUTRA</span>
        </button>

        <div className="h-4 w-[1px] bg-border/60 mx-1" />

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 flex items-center gap-1.5 cursor-pointer",
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-neon"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-4 w-[1px] bg-border/60 mx-1" />

        {/* Theme Control */}
        <div className="flex items-center pr-1 pl-1">
          <ThemeToggle />
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <div className="pointer-events-auto flex md:hidden items-center justify-between w-full max-w-md px-4 py-2.5 rounded-2xl bg-card/85 backdrop-blur-xl border border-border/70 shadow-2xl">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-foreground"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>GANSPUTRA</span>
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-muted/50 text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto md:hidden fixed top-20 left-4 right-4 p-4 rounded-3xl bg-card/95 backdrop-blur-2xl border border-border/80 shadow-2xl z-50 flex flex-col gap-2"
          >
            <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase px-2 py-1">
              Navigate
            </div>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-neon"
                      : "text-foreground hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isActive && <Sparkles size={14} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
