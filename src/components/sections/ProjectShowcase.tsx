"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { projectData } from "@/data/projectData";
import { ExternalLink, Github, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/types/project";

export const ProjectShowcase = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = selectedProject?.gallery && selectedProject.gallery.length > 0
        ? selectedProject.gallery
        : selectedProject ? [selectedProject.previewImage] : [];

    useEffect(() => {
        if (!selectedProject || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

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
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    return (
        <div className="py-24 px-6 bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Development Projects</h2>
                    <p className="text-white/50 max-w-lg">
                        Where code meets creativity. A selection of my professional and experimental engineering works.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projectData.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full flex flex-col justify-between group" glow>
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3">
                                            {project.repoLink && (
                                                <a
                                                    href={project.repoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white/40 hover:text-white transition-all transform hover:scale-110"
                                                >
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="text-white/40 hover:text-primary transition-all transform hover:scale-110 cursor-pointer"
                                                title="View Previews"
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-white/60 mb-8 leading-relaxed flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.stack.map(tech => (
                                            <Badge key={tech} variant="primary">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Project Preview Modal */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                className="max-w-5xl bg-[#0a0a0a] border-white/10"
            >
                {selectedProject && (
                    <div className="p-6 md:p-10">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                            <p className="text-white/50">{selectedProject.description}</p>
                        </div>

                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-morphism border border-white/10 group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={`${selectedProject.title} preview ${currentIndex + 1}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                            {/* Controls */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-primary hover:text-black transition-all backdrop-blur-md z-10"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-primary hover:text-black transition-all backdrop-blur-md z-10"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Dots */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx
                                                    ? "bg-primary w-6"
                                                    : "bg-white/40 hover:bg-white"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
