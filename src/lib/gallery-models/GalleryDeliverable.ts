import type { GalleryMedium } from "./GalleryMedium";

export type GalleryDeliverableImage = {
    src: string,
    alt: string,
}

export class GalleryDeliverable {
    readonly label: string;
    readonly imageSrc: string;
    readonly href: string; 
    readonly medium: GalleryMedium;

    constructor({
        label,
        imageSrc,
        href,
        medium,
    }: {
        label: string,
        imageSrc: string,
        href: string,
        medium: GalleryMedium,
    }) {
        this.label = label;
        this.imageSrc = imageSrc;
        this.href = href;
        this.medium = medium;
    }
}