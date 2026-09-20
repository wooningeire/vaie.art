<script lang="ts">
import type { WorkEntry } from "$/works/WorkEntry";
import WorksGallerySearch from "./search/WorksGallerySearch.svelte";
import { galleryState } from "./search/GalleryState.svelte";
import WorksGalleryEntryView from "./entry/WorksGalleryEntryView.svelte";

let {
    works,
}: {
    works: Record<string, WorkEntry>,
} = $props();
</script>

<works-gallery>
    <WorksGallerySearch />

    <works-gallery-entry-list aria-live="polite">
        {#each Object.entries(works) as [workId, work] (workId)}
            {#if galleryState.activeTags.size === 0 || galleryState.activeTags[Symbol.iterator]().every(tagId => work.tags.includes(tagId))}
                <WorksGalleryEntryView {work} />
            {/if}
        {/each}
    </works-gallery-entry-list>
</works-gallery>

<style lang="scss">
@use "$/styles/mixins";

works-gallery {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;

    display: flex;
    overflow: hidden;
}

works-gallery-entry-list {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25em;

    overflow-y: auto;

    min-height: 0;
    padding: 2em;
}
</style>
