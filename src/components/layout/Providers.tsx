"use client";

import { ActiveSectionProvider } from "@/context/ActiveSectionContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ActiveSectionProvider>
            {children}
        </ActiveSectionProvider>
    );
}
