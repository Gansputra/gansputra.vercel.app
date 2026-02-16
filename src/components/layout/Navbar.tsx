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
import { useActiveSection } from "@/context/ActiveSectionContext";
import { useSettings } from "@/context/SettingsContext";
import { siteConfig } from "@/config/siteConfig";

export const Navbar = () => {
    const { activeSection, setActiveSection } = useActiveSection();
    const { reducedMotion, toggleReducedMotion } = useSettings();

    const links = [
        {
            title: "Home",
            icon: <Home className="h-full w-full text-neutral-300" />,
            href: "#hero",
            onClick: () => setActiveSection("hero"),
            active: activeSection === "hero",
        },
        {
            title: "AMVs",
            icon: <Video className="h-full w-full text-neutral-300" />,
            href: "#amvs",
            onClick: () => setActiveSection("amvs"),
            active: activeSection === "amvs",
        },
        {
            title: "GFX",
            icon: <Palette className="h-full w-full text-neutral-300" />,
            href: "#gfx",
            onClick: () => setActiveSection("gfx"),
            active: activeSection === "gfx",
        },
        {
            title: "Projects",
            icon: <Briefcase className="h-full w-full text-neutral-300" />,
            href: "#projects",
            onClick: () => setActiveSection("projects"),
            active: activeSection === "projects",
        },
        {
            title: "About",
            icon: <User className="h-full w-full text-neutral-300" />,
            href: "#about",
            onClick: () => setActiveSection("about"),
            active: activeSection === "about",
        },
        {
            title: "Contact",
            icon: <Mail className="h-full w-full text-neutral-300" />,
            href: "#contact",
            onClick: () => setActiveSection("contact"),
            active: activeSection === "contact",
        },
        {
            title: "GitHub",
            icon: <Github className="h-full w-full text-neutral-300" />,
            href: siteConfig.links.github,
        },
        {
            title: "Instagram",
            icon: <Instagram className="h-full w-full text-neutral-300" />,
            href: siteConfig.links.instagram,
        },
        {
            title: reducedMotion ? "Enable Motion" : "Reduce Motion",
            icon: reducedMotion ? <ZapOff className="h-full w-full text-neutral-300" /> : <Zap className="h-full w-full text-neutral-300" />,
            href: "#",
            onClick: toggleReducedMotion,
        },
    ];

    return (
        <div className="fixed top-10 md:top-1/2 md:-translate-y-1/2 left-6 md:left-10 z-[100] flex flex-col items-center pointer-events-none">
            <div className="pointer-events-auto">
                <FloatingDock
                    items={links}
                    desktopClassName="bg-black/40 backdrop-blur-xl border-white/10"
                    mobileClassName=""
                />
            </div>
        </div>
    );
};
