"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SettingsContextType {
    reducedMotion: boolean;
    setReducedMotion: (value: boolean) => void;
    toggleReducedMotion: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("reducedMotion");
        if (saved !== null) {
            setReducedMotion(saved === "true");
        } else {
            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            setReducedMotion(prefersReduced);
        }
    }, []);

    const toggleReducedMotion = () => {
        const newValue = !reducedMotion;
        setReducedMotion(newValue);
        localStorage.setItem("reducedMotion", String(newValue));
    };

    return (
        <SettingsContext.Provider value={{ reducedMotion, setReducedMotion, toggleReducedMotion }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
