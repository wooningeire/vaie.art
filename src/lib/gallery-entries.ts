export type GalleryEntry = {
    href: string,
    imageSrc: string,
    imageAlt: string,
    tags?: string[],
};

export const galleryEntries: GalleryEntry[] = [
    {
        href: "/pudle",
        imageSrc: "/media/misc/pudle-cover.webp",
        imageAlt: "Pudle",
        tags: [
            "web(spa)",
            "game",
        ],
    },
];
