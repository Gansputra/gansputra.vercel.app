"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useActiveSection } from "@/context/ActiveSectionContext";

interface ScrollSectionProps {
    children: React.ReactNode;
    id: string;
    className?: string;
    threshold?: number;
}

export const ScrollSection = ({ children, id, className, threshold = 0.5 }: ScrollSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: threshold });
    const { setActiveSection } = useActiveSection();

    useEffect(() => {
        if (isInView) {
            setActiveSection(id);
        }
    }, [isInView, id, setActiveSection]);

    return (
        <motion.div
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
