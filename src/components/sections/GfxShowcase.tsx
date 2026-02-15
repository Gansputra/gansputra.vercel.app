"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { gfxData } from "@/data/gfxData";
import { Maximize2, Palette } from "lucide-react";

export const GfxShowcase = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="py-24 px-6 relative overflow-hidden bg-black/50">
            {/* Background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-auto"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                                <Palette size={20} />
                            </div>
                            <span className="text-secondary font-bold tracking-widest uppercase text-xs">Visual Arts</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">GFX Design</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-secondary to-transparent rounded-full mb-6" />
                        <p className="text-white/50 max-w-lg">
                            Visual storytelling through static graphics. From branding to digital illustrations and concept art.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
                >
                    {gfxData.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-0 border-none bg-white/[0.02] overflow-hidden group cursor-pointer h-full flex flex-col" glow>
                                {/* Image Container */}
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />

                                    {/* Overlay Action */}
                                    <div
                                        onClick={() => setSelectedImage(item.image)}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm"
                                    >
                                        <div className="p-4 rounded-full bg-secondary/20 border border-secondary/50 text-secondary translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <Maximize2 size={24} />
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest border border-secondary/30">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors line-clamp-1 text-center">{item.title}</h3>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* See More - Pinterest Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <a
                        href="https://pin.it/o8f9moE93"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 px-8 py-4 bg-[#E60023]/10 hover:bg-[#E60023] border border-[#E60023]/20 text-white rounded-full transition-all duration-500 shadow-lg hover:shadow-[#E60023]/40 overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"
                        />
                        <div className="bg-[#E60023] p-2 rounded-full group-hover:bg-white group-hover:text-[#E60023] transition-colors relative z-10">
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="currentColor"
                            >
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.992 5.368 18.625 0 12.017 0z" />
                            </svg>
                        </div>
                        <span className="font-bold tracking-wider uppercase text-sm relative z-10">See More on Pinterest</span>
                    </a>
                </motion.div>
            </div>

            {/* Simple Lightbox Modal */}
            <Modal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                className="max-w-4xl p-0 bg-transparent border-none shadow-none"
            >
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full rounded-2xl overflow-hidden text-center"
                    >
                        <img
                            src={selectedImage}
                            alt="Full Preview"
                            className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                        />
                    </motion.div>
                )}
            </Modal>
        </div>
    );
};
