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
                label: "Curi",
                href: generatedGalleryImages["gallery/astra-refs/curi"].src,
                image: {
                    ...generatedGalleryImages["gallery/astra-refs/curi.thumb"],
                    alt: "Curi",
                },
                medium: galleryMediums.illustration2d,
            }),
            staaria: new GalleryDeliverable({
                label: "Staaria",
                href: generatedGalleryImages["gallery/astra-refs/staaria"].src,
                image: {
                    ...generatedGalleryImages["gallery/astra-refs/staaria.thumb"],
                    alt: "Staaria",
                },
                medium: galleryMediums.illustration2d,
            }),
            pyrinth: new GalleryDeliverable({
                label: "Pyrinth",
                href: generatedGalleryImages["gallery/astra-refs/pyrinth"].src,
                image: {
                    ...generatedGalleryImages["gallery/astra-refs/pyrinth.thumb"],
                    alt: "Pyrinth",
                },
                medium: galleryMediums.illustration2d,
            }),
        },
    }),
};
