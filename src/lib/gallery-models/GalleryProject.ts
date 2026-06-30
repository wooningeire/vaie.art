import type { Component } from "svelte";
import { GalleryDeliverable } from "./GalleryDeliverable";
import { generatedGalleryImages } from "./generatedGalleryImages";
import type { GalleryImage } from "./GalleryImage";
import { galleryMediums } from "./GalleryMedium";

export class GalleryProject {
    readonly label: string;
    readonly deliverables: Record<string, GalleryDeliverable>;

    readonly href: string | null;
    readonly image: GalleryImage | null;
    readonly infoComponent: Component | null;

    constructor({
        label,
        deliverables,
        href = null,
        image = null,
        infoComponent = null,
    }: {
        label: string,
        deliverables: Record<string, GalleryDeliverable>,
        href?: string | null,
        image?: GalleryImage | null,
        infoComponent?: Component | null,
    }) {
        this.label = label;
        this.deliverables = deliverables;
        this.href = href;
        this.image = image;
        this.infoComponent = infoComponent;
    }
}

export const galleryProjects = {
    pudle: new GalleryProject({
        label: "Pudle",
        deliverables: {
            pudle: new GalleryDeliverable({
                label: "Pudle",
                href: "/pudle",
                image: {
                    ...generatedGalleryImages["misc/pudle-cover"],
                    alt: "Pudle",
                },
                medium: galleryMediums.webSpa,
            }),
        },
    }),

    astraRefs: new GalleryProject({
        label: "Astra refs",
        deliverables: {
            curi: new GalleryDeliverable({
                label: "Curi reference sheet",
                href: generatedGalleryImages["gallery/astra-refs/curi"].display.src,
                image: {
                    ...generatedGalleryImages["gallery/astra-refs/curi"],
                    alt: "Curi reference sheet",
                },
                medium: galleryMediums.illustration2d,
            }),
            staaria: new GalleryDeliverable({
                label: "Staaria reference sheet",
                href: generatedGalleryImages["gallery/astra-refs/staaria"].display.src,
                image: {
                    ...generatedGalleryImages["gallery/astra-refs/staaria"],
                    alt: "Staaria reference sheet",
                },
                medium: galleryMediums.illustration2d,
            }),
            pyrinth: new GalleryDeliverable({
                label: "Pyrinth reference sheet",
                href: generatedGalleryImages["gallery/astra-refs/pyrinth"].display.src,
                image: {
                    ...generatedGalleryImages["gallery/astra-refs/pyrinth"],
                    alt: "Pyrinth reference sheet",
                },
                medium: galleryMediums.illustration2d,
            }),
        },
    }),

    artfight2026: new GalleryProject({
        label: "Art Fight 2026",
        deliverables: {
            vaiezzellThumb: new GalleryDeliverable({
                label: "vaiezzell character thumbnail",
                href: generatedGalleryImages["gallery/art-fight-2026/vaiezzell-2026-thumb"].display.src,
                image: {
                    ...generatedGalleryImages["gallery/art-fight-2026/vaiezzell-2026-thumb"],
                    alt: "vaiezzell character thumbnail",
                },
                medium: galleryMediums.illustration2d,
            }),

            iywralyxThumb: new GalleryDeliverable({
                label: "Iywralyx character thumbnail",
                href: generatedGalleryImages["gallery/art-fight-2026/iywralyx-2026-thumb"].display.src,
                image: {
                    ...generatedGalleryImages["gallery/art-fight-2026/iywralyx-2026-thumb"],
                    alt: "Iywralyx character thumbnail",
                },
                medium: galleryMediums.illustration2d,
            }),
        },
    }),
};
