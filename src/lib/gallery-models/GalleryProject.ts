import type { Component } from "svelte";
import type { GalleryImage } from "./GalleryImage";
import { galleryMediums, type GalleryMedium } from "./GalleryTags";
import { generatedGalleryImages } from "./generatedGalleryImages";


export type GalleryProjectTree = Record<string, GalleryProject>;

export type GalleryProjectOptions = {
    label: string,
    image?: GalleryImage | null,
    href?: string | null,
    medium?: GalleryMedium | null,
    descriptionComponent?: Component | null,
    infoComponent?: Component | null,
    external?: boolean,
    hasGalleryImagePage?: boolean,
    children?: GalleryProjectTree,
};

export class GalleryProject {
    readonly label: string;
    readonly image: GalleryImage | null;
    readonly href: string | null;
    readonly medium: GalleryMedium | null;
    readonly descriptionComponent: Component | null;
    readonly infoComponent: Component | null;
    readonly external: boolean;
    readonly hasGalleryImagePage: boolean;
    readonly children: GalleryProjectTree;
    readonly hasChildren: boolean;
    readonly hasLink: boolean;

    constructor({
        label,
        image = null,
        href = null,
        medium = null,
        descriptionComponent = null,
        infoComponent = null,
        external = false,
        hasGalleryImagePage = false,
        children = {},
    }: GalleryProjectOptions) {
        this.label = label;
        this.image = image;
        this.href = href;
        this.medium = medium;
        this.descriptionComponent = descriptionComponent;
        this.infoComponent = infoComponent;
        this.external = external;
        this.hasGalleryImagePage = hasGalleryImagePage;
        this.children = children;
        this.hasChildren = Object.keys(children).length > 0;
        this.hasLink = href !== null && image !== null;
    }

    readonly withHref = (href: string) => new GalleryProject({
        label: this.label,
        image: this.image,
        href,
        medium: this.medium,
        descriptionComponent: this.descriptionComponent,
        infoComponent: this.infoComponent,
        external: this.external,
        hasGalleryImagePage: this.hasGalleryImagePage,
        children: this.children,
    });

    readonly withChildren = (children: GalleryProjectTree) => new GalleryProject({
        label: this.label,
        image: this.image,
        href: this.href,
        medium: this.medium,
        descriptionComponent: this.descriptionComponent,
        infoComponent: this.infoComponent,
        external: this.external,
        hasGalleryImagePage: this.hasGalleryImagePage,
        children,
    });

    static ofGalleryImage(
        {
            label,
            key,
        }: {
            label: string,
            key: keyof typeof generatedGalleryImages,
        },
        rest: Partial<GalleryProjectOptions> = {},
    ) {
        const generatedImage = generatedGalleryImages[key];

        return new GalleryProject({
            label,
            href: rest.href ?? generatedImage.full.src,
            image: rest.image ?? {
                ...generatedImage,
                alt: label,
            },
            medium: rest.medium ?? galleryMediums.illustration2d,
            descriptionComponent: rest.descriptionComponent,
            infoComponent: rest.infoComponent,
            external: rest.external,
            hasGalleryImagePage: rest.hasGalleryImagePage ?? true,
            children: rest.children,
        });
    }
}
