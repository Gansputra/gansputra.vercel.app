"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import { Magnetic } from "./Magnetic";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "glow" | "ghost";
    size?: "sm" | "md" | "lg";
    isMagnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isMagnetic = true, children, ...props }, ref) => {
        const variants = {
            primary: "bg-white text-black hover:bg-white/90",
            secondary: "bg-primary text-black hover:bg-primary/90 shadow-neon",
            outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
            glow: "bg-transparent border border-primary/50 text-primary hover:bg-primary/10 shadow-glow",
            ghost: "bg-transparent hover:bg-white/5 text-white/70 hover:text-white",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-6 py-2.5",
            lg: "px-8 py-4 text-lg font-bold",
        };

        const content = (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative overflow-hidden rounded-full transition-colors duration-200 flex items-center justify-center gap-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );

        if (isMagnetic) {
            return <Magnetic strength={0.2}>{content}</Magnetic>;
        }

        return content;
    }
);

Button.displayName = "Button";
