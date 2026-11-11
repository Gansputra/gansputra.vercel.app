"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplashScreen } from "@/components/ui/SplashScreen";

export function InitialLoader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    const handleComplete = () => {
        setLoading(false);
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <SplashScreen key="splash" onComplete={handleComplete} />
                )}
            </AnimatePresence>
            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                >
                    {children}
                </motion.div>
            )}
        </>
    );
}
