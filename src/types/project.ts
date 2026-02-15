export interface Project {
    id: string;
    title: string;
    description: string;
    stack: string[];
    previewImage: string;
    gallery?: string[];
    demoLink?: string;
    repoLink?: string;
    date: string;
}
