"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    range?: number;
}

export const Magnetic = ({ children, strength = 0.5, range = 100 }: MagneticProps) => {
    const { reducedMotion } = useSettings();
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < range) {
            x.set(distanceX * strength);
            y.set(distanceY * strength);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (reducedMotion) return children;

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
};
