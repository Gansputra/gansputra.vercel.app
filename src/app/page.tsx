"use client";

import { useActiveSection } from "@/context/ActiveSectionContext";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { AmvShowcase } from "@/components/sections/AmvShowcase";
import { GfxShowcase } from "@/components/sections/GfxShowcase";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

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
      {/* Cinematic Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

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

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse transition-all duration-1000" />
      </div>
    </div>
  );
}
