"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { gfxData, GFXDesign } from "@/data/gfxData";
import { Maximize2, Palette, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export const GfxShowcase = () => {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GFXDesign | null>(null);

  const categories = ["All", ...Array.from(new Set(gfxData.map((item) => item.category)))];

  const filteredItems =
    filter === "All"
      ? gfxData
      : gfxData.filter((item) => item.category === filter);

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Palette size={14} />
              <span>Digital Artwork</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase">
              GFX & Poster Design
            </h2>
            <p className="text-muted-foreground max-w-lg mt-3 text-sm md:text-base leading-relaxed">
              Visual identity, high-contrast poster design, anime character concept art, and digital illustrations.
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
                      layoutId="gfxActiveTab"
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

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-3xl bg-card/75 border border-border/70 hover:border-primary/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer backdrop-blur-xl flex flex-col"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-background/80 text-foreground border border-border/70 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Action Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="p-3.5 rounded-full bg-primary/80 text-primary-foreground backdrop-blur-md shadow-neon scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 size={20} />
                    </div>
                  </div>

                  {/* Card Title Info at Bottom of Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pinterest Gallery Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://pin.it/o8f9moE93"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-card/80 border border-border/80 hover:border-secondary/50 text-foreground hover:text-secondary transition-all duration-300 shadow-xl backdrop-blur-xl"
          >
            <Palette size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest">
              Explore Full Gallery on Pinterest
            </span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        className="max-w-3xl p-0 bg-card border border-border/80 overflow-hidden rounded-3xl"
      >
        {selectedItem && (
          <div className="flex flex-col">
            <div className="relative max-h-[75vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between gap-4">
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-primary/20 text-primary mb-2">
                  {selectedItem.category}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
