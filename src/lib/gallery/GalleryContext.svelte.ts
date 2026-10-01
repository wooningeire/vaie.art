import type { GalleryEntry } from "$/gallery/GalleryEntry";

export const GALLERY_CONTEXT_KEY = Symbol("gallery context");

export class GalleryContext {
    selectedEntry: GalleryEntry | null = $state()!;

    constructor({
        selectedEntry = null,
    }: {
        selectedEntry?: GalleryEntry | null,
    }={}) {
        this.selectedEntry = selectedEntry;
    }
}