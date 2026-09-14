<script lang="ts">
import type { WorkEntry } from "$/works/WorkEntry";
import { galleryState } from "./GalleryState.svelte";
import GalleryWorkView from "./GalleryWorkView.svelte";

let {
    works,
}: {
    works: Record<string, WorkEntry>,
} = $props();
</script>

<works-gallery>
    <works-gallery-entry-list aria-live="polite">
        {#each Object.entries(works) as [workId, work] (workId)}
            {#if galleryState.activeTags.size === 0 || galleryState.activeTags[Symbol.iterator]().every(tagId => work.tags.includes(tagId))}
                <GalleryWorkView {work} />
            {/if}
        {/each}
    </works-gallery-entry-list>
</works-gallery>

<style lang="scss">
@use "$/styles/mixins";

works-gallery {
    overflow: hidden;

    display: grid;
    min-height: 0;
}

works-gallery-entry-list {
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25em;

    min-height: 0;
    padding: 2em 0;
}
</style>
