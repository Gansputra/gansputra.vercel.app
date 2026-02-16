"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/ui/SplashScreen";

export function InitialLoader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Force intro to show for development/testing as requested
        // const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
        // if (hasSeenIntro) {
        //     setLoading(false);
        // }
    }, []);

    useEffect(() => {
        if (loading) {
            document.documentElement.classList.remove('custom-cursor-active');
        } else {
            // Only add if not mobile/reduced motion (handled by CustomCursor itself, but for safety)
            // But we want to let CustomCursor component handle it. 
            // So we just ensure it's removed when loading.
        }
    }, [loading]);

    const handleComplete = () => {
        setLoading(false);
        sessionStorage.setItem("hasSeenIntro", "true");
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <SplashScreen onComplete={handleComplete} />}
            </AnimatePresence>
            <div className={loading ? "hidden" : "block"}>
                {children}
            </div>
        </>
    );
}
