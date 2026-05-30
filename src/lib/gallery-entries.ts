import type { Component } from "svelte";

export type GalleryInfoComponent = Component;

export type GalleryEntry = {
    id: string,
    href: string,
    imageSrc: string,
    imageAlt: string,
    tags?: string[],
    info?: GalleryInfoComponent,
    infoTitle?: string,
};

type GalleryEntryDefinition = Omit<GalleryEntry, "info"> & {
    /**
     * Add src/lib/gallery-info/{id}.svx or .svelte to attach a card automatically.
     * Use a string to point at another card, a component for fully custom content,
     * or false to disable the automatic match for this entry.
     */
    info?: string | GalleryInfoComponent | false,
};

const galleryInfoDocuments = import.meta.glob<GalleryInfoComponent>(
    "./gallery-info/*.{svelte,svx}",
    {
        eager: true,
        import: "default",
    },
);

function findGalleryInfo(id: string): GalleryInfoComponent | undefined {
    return galleryInfoDocuments[`./gallery-info/${id}.svx`]
        ?? galleryInfoDocuments[`./gallery-info/${id}.svelte`];
}

function requireGalleryInfo(id: string): GalleryInfoComponent {
    const info = findGalleryInfo(id);

    if (!info) {
        throw new Error(`No gallery info component found for "${id}".`);
    }

    return info;
}

function defineGalleryEntry(entry: GalleryEntryDefinition): GalleryEntry {
    const {
        info: requestedInfo,
        ...galleryEntry
    } = entry;

    const info = requestedInfo === false
        ? undefined
        : typeof requestedInfo === "string"
            ? requireGalleryInfo(requestedInfo)
            : requestedInfo ?? findGalleryInfo(galleryEntry.id);

    return {
        ...galleryEntry,
        info,
    };
}

export type GalleryEntryWithInfo = GalleryEntry & {
    info: GalleryInfoComponent,
};

export const galleryEntries: GalleryEntry[] = [
    {
        id: "pudle",
        href: "/pudle",
        imageSrc: "/media/misc/pudle-cover.webp",
        imageAlt: "Pudle",
        infoTitle: "Pudle",
        tags: [
            "web(spa)",
            "game",
        ],
    },
    
    {
        id: "wires-airport",
        href: "/media/gallery/wires-airport.webp",
        imageSrc: "/media/gallery/wires-airport.thumb.webp",
        imageAlt: "wires airport",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "spax-dragon",
        href: "/media/gallery/spax-dragon.webp",
        imageSrc: "/media/gallery/spax-dragon.thumb.webp",
        imageAlt: "Spax dragon",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "pretbath",
        href: "/media/gallery/pretbath.webp",
        imageSrc: "/media/gallery/pretbath.thumb.webp",
        imageAlt: "Pret bath",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "curi",
        href: "/media/gallery/curi.webp",
        imageSrc: "/media/gallery/curi.thumb.webp",
        imageAlt: "Curi ref",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "pyrinth",
        href: "/media/gallery/pyrinth.webp",
        imageSrc: "/media/gallery/pyrinth.thumb.webp",
        imageAlt: "Pyrinth ref",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "staaria",
        href: "/media/gallery/staaria.webp",
        imageSrc: "/media/gallery/staaria.thumb.webp",
        imageAlt: "Staaria ref",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "iywralyx",
        href: "/media/gallery/iywralyx.webp",
        imageSrc: "/media/gallery/iywralyx.thumb.webp",
        imageAlt: "Iywralyx ref",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "vaiezzell-ref",
        href: "/media/gallery/vaiezzell-ref.webp",
        imageSrc: "/media/gallery/vaiezzell-ref.thumb.webp",
        imageAlt: "vaiezzell ref",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
    
    {
        id: "silver-vaie",
        href: "/media/gallery/silver-vaie.webp",
        imageSrc: "/media/gallery/silver-vaie.thumb.webp",
        imageAlt: "An appropriately sized nest",
        tags: [
            "art(2d, digital, illustration, krita)",
        ],
    },
].map(defineGalleryEntry);
