<script lang="ts">
import WorksGallery from "$/works/gallery/WorksGallery.svelte";
import { workEntries } from "$/works/entries-data/entries";
import { setContext } from "svelte";
import WorkEntryDetail from "$/works/detail/WorkEntryDetail.svelte";
import {WorksPageContext, WORKS_PAGE_CONTEXT_KEY} from "./WorksPageContext.svelte";


const context = new WorksPageContext();
setContext(WORKS_PAGE_CONTEXT_KEY, context);
</script>

<works-page>
    <WorksGallery works={workEntries} />

    <works-entry-detail-container>
        {#if context.selectedEntry === null}
            <works-entry-detail-empty>Select a work to take a closer look!</works-entry-detail-empty>
        {:else}
            <WorkEntryDetail entry={context.selectedEntry} />
        {/if}
    </works-entry-detail-container>
</works-page>

<style lang="scss">
works-page {
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