"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { projectData } from "@/data/projectData";
import { ExternalLink, Github, Eye, ChevronLeft, ChevronRight, Terminal } from "lucide-react";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ProjectCard = ({ project, onPreview, index }: { project: Project, onPreview: (p: Project) => void, index: number }) => {
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isMobileQuery = useMediaQuery("(max-width: 1024px)");
    const isMobile = mounted && isMobileQuery;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={isMobile ? {} : { y: -5 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col justify-between group relative overflow-hidden" glow>
                {/* Metallic Shine Effect (Mobile only) */}
                {isMobile && (
                    <motion.div
                        initial={{ left: "-150%", skewX: -25 }}
                        animate={{ left: "150%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            repeatDelay: (index % 5) + 2,
                            ease: "easeInOut"
                        }}
                        className="absolute top-[-50%] bottom-[-50%] w-32 bg-gradient-to-r from-transparent via-primary/10 to-transparent z-10 pointer-events-none blur-sm"
                    />
                )}

                {/* Code-Flow Terminal (Desktop only) */}
                {!isMobile && (
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute top-4 right-16 z-20 pointer-events-none"
                            >
                                <div className="bg-card/95 border border-primary/30 rounded-lg p-3 shadow-2xl backdrop-blur-xl min-w-[140px]">
                                    <div className="flex items-center gap-2 mb-2 border-b border-primary/20 pb-1">
                                        <Terminal size={12} className="text-primary" />
                                        <span className="text-[10px] font-mono text-primary/70 uppercase">Process Log</span>
                                    </div>
                                    <div className="space-y-1 font-mono text-[9px]">
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground">{">"} initializing_stack</motion.div>
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-primary/60">{">"} load: {project.stack[0]}</motion.div>
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-muted-foreground">{">"} status: <span className="text-green-500">READY</span></motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                <div className="flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className={cn(
                            "text-2xl font-bold text-foreground transition-all duration-500",
                            !isMobile && isHovered && "text-primary translate-x-1"
                        )}>
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-1">
                            {project.repoLink && (
                                <motion.a
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground/40 hover:text-foreground transition-all p-2 flex items-center justify-center"
                                >
                                    <Github size={20} />
                                </motion.a>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onPreview(project)}
                                className="text-foreground/40 hover:text-primary transition-all p-2 cursor-pointer flex items-center justify-center"
                                title="View Previews"
                            >
                                <Eye size={20} />
                            </motion.button>
                        </div>
                    </div>

                    <div className="relative mb-8">
                        <p className="text-foreground/60 leading-relaxed flex-grow min-h-[80px]">
                            {!isMobile && isHovered ? (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {project.description}
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="inline-block w-1 h-4 bg-primary ml-1 translate-y-0.5"
                                    />
                                </motion.span>
                            ) : project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.stack.map((tech) => (
                            <Badge key={tech} variant="primary">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export const ProjectShowcase = () => {
    const [mounted, setMounted] = useState(false);
    const isMobileQuery = useMediaQuery("(max-width: 1024px)");
    const isMobile = mounted && isMobileQuery;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

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
        <div className="py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left"
                >
                    <h2 className="text-4xl font-bold text-foreground mb-4">Development Projects</h2>
                    <p className="text-muted-foreground max-w-lg">
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
                    {projectData.map((project, index) => (
                        <ProjectCard key={project.id} project={project} onPreview={setSelectedProject} index={index} />
                    ))}
                </motion.div>

                {/* See More - GitHub Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/gansputra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "group relative flex items-center gap-3 px-8 py-4 border rounded-full transition-all duration-500 shadow-lg overflow-hidden",
                            "bg-primary border-primary text-primary-foreground md:bg-primary/10 md:border-primary/20 md:text-foreground md:dark:text-white md:hover:bg-primary md:hover:text-primary-foreground md:hover:shadow-primary/40"
                        )}
                    >
                        {/* 1. Outer Glow (Must be outside overflow-hidden) */}
                        <div className="md:hidden">
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [0.95, 1.15, 0.95]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{ willChange: "transform, opacity" }}
                                className="absolute -inset-3 bg-primary blur-2xl -z-10 rounded-full"
                            />
                        </div>

                        {/* 2. Inner Clipped Effects (Liquid & Shine) */}
                        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            {/* Liquid Flow (Mobile Only) */}
                            <motion.div
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    background: "linear-gradient(270deg, var(--primary), #00f2ff, #008fa3)",
                                    backgroundSize: "200% 200%",
                                    willChange: "background-position"
                                }}
                                className="absolute inset-0 opacity-60 z-0 md:hidden"
                            />

                            {/* Glazing Shine Loop (Mobile) */}
                            <motion.div
                                initial={{ x: "-150%", skewX: -25 }}
                                animate={{ x: "250%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1.5,
                                    ease: "linear"
                                }}
                                style={{ willChange: "transform" }}
                                className="absolute inset-y-0 w-1/2 bg-white/30 z-10 block md:hidden"
                            />

                            {/* Desktop Hover Shine */}
                            <motion.div
                                initial={{ x: "-150%", skewX: -25 }}
                                whileHover={{ x: "250%" }}
                                transition={{ duration: 0.7 }}
                                style={{ willChange: "transform" }}
                                className="absolute inset-y-0 w-1/2 bg-white/10 z-10 hidden md:block"
                            />
                        </div>

                        <div className="relative z-20 flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-full group-hover:bg-white group-hover:text-primary transition-colors md:bg-transparent md:text-primary-foreground">
                                <Github size={20} />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">See More on GitHub</span>
                        </div>
                    </motion.a>
                </motion.div>
            </div>

            {/* Project Preview Modal */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                className="max-w-[90vw] md:max-w-6xl h-[80vh] bg-background/95 border border-border overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-3xl p-0"
            >
                {selectedProject && (
                    <div className="relative w-full h-full group">
                        {/* Edge-to-Edge Image Container */}
                        <div className="absolute inset-0 w-full h-full bg-black">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={`${selectedProject.title} preview ${currentIndex + 1}`}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                                    className="w-full h-full object-cover object-top"
                                />
                            </AnimatePresence>

                            {/* Modern Gradient Overlays for Readability */}
                            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background/80 via-background/40 to-transparent z-10" />
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/60 to-transparent z-10" />
                        </div>

                        {/* Floating Glass Info Header */}
                        <motion.div
                            className="absolute top-4 left-4 right-4 md:top-8 md:left-10 md:right-10 z-20"
                        >
                            <div className="glass-morphism border border-border p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-8 backdrop-blur-3xl bg-card shadow-2xl">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 md:gap-5 mb-2">
                                        <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tighter uppercase italic leading-tight truncate md:whitespace-normal md:overflow-visible">
                                            {selectedProject.title}
                                        </h3>
                                        <motion.a
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            href={selectedProject.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-primary/10 hover:bg-primary border border-primary/20 text-primary hover:text-black rounded-full transition-all shrink-0 shadow-lg shadow-black/20"
                                        >
                                            <Github size={18} />
                                        </motion.a>
                                    </div>
                                    <p className="text-foreground/60 text-xs md:text-sm lg:text-base max-w-2xl line-clamp-2 md:line-clamp-none font-medium leading-relaxed">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 md:gap-2 lg:justify-end shrink-0 max-w-full lg:max-w-[300px]">
                                    {selectedProject.stack.map(tech => (
                                        <Badge key={tech} variant="primary" className="bg-primary/5 border-primary/20 text-[9px] md:text-[10px] px-2 py-0.5 whitespace-nowrap">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Immersive Controls */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-all border border-white/10 backdrop-blur-xl z-30 opacity-0 group-hover:opacity-100 ring-4 ring-black/20"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-all border border-white/10 backdrop-blur-xl z-30 opacity-0 group-hover:opacity-100 ring-4 ring-black/20"
                                >
                                    <ChevronRight size={32} />
                                </button>

                                {/* Dot Indicators at Bottom */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 px-6 py-3 bg-card/40 backdrop-blur-md rounded-full border border-border">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? "bg-primary w-8 shadow-[0_0_10px_rgba(var(--primary),0.8)]" : "bg-foreground/20 w-3 hover:bg-foreground/40"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};
