import type { Component } from "svelte";
import type { GalleryImage } from "./GalleryImage";
import { workTags } from "./workTags";
import { generatedGalleryImages } from "./generatedGalleryImages";

export type GalleryProjectTree = Record<string, WorkEntry>;

export type GalleryProjectOptions = {
    label: string,
    image?: GalleryImage | null,
    href?: string | null,
    tags?: string[],
    descriptionComponent?: Component | null,
    infoComponent?: Component | null,
    external?: boolean,
    hasGalleryImagePage?: boolean,
    children?: GalleryProjectTree,
};

export class WorkEntry {
    readonly label: string;
    readonly image: GalleryImage | null;
    readonly href: string | null;
    readonly tags: string[];
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
        tags = [],
        descriptionComponent = null,
        infoComponent = null,
        external = false,
        hasGalleryImagePage = false,
        children = {},
    }: GalleryProjectOptions) {
        this.label = label;
        this.image = image;
        this.href = href;
        this.tags = tags;
        this.descriptionComponent = descriptionComponent;
        this.infoComponent = infoComponent;
        this.external = external;
        this.hasGalleryImagePage = hasGalleryImagePage;
        this.children = children;
        this.hasChildren = Object.keys(children).length > 0;
        this.hasLink = href !== null && image !== null;
    }

    readonly withHref = (href: string) => new WorkEntry({
        label: this.label,
        image: this.image,
        href,
        tags: this.tags,
        descriptionComponent: this.descriptionComponent,
        infoComponent: this.infoComponent,
        external: this.external,
        hasGalleryImagePage: this.hasGalleryImagePage,
        children: this.children,
    });

    readonly withChildren = (children: GalleryProjectTree) => new WorkEntry({
        label: this.label,
        image: this.image,
        href: this.href,
        tags: this.tags,
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

        return new WorkEntry({
            label,
            href: rest.href ?? generatedImage.full.src,
            image: rest.image ?? {
                ...generatedImage,
                alt: label,
            },
            tags: rest.tags ?? [workTags.medium.illustration2d],
            descriptionComponent: rest.descriptionComponent,
            infoComponent: rest.infoComponent,
            external: rest.external,
            hasGalleryImagePage: rest.hasGalleryImagePage ?? true,
            children: rest.children,
        });
    }
}
