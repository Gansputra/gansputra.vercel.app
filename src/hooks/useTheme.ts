"use client";

import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(isDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", isDark);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return { theme, toggleTheme };
}
