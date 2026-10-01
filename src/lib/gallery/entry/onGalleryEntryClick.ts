import type { GalleryEntry } from "$/gallery/GalleryEntry";
import type { GalleryContext } from "$/gallery/GalleryContext.svelte";

export const onGalleryEntryClick = (context: GalleryContext, entry: GalleryEntry) => {
    return (event: MouseEvent) => {
        if (event.button !== 0 || entry.external) return;
        
        event.preventDefault();
        context.selectedEntry = entry;
    };
};