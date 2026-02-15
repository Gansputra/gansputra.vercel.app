"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md"
                    />
                    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className={cn(
                                "pointer-events-auto relative w-full max-w-4xl rounded-2xl bg-[#0a0a0a] border border-white/10 p-4 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                className
                            )}
                        >
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-50 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            {title && <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>}
                            <div className="relative">{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
