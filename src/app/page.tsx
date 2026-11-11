"use client";

import React, { useEffect } from "react";
import { useMusicTheme } from "@/context/MusicThemeContext";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { AmvShowcase } from "@/components/sections/AmvShowcase";
import { GfxShowcase } from "@/components/sections/GfxShowcase";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

import { Vortex } from "@/components/ui/vortex";
import { HeroGlobe } from "@/components/ui/HeroGlobe";
import { cn } from "@/lib/utils";

export default function Home() {
  const { activeSection, setActiveSection } = useActiveSection();
  const { theme } = useMusicTheme();

  // ScrollSpy using IntersectionObserver for continuous vertical scroll
  useEffect(() => {
    const sectionIds = ["hero", "amvs", "gfx", "projects", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [setActiveSection]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Layer: 3D Universe + Dynamic Ambient Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* The 3D Universe Stack (high perf: pauses heavy computation when scrolled past hero) */}
        <div className="absolute inset-0 z-0 opacity-80 transition-opacity duration-1000">
          <HeroGlobe isHeroActive={activeSection === "hero"} />
        </div>

        {/* Ambient Dark Gradient Vignette for Depth */}
        <div
          className={cn(
            "absolute inset-0 z-[1] transition-all duration-1000 ease-in-out pointer-events-none",
            activeSection === "hero"
              ? "opacity-30"
              : "bg-background/80 backdrop-blur-[3px]"
          )}
        />

        {/* Optimized Vortex Particles Overlay */}
        <Vortex
          backgroundColor="transparent"
          particleCount={200}
          baseHue={theme.baseHue}
          rangeHue={theme.rangeHue}
          showDust={true}
          containerClassName="absolute inset-0 z-[2] opacity-50"
        />
      </div>

      {/* Main Content Flow */}
      <div className="relative z-10 flex flex-col w-full">
        <section id="hero" className="relative min-h-screen flex items-center justify-center">
          <HeroSection />
        </section>

        <section id="amvs" className="relative scroll-mt-24">
          <AmvShowcase />
        </section>

        <section id="gfx" className="relative scroll-mt-24">
          <GfxShowcase />
        </section>

        <section id="projects" className="relative scroll-mt-24">
          <ProjectShowcase />
        </section>

        <section id="about" className="relative scroll-mt-24">
          <AboutSection />
        </section>

        <section id="contact" className="relative scroll-mt-24">
          <ContactSection />
        </section>

        <Footer />
      </div>
    </div>
  );
}
