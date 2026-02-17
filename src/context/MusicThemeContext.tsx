"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type MusicTheme = {
    color: string;
    baseHue: number; // For Vortex particles base hue
    rangeHue: number; // For Vortex particles hue range
};

type MusicThemeContextType = {
    theme: MusicTheme;
    setTheme: (theme: MusicTheme) => void;
};

const defaultTheme: MusicTheme = {
    color: "#00bfcf",
    baseHue: 185,
    rangeHue: 55,
};

const MusicThemeContext = createContext<MusicThemeContextType>({
    theme: defaultTheme,
    setTheme: () => { },
});

export const MusicThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<MusicTheme>(defaultTheme);

    return (
        <MusicThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </MusicThemeContext.Provider>
    );
};

export const useMusicTheme = () => useContext(MusicThemeContext);
