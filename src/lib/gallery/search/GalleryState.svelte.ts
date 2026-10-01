import { SvelteSet } from "svelte/reactivity";
import type { GalleryTag } from "../GalleryTag";

export class GalleryState {
    readonly activeTags = $state(new SvelteSet<GalleryTag>());
}

export const galleryState = new GalleryState();