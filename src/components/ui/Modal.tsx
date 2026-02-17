"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] overflow-y-auto no-scrollbar bg-background/95 backdrop-blur-xl flex justify-center py-10 px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-0 cursor-zoom-out"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                            "relative z-10 w-full max-w-5xl pointer-events-auto self-center",
                            className
                        )}
                    >
                        {/* Integrated Close Button */}
                        <div className="absolute -top-12 right-0 md:-right-12 md:top-0">
                            <button
                                onClick={onClose}
                                className="p-2 text-foreground/50 hover:text-foreground transition-all transform hover:scale-110"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {title && <h3 className="mb-6 text-2xl md:text-3xl font-bold text-foreground text-center tracking-tight leading-tight">{title}</h3>}

                        <div className="flex flex-col items-center justify-center w-full h-full">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
