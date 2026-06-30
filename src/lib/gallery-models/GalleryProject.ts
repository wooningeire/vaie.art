import type { Component } from "svelte";
import { GalleryDeliverable } from "./GalleryDeliverable";
import { galleryMediums } from "./GalleryMedium";

export class GalleryProject {
    readonly label: string;
    readonly deliverables: Record<string, GalleryDeliverable>;

    readonly href: string;
    readonly imageSrc: string;
    readonly infoComponent: Component | null;

    constructor({
        label,
        deliverables,
        href,
        imageSrc,
        infoComponent = null,
    }: {
        label: string,
        deliverables: Record<string, GalleryDeliverable>,
        href: string,
        imageSrc: string,
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
        href: "/pudle",
        imageSrc: "/media/misc/pudle-cover.webp",
    }),
};