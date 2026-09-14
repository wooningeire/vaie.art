import type { Component } from "svelte";
import type { WorkEntryImageVariants } from "./WorkEntryImage";

export class WorkEntry {
    readonly id: string;
    readonly label: string;
    readonly descShort: string;
    readonly image: WorkEntryImageVariants | null;
    readonly href: string;
    readonly tags: string[];
    readonly descriptionComponent: Component | null;
    readonly infoComponent: Component | null;
    readonly external: boolean;
    readonly hasGalleryImagePage: boolean;
    readonly children: WorkEntry[];
    readonly hasChildren: boolean;
    readonly hasLink: boolean;

    constructor({
        id,
        label,
        descShort = "",
        image = null,
        href = null,
        tags = [],
        descriptionComponent = null,
        infoComponent = null,
        external = false,
        hasGalleryImagePage = false,
        children = [],
    }: {
        id: string,
        label: string,
        descShort?: string,
        image?: WorkEntryImageVariants | null,
        href?: string | null,
        tags?: string[],
        descriptionComponent?: Component | null,
        infoComponent?: Component | null,
        external?: boolean,
        hasGalleryImagePage?: boolean,
        children?: WorkEntry[],
    }) {
        this.id = id;
        this.label = label;
        this.descShort = descShort;
        this.image = image;
        this.href = href ?? `/works/${id}`;
        this.tags = tags;
        this.descriptionComponent = descriptionComponent;
        this.infoComponent = infoComponent;
        this.external = external;
        this.hasGalleryImagePage = hasGalleryImagePage;
        this.children = children;
        this.hasChildren = Object.keys(children).length > 0;
        this.hasLink = href !== null && image !== null;
    }
}
