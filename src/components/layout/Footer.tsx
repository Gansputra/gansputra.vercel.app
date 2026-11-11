"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { socialLinks } from "@/data/socialLinks";
import { ArrowUp } from "lucide-react";
import * as Icons from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-card/40 border-t border-border/60 py-16 px-6 backdrop-blur-xl z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <h3 className="text-2xl font-black text-foreground tracking-wider uppercase">
                {siteConfig.name}
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Creative fullstack developer and After Effects motion artist. Building immersive web applications with digital artistry.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-primary/10 text-primary border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Available for Projects
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => scrollTo("hero")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("amvs")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  AMV Cinema
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("gfx")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  GFX & Art
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("projects")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  About Me
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
              Social Links
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((link) => {
                const IconComp = Icons[
                  link.iconName as keyof typeof Icons
                ] as React.ComponentType<{ size?: number }>;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-card border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-neon transition-all"
                    title={link.platform}
                  >
                    {IconComp && <IconComp size={18} />}
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/80 text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer"
              >
                <ArrowUp size={14} />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60 font-mono">
          <p>© {new Date().getFullYear()} Gansputra. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with passion using Next.js & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
