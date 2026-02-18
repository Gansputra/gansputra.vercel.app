"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type MusicTheme = {
    color: string;
    baseHue: number; // For Vortex particles base hue
    rangeHue: number; // For Vortex particles hue range
};

type MusicThemeContextType = {
    theme: MusicTheme;
    analyzer: AnalyserNode | null;
    setTheme: (theme: MusicTheme) => void;
    setAnalyzer: (analyzer: AnalyserNode | null) => void;
};

const defaultTheme: MusicTheme = {
    color: "#00bfcf",
    baseHue: 185,
    rangeHue: 55,
};

const MusicThemeContext = createContext<MusicThemeContextType>({
    theme: defaultTheme,
    analyzer: null,
    setTheme: () => { },
    setAnalyzer: () => { },
});

export const MusicThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<MusicTheme>(defaultTheme);
    const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);

    return (
        <MusicThemeContext.Provider value={{ theme, setTheme, analyzer, setAnalyzer }}>
            {children}
        </MusicThemeContext.Provider>
    );
};

export const useMusicTheme = () => useContext(MusicThemeContext);
