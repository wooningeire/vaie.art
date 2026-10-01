import { SvelteSet } from "svelte/reactivity";

export class GalleryState {
    readonly activeTags = $state(new SvelteSet<string>());
}

export const galleryState = new GalleryState();