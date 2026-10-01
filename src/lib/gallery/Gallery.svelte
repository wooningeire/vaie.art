<script lang="ts">
import type { GalleryEntry } from "$/gallery/GalleryEntry";
import GallerySearch from "./search/GallerySearch.svelte";
import { galleryState } from "./search/GalleryState.svelte";
import WorksGalleryEntryView from "./entry/GalleryEntryView.svelte";
import { flip } from "svelte/animate";
import { cubicIn, cubicInOut, cubicOut } from "svelte/easing";
import { fly } from "svelte/transition";

let {
    entries,
}: {
    entries: Record<string, GalleryEntry>,
} = $props();

const filteredWorks = $derived.by(() => {
    if (galleryState.activeTags.size === 0) {
        return Object.values(entries);
    }

    const filteredWorks: GalleryEntry[] = [];
    for (const entry of Object.values(entries)) {
        if (galleryState.activeTags[Symbol.iterator]().every(tagId => entry.tags.includes(tagId))) {
            filteredWorks.push(entry);
        }
    }
    return filteredWorks;
});
</script>

<gallery->
    <GallerySearch />

    <gallery-entry-list aria-live="polite">
        <gallery-entry-list-scroller>
            {#each filteredWorks as work (work.id)}
                {@const delay = Math.random() * 100}

                <gallery-entry-view-container
                    animate:flip={{duration: 500, easing: cubicInOut, delay}}
                    in:fly={{duration: 250, y: 50, easing: cubicOut, delay}}
                    out:fly={{duration: 250, y: 50, easing: cubicIn, delay}}
                >
                    <WorksGalleryEntryView entry={work} />
                </gallery-entry-view-container>
            {/each}
        </gallery-entry-list-scroller>
    </gallery-entry-list>
</gallery->

<style lang="scss">
@use "$/styles/mixins";

gallery- {
    flex-grow: 1;
    flex-shrink: 1;

    display: flex;
    overflow: hidden;
}

gallery-entry-list {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;

    overflow-y: auto;

    min-height: 0;
    padding: 2em 0;
}

gallery-entry-list-scroller {
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    gap: 0.25em;
}
</style>
