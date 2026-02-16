"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { amvData } from "@/data/amvData";
import { Play, Music, Cpu, Calendar, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVideoThumbnail } from "@/lib/getVideoThumbnail";
import { Magnetic } from "@/components/ui/Magnetic";

export const AmvShowcase = () => {
    const [filter, setFilter] = useState("All");
    const [selectedVideo, setSelectedVideo] = useState<typeof amvData[0] | null>(null);

    const categories = ["All", ...Array.from(new Set(amvData.flatMap(amv => amv.tags)))];

    const filteredAmvs = filter === "All"
        ? amvData
        : amvData.filter(amv => amv.tags.includes(filter));

    const getEmbedUrl = (url: string) => {
        let videoId = "";
        if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        }
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4 text-3xl md:text-4xl">AMV Gallery</h2>
                        <p className="text-white/50 max-w-lg mx-auto md:mx-0 text-sm md:text-base">
                            Cinematic edits synchronized with rhythm and soul. Explore my creative motion works.
                        </p>
                    </motion.div>

                    {/* Modern Horizontal Category Filter */}
                    <div className="w-full md:w-auto overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                        <div className="flex gap-2 min-w-max pb-2 justify-center md:justify-end">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className="relative px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap group"
                                >
                                    {filter === cat && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-primary rounded-full shadow-neon"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={cn(
                                        "relative z-10 uppercase tracking-widest transition-colors duration-300",
                                        filter === cat ? "text-black" : "text-white/50 group-hover:text-white"
                                    )}>
                                        {cat}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredAmvs.length > 0 ? (
                            filteredAmvs.map((amv) => (
                                <motion.div
                                    key={amv.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedVideo(amv)}
                                >
                                    <Card className="p-0 border-none bg-black/40 h-full flex flex-col group/card" glow>
                                        <div className="relative group aspect-video bg-[#111] cursor-pointer overflow-hidden rounded-t-2xl">
                                            <img
                                                src={getVideoThumbnail(amv.videoUrl)}
                                                alt={amv.title}
                                                className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 md:opacity-60 group-hover/card:opacity-100"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-primary/50"
                                                >
                                                    <Play className="text-primary fill-primary ml-1" />
                                                </motion.div>
                                            </div>
                                            <div className="absolute bottom-4 left-4 z-20">
                                                <p className="text-xs text-primary font-bold uppercase tracking-widest">{amv.anime}</p>
                                                <h3 className="text-xl font-bold text-white group-hover/card:text-primary transition-colors">{amv.title}</h3>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow">
                                            <p className="text-sm text-white/60 mb-4 line-clamp-2">{amv.description}</p>

                                            <div className="flex flex-col gap-2 mb-4">
                                                {amv.music && (
                                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                                        <Music size={14} className="text-primary" />
                                                        <span className="truncate">{amv.music}</span>
                                                    </div>
                                                )}
                                                {amv.software && (
                                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                                        <Cpu size={14} className="text-primary" />
                                                        <span className="truncate">{amv.software}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 text-xs text-white/40">
                                                    <Calendar size={14} className="text-primary" />
                                                    <span>{amv.date}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {amv.tags.map(tag => (
                                                    <Badge key={tag}>{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center"
                            >
                                <p className="text-white/30 font-mono tracking-widest uppercase">No projects found in this category</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* See More - YouTube Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <Magnetic strength={0.2} range={100}>
                        <a
                            href="https://youtube.com/@gexvexedit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center gap-3 px-8 py-4 bg-[#FF0000]/10 hover:bg-[#FF0000] border border-[#FF0000]/20 text-white rounded-full transition-all duration-500 shadow-lg hover:shadow-[#FF0000]/40 overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"
                            />
                            <div className="bg-[#FF0000] p-2 rounded-full group-hover:bg-white group-hover:text-[#FF0000] transition-colors relative z-10">
                                <Youtube size={20} />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm relative z-10">See More on YouTube</span>
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            {/* Video Player Modal */}
            <Modal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                className="max-w-4xl p-0 bg-black overflow-hidden border-none"
            >
                {selectedVideo && (
                    <div className="aspect-video w-full">
                        <iframe
                            width="100%"
                            height="100%"
                            src={getEmbedUrl(selectedVideo.videoUrl)}
                            title={selectedVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </Modal>
        </div>
    );
};
