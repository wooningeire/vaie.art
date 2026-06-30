import type { GalleryMedium } from "./GalleryMedium";
import type { GalleryImage } from "./GalleryImage";

export class GalleryDeliverable {
    readonly label: string;
    readonly image: GalleryImage;
    readonly href: string;
    readonly medium: GalleryMedium;

    constructor({
        label,
        image,
        href,
        medium,
    }: {
        label: string,
        image: GalleryImage,
        href: string,
        medium: GalleryMedium,
    }) {
        this.label = label;
        this.image = image;
        this.href = href;
        this.medium = medium;
    }
}
