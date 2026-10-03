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
        if (galleryState.activeTags[Symbol.iterator]().every(tag => entry.tags.includes(tag))) {
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
                {@const animationDelay = Math.random() * 25}
                {@const animationDuration = Math.random() * 200 + 400}

                {@const transitionDelay = Math.random() * 100}
                {@const transitionDuration = Math.random() * 100 + 200}

                <gallery-entry-view-container
                    animate:flip={{duration: animationDuration, easing: cubicInOut, delay: animationDelay}}
                    in:fly={{duration: transitionDuration, y: 50, easing: cubicOut, delay: transitionDelay}}
                    out:fly={{duration: transitionDuration, y: 50, easing: cubicIn, delay: transitionDelay}}
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
    flex: 1 1 0;

    display: flex;
    overflow: hidden;
}

gallery-entry-list {
    flex: 1 1 0;

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
