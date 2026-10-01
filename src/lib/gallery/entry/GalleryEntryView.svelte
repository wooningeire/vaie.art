<script lang="ts">
import type { GalleryEntry } from "$/gallery/GalleryEntry";
import GalleryEntryButton from "./GalleryEntryButton.svelte";
import { getContext } from "svelte";
import { GALLERY_CONTEXT_KEY, GalleryContext } from "$/gallery/GalleryContext.svelte";
import { onGalleryEntryClick } from "./onGalleryEntryClick";

let {
    entry,
}: {
    entry: GalleryEntry,
} = $props();

const galleryContext = getContext<GalleryContext>(GALLERY_CONTEXT_KEY);
</script>

<GalleryEntryButton
    work={entry}
    onClick={onGalleryEntryClick(galleryContext, entry)}
/>