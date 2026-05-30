<script lang="ts">
import type { GalleryEntry, GalleryEntryWithInfo } from "$/gallery-entries";
import type { GalleryIndexedEntry } from "$/gallery-tags";
import GalleryButton from "./GalleryButton.svelte";
import GalleryInfoDialog from "./GalleryInfoDialog.svelte";

let {
    entries,
}: {
    entries: readonly GalleryIndexedEntry<GalleryEntry>[],
} = $props();

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
    <gallery-entry-list aria-live="polite">
        {#each entries as indexedEntry (indexedEntry.entry.id)}
            <GalleryButton
                {...indexedEntry.entry}
                displayTags={indexedEntry.displayTags}
                onInfoClick={() => showInfo(indexedEntry.entry)}
            />
        {:else}
            <gallery-empty>No matches</gallery-empty>
        {/each}
    </gallery-entry-list>
</project-gallery>

{#if selectedEntry}
    <GalleryInfoDialog
        entry={selectedEntry}
        onClose={closeInfo}
    />
{/if}

<style lang="scss">
@use "$/styles/mixins";

project-gallery {
    overflow: hidden;

    display: grid;
    min-height: 0;
}

gallery-entry-list {
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: safe center;
    gap: 1em;

    min-height: 0;
    padding: 2em 0;
}

gallery-empty {
    @include mixins.glass-button-small;

    align-self: center;
    color: oklch(0.95 0.04 190 / 0.8);
}
</style>
