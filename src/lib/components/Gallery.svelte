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
    display: flex;
    flex-direction: column;
}
</style>
