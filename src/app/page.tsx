import { HeroSection } from "@/components/sections/HeroSection";
import { AmvShowcase } from "@/components/sections/AmvShowcase";
import { GfxShowcase } from "@/components/sections/GfxShowcase";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Decorative Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <AmvShowcase />
      <GfxShowcase />
      <ProjectShowcase />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
