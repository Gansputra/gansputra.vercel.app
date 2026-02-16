"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

interface HoverTiltProps {
    children: React.ReactNode;
    maxRotation?: number;
    perspective?: number;
    className?: string;
}

export const HoverTilt = ({
    children,
    maxRotation = 10,
    perspective = 1000,
    className = ""
}: HoverTiltProps) => {
    const { reducedMotion } = useSettings();
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const rotateX = useTransform(springY, [0, 1], [maxRotation, -maxRotation]);
    const rotateY = useTransform(springX, [0, 1], [-maxRotation, maxRotation]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        x.set(mouseX / width);
        y.set(mouseY / height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    if (reducedMotion) return <div className={className}>{children}</div>;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective,
                rotateX,
                rotateY,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
