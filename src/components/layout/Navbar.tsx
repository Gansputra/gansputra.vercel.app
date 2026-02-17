"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Home,
    Video,
    Palette,
    Briefcase,
    User,
    Mail,
    Github,
    Instagram,
    Zap,
    ZapOff
} from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { useSettings } from "@/context/SettingsContext";
import { siteConfig } from "@/config/siteConfig";

export const Navbar = () => {
    const { activeSection, setActiveSection } = useActiveSection();
    const { reducedMotion, toggleReducedMotion } = useSettings();

    const links = [
        {
            title: "Home",
            icon: <Home className="h-full w-full text-foreground/70" />,
            href: "#hero",
            onClick: () => setActiveSection("hero"),
            active: activeSection === "hero",
        },
        {
            title: "AMVs",
            icon: <Video className="h-full w-full text-foreground/70" />,
            href: "#amvs",
            onClick: () => setActiveSection("amvs"),
            active: activeSection === "amvs",
        },
        {
            title: "GFX",
            icon: <Palette className="h-full w-full text-foreground/70" />,
            href: "#gfx",
            onClick: () => setActiveSection("gfx"),
            active: activeSection === "gfx",
        },
        {
            title: "Projects",
            icon: <Briefcase className="h-full w-full text-foreground/70" />,
            href: "#projects",
            onClick: () => setActiveSection("projects"),
            active: activeSection === "projects",
        },
        {
            title: "About",
            icon: <User className="h-full w-full text-foreground/70" />,
            href: "#about",
            onClick: () => setActiveSection("about"),
            active: activeSection === "about",
        },
        {
            title: "Contact",
            icon: <Mail className="h-full w-full text-foreground/70" />,
            href: "#contact",
            onClick: () => setActiveSection("contact"),
            active: activeSection === "contact",
        },
        {
            title: "GitHub",
            icon: <Github className="h-full w-full text-foreground/70" />,
            href: siteConfig.links.github,
        },
        {
            title: "Instagram",
            icon: <Instagram className="h-full w-full text-foreground/70" />,
            href: siteConfig.links.instagram,
        },
        {
            title: reducedMotion ? "Enable Motion" : "Reduce Motion",
            icon: reducedMotion ? <ZapOff className="h-full w-full text-foreground/70" /> : <Zap className="h-full w-full text-foreground/70" />,
            href: "#",
            onClick: toggleReducedMotion,
            desktopOnly: true,
        },
    ];

    return (
        <div className="fixed top-6 left-6 right-6 md:top-1/2 md:left-10 md:right-auto md:w-auto md:-translate-y-1/2 z-[100] flex md:flex-col items-center justify-between md:justify-center gap-6 pointer-events-none">
            {/* Dock: Top Left on mobile, Bottom on desktop sidebar */}
            <div className="pointer-events-auto order-first md:order-last">
                <FloatingDock
                    items={links}
                    desktopClassName="bg-card border-border shadow-xl dark:shadow-[0_0_20px_rgba(0,191,207,0.15)]"
                    mobileClassName=""
                />
            </div>

            {/* Toggle: Top Right on mobile, Top on desktop sidebar */}
            <div className="pointer-events-auto order-last md:order-first">
                <ThemeToggle />
            </div>
        </div>
    );
};
