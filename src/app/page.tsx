"use client";

import { useMusicTheme } from "@/context/MusicThemeContext";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { AmvShowcase } from "@/components/sections/AmvShowcase";
import { GfxShowcase } from "@/components/sections/GfxShowcase";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

import { Vortex } from "@/components/ui/vortex";
import { HeroGlobe } from "@/components/ui/HeroGlobe";
import { cn } from "@/lib/utils";

const sectionComponents: Record<string, React.ReactNode> = {
  hero: <HeroSection />,
  amvs: <AmvShowcase />,
  gfx: <GfxShowcase />,
  projects: <ProjectShowcase />,
  about: <AboutSection />,
  contact: <ContactSection />,
};

export default function Home() {
  const { activeSection } = useActiveSection();
  const { theme } = useMusicTheme();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* The 3D Universe Stack */}
        <div className="absolute inset-0 z-[-1]">
          <HeroGlobe isHeroActive={activeSection === 'hero'} />
        </div>

        {/* Section-specific background dimming */}
        <div
          className={cn(
            "absolute inset-0 z-0 transition-all duration-1000 ease-in-out",
            activeSection === 'hero' ? "opacity-0" : "bg-background/60 backdrop-blur-[2px]"
          )}
        />

        {/* Vortex Particles Overlay */}
        <Vortex
          backgroundColor="transparent"
          particleCount={400}
          baseHue={theme.baseHue}
          rangeHue={theme.rangeHue}
          showDust={true}
          containerClassName="absolute inset-0 z-10"
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20, filter: "blur(20px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20, filter: "blur(20px)" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth relative z-10"
        >
          <div className="min-h-full w-full flex flex-col">
            {sectionComponents[activeSection] || <HeroSection />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
