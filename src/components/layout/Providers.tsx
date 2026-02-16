"use client";

import { ActiveSectionProvider } from "@/context/ActiveSectionContext";
import { SettingsProvider } from "@/context/SettingsContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SettingsProvider>
            <ActiveSectionProvider>
                {children}
            </ActiveSectionProvider>
        </SettingsProvider>
    );
}
