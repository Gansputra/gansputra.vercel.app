"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { amvData } from "@/data/amvData";
import { Play, Music, Cpu, Film, Youtube, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVideoThumbnail } from "@/lib/getVideoThumbnail";

export const AmvShowcase = () => {
  const [filter, setFilter] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<typeof amvData[0] | null>(null);

  const categories = ["All", ...Array.from(new Set(amvData.flatMap((amv) => amv.tags)))];

  const filteredAmvs =
    filter === "All"
      ? amvData
      : amvData.filter((amv) => amv.tags.includes(filter));

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
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Film size={14} />
              <span>Cinematic Motion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase">
              AMV Cinema
            </h2>
            <p className="text-muted-foreground max-w-lg mt-3 text-sm md:text-base leading-relaxed">
              High-intensity anime music videos cut, color-graded, and synced in After Effects.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center gap-1.5 p-1 bg-card/80 border border-border/70 rounded-2xl backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
                    filter === cat
                      ? "text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter === cat && (
                    <motion.div
                      layoutId="amvActiveTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-neon -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAmvs.map((amv) => (
              <motion.div
                key={amv.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedVideo(amv)}
                className="group relative rounded-3xl bg-card/75 border border-border/70 hover:border-primary/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer backdrop-blur-xl flex flex-col"
              >
                {/* Thumbnail Area */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                  <img
                    src={getVideoThumbnail(amv.videoUrl)}
                    alt={amv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 rounded-full bg-primary/25 border border-primary/50 flex items-center justify-center backdrop-blur-md shadow-neon group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                      <Play className="text-white fill-white ml-1 w-6 h-6 group-hover:text-primary-foreground group-hover:fill-primary-foreground transition-colors" />
                    </div>
                  </div>

                  {/* Anime Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 text-primary border border-primary/30 backdrop-blur-md">
                      {amv.anime}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {amv.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6">
                      {amv.description}
                    </p>
                  </div>

                  {/* Meta Tags */}
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-2">
                      {amv.music && (
                        <div className="flex items-center gap-1.5 font-mono">
                          <Music size={13} className="text-primary" />
                          <span>{amv.music}</span>
                        </div>
                      )}
                      {amv.software && (
                        <div className="flex items-center gap-1.5 font-mono">
                          <Cpu size={13} className="text-secondary" />
                          <span>{amv.software}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {amv.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-muted text-muted-foreground border border-border/40 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* YouTube Channel Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://youtube.com/@gexvexedit"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-card/80 border border-border/80 hover:border-red-500/50 text-foreground hover:text-red-500 transition-all duration-300 shadow-xl backdrop-blur-xl"
          >
            <Youtube size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest">
              Watch More AMVs on YouTube (@gexvexedit)
            </span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Video Modal Player */}
      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        className="max-w-4xl p-0 bg-black overflow-hidden border border-border/60 rounded-3xl"
      >
        {selectedVideo && (
          <div className="flex flex-col">
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(selectedVideo.videoUrl)}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-card flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-primary uppercase font-bold">{selectedVideo.anime}</p>
                <h4 className="text-xl font-bold text-foreground mt-0.5">{selectedVideo.title}</h4>
              </div>
              <a
                href={selectedVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors"
              >
                <Youtube size={16} />
                <span>Open in YouTube</span>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
