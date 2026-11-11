"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { projectData } from "@/data/projectData";
import {
  ExternalLink,
  Github,
  Eye,
  ChevronLeft,
  ChevronRight,
  Code2,
  Sparkles,
  LayoutGrid,
  Box,
} from "lucide-react";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Project3DGallery } from "@/components/ui/Project3DGallery";

const ProjectCard = ({
  project,
  onPreview,
  index,
}: {
  project: Project;
  onPreview: (p: Project) => void;
  index: number;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="h-full rounded-3xl bg-card/75 border border-border/70 hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col group backdrop-blur-xl">
        {/* Project Image Preview / Mockup Frame */}
        <div
          className="relative aspect-video w-full overflow-hidden bg-muted/40 cursor-pointer"
          onClick={() => onPreview(project)}
        >
          {/* Top fake browser dots bar */}
          <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2 bg-background/60 backdrop-blur-md flex items-center gap-1.5 border-b border-border/40">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <div className="ml-2 text-[10px] font-mono text-muted-foreground/60 truncate">
              {project.title.toLowerCase().replace(/\s+/g, "-")}.dev
            </div>
          </div>

          <img
            src={project.previewImage}
            alt={project.title}
            className="w-full h-full object-cover pt-6 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Hover Overlay with Action */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-30 pt-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(project);
              }}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-2 shadow-neon hover:scale-105 transition-transform cursor-pointer"
            >
              <Eye size={14} />
              <span>Preview Gallery</span>
            </button>
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-card text-foreground hover:text-primary border border-border/80 shadow-md hover:scale-105 transition-transform"
                title="View Source"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Project Meta Information */}
        <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="GitHub Repository"
                >
                  <Github size={18} />
                </a>
              )}
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border/50 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={() => onPreview(project)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Screenshots</span>
              <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "3d">("grid");

  const images =
    selectedProject?.gallery && selectedProject.gallery.length > 0
      ? selectedProject.gallery
      : selectedProject
      ? [selectedProject.previewImage]
      : [];

  useEffect(() => {
    if (!selectedProject || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [selectedProject, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!selectedProject) {
      setCurrentIndex(0);
    }
  }, [selectedProject]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                <Code2 size={14} />
                <span>Selected Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase">
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-lg mt-3 text-sm md:text-base leading-relaxed">
                Scalable web applications, APIs, and functional software engineered with modern web technologies.
              </p>
            </div>

            {/* View Mode Toggle: Grid vs 3D */}
            <div className="flex items-center p-1 bg-card/80 border border-border/70 rounded-2xl self-start md:self-auto backdrop-blur-md shadow-md">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider cursor-pointer",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-neon"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider cursor-pointer",
                  viewMode === "3d"
                    ? "bg-primary text-primary-foreground shadow-neon"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Box size={14} />
                <span>3D Expo</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* View Mode Content */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projectData.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onPreview={setSelectedProject}
                    index={index}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="3d-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Project3DGallery onPreview={setSelectedProject} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* See More on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/gansputra"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-card/80 border border-border/80 hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300 shadow-xl backdrop-blur-xl"
          >
            <Github size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest">
              More Repositories on GitHub
            </span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* High-Resolution Project Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        className="max-w-4xl p-0 bg-card border border-border/80 overflow-hidden rounded-3xl"
      >
        {selectedProject && (
          <div className="flex flex-col">
            {/* Gallery Image Display */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={selectedProject.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-primary hover:text-primary-foreground backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-primary hover:text-primary-foreground backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all cursor-pointer",
                        i === currentIndex ? "w-6 bg-primary" : "bg-white/40"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Modal Info Footer */}
            <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.repoLink && (
                <a
                  href={selectedProject.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs shadow-neon hover:scale-105 transition-transform"
                >
                  <Github size={16} />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
