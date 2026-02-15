import { Project } from "@/types/project";

export const projectData: Project[] = [
    {
        id: "1",
        title: "Convertin",
        description: "A website for converting format files",
        stack: ["python", "flask", "html", "tailwind css", "javascript"],
        previewImage: "/images/project/convertin1.png",
        gallery: [
            "/images/project/convertin1.png",
            "/images/project/convertin2.png",
            "/images/project/convertin3.png"
        ],
        repoLink: "https://github.com/Gansputra/convertin",
        date: "2024-02-01",
    },
    {
        id: "2",
        title: "Instagram Downlaoder",
        description: "A website for downloading instagram posts and reels",
        stack: ["python", "flask", "html", "tailwind css", "javascript"],
        previewImage: "/images/project/insta1.png",
        gallery: [
            "/images/project/insta1.png",
            "/images/project/insta2.png"
        ],
        repoLink: "https://github.com/Gansputra/instagramDownloader",
        date: "2023-12-10",
    },
    {
        id: "3",
        title: "Tiktok Downloader",
        description: "A website for downloading tiktok posts and reels",
        stack: ["python", "flask", "html", "tailwind css", "javascript"],
        previewImage: "/images/project/tiktok1.png",
        gallery: [
            "/images/project/tiktok1.png",
            "/images/project/tiktok2.png"
        ],
        repoLink: "https://github.com/Gansputra/tiktokDownloader",
        date: "2023-10-25",
    },
];
