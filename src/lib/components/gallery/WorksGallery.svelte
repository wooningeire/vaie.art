<script lang="ts">
import type { GalleryProjectTree } from "$/gallery-models/WorkEntry";
import GalleryWorkView from "./GalleryWorkView.svelte";

let {
    works,
}: {
    works: GalleryProjectTree,
} = $props();
</script>

<works-gallery>
    <works-gallery-entry-list aria-live="polite">
        {#each Object.entries(works) as [workId, work] (workId)}
            <GalleryWorkView {work} />
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
