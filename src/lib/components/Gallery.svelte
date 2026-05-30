<script lang="ts">
import type { GalleryEntry, GalleryEntryWithInfo } from "$/gallery-entries";
import GalleryButton from "./GalleryButton.svelte";
import GalleryInfoDialog from "./GalleryInfoDialog.svelte";
import { galleryEntries } from "$/gallery-entries";

let selectedEntry = $state<GalleryEntryWithInfo | undefined>();

function hasInfo(entry: GalleryEntry): entry is GalleryEntryWithInfo {
    return Boolean(entry.info);
}

function showInfo(entry: GalleryEntry) {
    if (hasInfo(entry)) {
        selectedEntry = entry;
    }
}

function closeInfo() {
    selectedEntry = undefined;
}
</script>

<project-gallery>
    {#each galleryEntries as entry (entry.id)}
        <GalleryButton
            {...entry}
            onInfoClick={() => showInfo(entry)}
        />
    {/each}
</project-gallery>

{#if selectedEntry}
    <GalleryInfoDialog
        entry={selectedEntry}
        onClose={closeInfo}
    />
{/if}

<style lang="scss">
project-gallery {
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: safe center;
    gap: 1rem;

    padding: 2rem 0;
}
</style>
