<script lang="ts" module>
import type { WorkEntry } from "$/works/WorkEntry";

export const WORKS_GALLERY_CONTEXT = Symbol("works gallery context");

export class WorksGalleryContext {
    selectedEntry: WorkEntry | null = $state()!;

    constructor({
        selectedEntry = null,
    }: {
        selectedEntry?: WorkEntry | null,
    }={}) {
        this.selectedEntry = selectedEntry;
    }
}
</script>

<script lang="ts">
import WorksGallery from "@/gallery/WorksGallery.svelte";
import { workEntries } from "$/gallery-models/galleryProjectList";
import { setContext } from "svelte";
import WorkEntryDetail from "$/works/WorkEntryDetail.svelte";


const context = new WorksGalleryContext();
setContext(WORKS_GALLERY_CONTEXT, context);
</script>

<works-entries>
    <WorksGallery works={workEntries} />

    <works-entry-detail-container>
        {#if context.selectedEntry === null}
            <works-entry-detail-empty>Select a work to take a closer look!</works-entry-detail-empty>
        {:else}
            <WorkEntryDetail entry={context.selectedEntry} />
        {/if}
    </works-entry-detail-container>
</works-entries>

<style lang="scss">
works-entries {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 0;
    min-height: 0;

    overflow: auto;
}

works-entry-detail-container {
    flex-basis: 20em;
    flex-shrink: 1;
    min-height: 0;

    display: grid;
}

works-entry-detail-empty {
    display: grid;
    place-items: center;
}
</style>