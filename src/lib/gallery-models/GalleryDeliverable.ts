import { galleryMediums, type GalleryMedium } from "./GalleryMedium";
import type { GalleryImage } from "./GalleryImage";
import { generatedGalleryImages } from "./generatedGalleryImages";

export type GalleryDeliverableOptions = {
    label: string,
    image: GalleryImage,
    href: string,
    medium: GalleryMedium,
    external?: boolean,
    hasGalleryImagePage?: boolean,
};

export class GalleryDeliverable {
    readonly label: string;
    readonly image: GalleryImage;
    readonly href: string;
    readonly medium: GalleryMedium;
    readonly external: boolean;
    readonly hasGalleryImagePage: boolean;

    constructor({
        label,
        image,
        href,
        medium,
        external = false,
        hasGalleryImagePage = false,
    }: GalleryDeliverableOptions) {
        this.label = label;
        this.image = image;
        this.href = href;
        this.medium = medium;
        this.external = external;
        this.hasGalleryImagePage = hasGalleryImagePage;
    }

    readonly withHref = (href: string) => new GalleryDeliverable({
        label: this.label,
        image: this.image,
        href,
        medium: this.medium,
        external: this.external,
        hasGalleryImagePage: this.hasGalleryImagePage,
    });

    static ofGalleryImage(
        {
            label,
            key,
        }: {
            label: string,
            key: keyof typeof generatedGalleryImages,
        },
        rest: Partial<GalleryDeliverableOptions>={},
    ) {
        const generatedImage = generatedGalleryImages[key];

        return new GalleryDeliverable({
            label,
            href: rest.href ?? generatedImage.full.src,
            image: rest.image ?? {
                ...generatedImage,
                alt: label,
            },
            medium: rest.medium ?? galleryMediums.illustration2d,
            external: rest.external,
            hasGalleryImagePage: true,
        });
    }
}
