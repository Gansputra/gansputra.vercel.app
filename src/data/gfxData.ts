export interface GFXDesign {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}

export const gfxData: GFXDesign[] = [
    {
        id: "1",
        title: "Jang Won-Young Poster",
        description: "A high-contrast poster design merging futuristic elements with retro neon aesthetics.",
        category: "KPOP",
        image: "/images/gfx/wonyounggfx.png",
    },
    {
        id: "2",
        title: "McLaren Concept Art",
        description: "Digital illustration depicting a rogue-like protagonist for a dark fantasy setting.",
        category: "CARS",
        image: "/images/gfx/mclarengfx.png",
    },
    {
        id: "3",
        title: "Endmin Female Character Design",
        description: "Full brand identity kit for a gaming content creator, focusing on aggressive typography.",
        category: "GAME",
        image: "/images/gfx/endminfemalegfx.png",
    },
    {
        id: "4",
        title: "Gojo Satoru Character Design",
        description: "Vibrant abstract pattern designed for a music album cover with glitch distortion.",
        category: "ANIME",
        image: "/images/gfx/gojogfx.png",
    },
    {
        id: "5",
        title: "Sukuna Character Design",
        description: "Custom animated overlay set for Twitch streamers including alerts and chat boxes.",
        category: "ANIME",
        image: "/images/gfx/sukunagfx.png",
    },
    {
        id: "6",
        title: "Endmin Male Character Design",
        description: "Modern magazine spread design focusing on minimalist grid layouts and bold headers.",
        category: "GAME",
        image: "/images/gfx/endminmalegfx.png",
    }
];
