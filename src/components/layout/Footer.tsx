"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { socialLinks } from "@/data/socialLinks";
import * as Icons from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">
                        {siteConfig.name}
                        <span className="text-primary">.</span>
                    </h3>
                    <p className="text-white/50 max-w-xs">{siteConfig.description}</p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-white uppercase text-xs tracking-widest">Connect</h4>
                    <div className="flex gap-4">
                        {socialLinks.map((link) => {
                            const IconComp = Icons[link.iconName as keyof typeof Icons] as React.ElementType;
                            return (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full glass-morphism text-white/50 hover:text-primary hover:neon-border transition-all"
                                >
                                    {IconComp && <IconComp size={20} />}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-4 text-right md:text-right">
                    <p className="text-white/30 text-sm">
                        © {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
                    </p>
                    <p className="text-white/10 text-xs">Built with Next.js & Framer Motion</p>
                </div>
            </div>
        </footer>
    );
};
