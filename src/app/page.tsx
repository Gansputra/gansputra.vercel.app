"use client";

import { useActiveSection } from "@/context/ActiveSectionContext";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { AmvShowcase } from "@/components/sections/AmvShowcase";
import { GfxShowcase } from "@/components/sections/GfxShowcase";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

import { Vortex } from "@/components/ui/vortex";

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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00bfcf]/10 to-[#7c7df6]/10" />

      <div className="absolute inset-0 z-0">
        <Vortex
          backgroundColor="transparent"
          rangeY={200}
          particleCount={400}
          baseHue={185}
          rangeHue={55}
          containerClassName="h-full w-full"
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
