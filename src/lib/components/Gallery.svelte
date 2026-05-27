<script lang="ts">
import GalleryButton from "./GalleryButton.svelte";
import { galleryEntries } from "$/gallery-entries";
</script>

<project-gallery>
    {#each galleryEntries as entry (entry.href)}
        <GalleryButton {...entry} />
    {/each}
</project-gallery>

<style lang="scss">
project-gallery {
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    padding: 2rem 0;
    mask-image: linear-gradient(
        oklch(0 0 0 / 0) 0,
        oklch(0 0 0) 2rem,
        oklch(0 0 0) calc(100% - 2rem),
        oklch(0 0 0 / 0) 100%
    );
}
</style>
