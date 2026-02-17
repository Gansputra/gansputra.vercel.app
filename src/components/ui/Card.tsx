"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import { HoverTilt } from "./HoverTilt";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
}

export const Card = ({ children, className, glow = false }: CardProps) => {
    return (
        <HoverTilt maxRotation={5}>
            <motion.div
                whileHover={{ y: -5 }}
                className={cn(
                    "group relative overflow-hidden rounded-2xl glass-morphism p-6 transition-all duration-300 h-full",
                    glow && "hover:neon-border",
                    className
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">{children}</div>
            </motion.div>
        </HoverTilt>
    );
};
