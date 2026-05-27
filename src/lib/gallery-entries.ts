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
    
    {
        href: "/media/gallery/wires-airport.webp",
        imageSrc: "/media/gallery/wires-airport.thumb.webp",
        imageAlt: "wires airport",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        href: "/media/gallery/spax-dragon.webp",
        imageSrc: "/media/gallery/spax-dragon.thumb.webp",
        imageAlt: "Spax dragon",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        href: "/media/gallery/pretbath.webp",
        imageSrc: "/media/gallery/pretbath.thumb.webp",
        imageAlt: "Pret bath",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
];
