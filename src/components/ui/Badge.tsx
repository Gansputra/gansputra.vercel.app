"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: "outline" | "filled" | "primary";
}

export const Badge = ({ children, className, variant = "outline" }: BadgeProps) => {
    const variants = {
        outline: "border border-border text-muted-foreground",
        filled: "bg-muted text-foreground",
        primary: "bg-primary/20 border border-primary/50 text-primary",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
};
