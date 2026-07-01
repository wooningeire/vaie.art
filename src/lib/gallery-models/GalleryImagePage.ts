import type { GalleryImage } from "./GalleryImage";
import { galleryProjects, type GalleryProjectTree } from "./GalleryProject";

export type GalleryImagePage = {
    id: string,
    label: string,
    image: GalleryImage,
};

const addGalleryImagePages = (
    pages: Record<string, GalleryImagePage>,
    projects: GalleryProjectTree,
) => {
    for (const [id, project] of Object.entries(projects)) {
        if (project.hasGalleryImagePage) {
            if (project.image === null) {
                throw new Error("Gallery image page \"" + id + "\" is missing an image.");
            }

            pages[id] = {
                id,
                label: project.label,
                image: project.image,
            };
        }

        addGalleryImagePages(pages, project.children);
    }
};

const createGalleryImagePages = (): Record<string, GalleryImagePage> => {
    const pages: Record<string, GalleryImagePage> = {};

    addGalleryImagePages(pages, galleryProjects);

    return pages;
};

export const galleryImagePages = createGalleryImagePages();

export const getGalleryImagePage = (id: string) => galleryImagePages[id] ?? null;

export const getGalleryImagePageIds = () => Object.keys(galleryImagePages);
