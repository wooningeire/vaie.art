import type { GalleryImage } from "./GalleryImage";
import { galleryProjects } from "./GalleryProject";

export type GalleryImagePage = {
    id: string,
    label: string,
    image: GalleryImage,
};

const createGalleryImagePages = (): Record<string, GalleryImagePage> => {
    const pages: Record<string, GalleryImagePage> = {};

    for (const project of Object.values(galleryProjects)) {
        for (const [id, deliverable] of Object.entries(project.deliverables)) {
            if (!deliverable.hasGalleryImagePage) {
                continue;
            }

            pages[id] = {
                id,
                label: deliverable.label,
                image: deliverable.image,
            };
        }
    }

    return pages;
};

export const galleryImagePages = createGalleryImagePages();

export const getGalleryImagePage = (id: string) => galleryImagePages[id] ?? null;

export const getGalleryImagePageIds = () => Object.keys(galleryImagePages);
