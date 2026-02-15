export function getVideoThumbnail(videoUrl: string): string {
    let videoId = "";

    try {
        if (videoUrl.includes("youtu.be/")) {
            videoId = videoUrl.split("youtu.be/")[1].split(/[?#]/)[0];
        } else if (videoUrl.includes("youtube.com/watch")) {
            const urlParams = new URLSearchParams(videoUrl.split("?")[1]);
            videoId = urlParams.get("v") || "";
        } else if (videoUrl.includes("youtube.com/embed/")) {
            videoId = videoUrl.split("embed/")[1].split(/[?#]/)[0];
        }
    } catch (e) {
        console.error("Error parsing video URL:", e);
    }

    if (videoId) {
        // Menggunakan hqdefault sebagai fallback karena tidak semua video punya maxresdefault
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800"; // Fallback image jika gagal
}
