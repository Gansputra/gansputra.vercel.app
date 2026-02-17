"use client";

import { ActiveSectionProvider } from "@/context/ActiveSectionContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
            <SettingsProvider>
                <ActiveSectionProvider>
                    {children}
                </ActiveSectionProvider>
            </SettingsProvider>
        </ThemeProvider>
    );
}
