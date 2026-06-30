import { galleryMediums, type GalleryMedium } from "./GalleryMedium";
import type { GalleryImage } from "./GalleryImage";
import { generatedGalleryImages } from "./generatedGalleryImages";

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

    static ofGalleryImage(
        {
            label,
            key,
        }: {
            label: string,
            key: keyof typeof generatedGalleryImages,
        },
        rest: Partial<ConstructorParameters<typeof GalleryDeliverable>[0]>={},
    ) {
        return new GalleryDeliverable({
            ...rest,
            label,
            href: generatedGalleryImages[key].display.src,
            image: {
                ...generatedGalleryImages[key],
                alt: label,
            },
            medium: galleryMediums.illustration2d,
        });
    }
}
