export const themeConfig = {
    colors: {
        primary: "#00f2ff", // Cyan neon
        secondary: "#7000ff", // Purple neon
        accent: "#ff0080", // Pink/Magenta
        background: "#0a0a0a",
    },
    animations: {
        duration: 0.5,
        stagger: 0.1,
        easing: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
    },
    spacing: {
        container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    },
};
