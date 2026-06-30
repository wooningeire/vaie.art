import type { Component } from "svelte";
import { GalleryDeliverable } from "./GalleryDeliverable";
import { galleryMediums } from "./GalleryMedium";

export class GalleryProject {
    readonly label: string;
    readonly deliverables: Record<string, GalleryDeliverable>;

    readonly href: string | null;
    readonly imageSrc: string | null;
    readonly infoComponent: Component | null;

    constructor({
        label,
        deliverables,
        href = null,
        imageSrc = null,
        infoComponent = null,
    }: {
        label: string,
        deliverables: Record<string, GalleryDeliverable>,
        href?: string | null,
        imageSrc?: string | null,
        infoComponent?: Component | null,
    }) {
        this.label = label;
        this.deliverables = deliverables;
        this.href = href;
        this.imageSrc = imageSrc;
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
                imageSrc: "/media/misc/pudle-cover.webp",
                medium: galleryMediums.webSpa,
            }),
        },
    }),

    astraRefs: new GalleryProject({
        label: "Astra refs",
        deliverables: {
            curi: new GalleryDeliverable({
                label: "Curi",
                href: "/media/gallery/curi.webp",
                imageSrc: "/media/gallery/curi.thumb.webp",
                medium: galleryMediums.illustration2d,
            }),
            staaria: new GalleryDeliverable({
                label: "Staaria",
                href: "/media/gallery/staaria.webp",
                imageSrc: "/media/gallery/staaria.thumb.webp",
                medium: galleryMediums.illustration2d,
            }),
            pyrinth: new GalleryDeliverable({
                label: "Pyrinth",
                href: "/media/gallery/pyrinth.webp",
                imageSrc: "/media/gallery/pyrinth.thumb.webp",
                medium: galleryMediums.illustration2d,
            }),
        },
    }),
};