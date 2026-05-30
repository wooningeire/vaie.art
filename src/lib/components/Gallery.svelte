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
    justify-content: center;
    align-content: center;
    gap: 1rem;

    padding: 2rem 0;
}
</style>
