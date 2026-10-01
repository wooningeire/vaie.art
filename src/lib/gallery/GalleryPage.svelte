<script lang="ts">
import Gallery from "./Gallery.svelte";
import { galleryEntries } from "./entries-data/entries";
import { setContext } from "svelte";
import EntryDetail from "./detail/EntryDetail.svelte";
import {GalleryContext, GALLERY_CONTEXT_KEY} from "./GalleryContext.svelte";


const context = new GalleryContext();
setContext(GALLERY_CONTEXT_KEY, context);
</script>

<gallery-page>
    <Gallery entries={galleryEntries} />

    <gallery-entry-detail-container>
        {#if context.selectedEntry === null}
            <gallery-entry-detail-empty>details will appear here!</gallery-entry-detail-empty>
        {:else}
            <EntryDetail entry={context.selectedEntry} />
        {/if}
    </gallery-entry-detail-container>
</gallery-page>

<style lang="scss">
gallery-page {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1em;

    min-width: 0;
    min-height: 0;

    overflow: auto;
}

gallery-entry-detail-container {
    flex-basis: 20em;
    flex-shrink: 1;
    min-height: 0;

    display: grid;
}

gallery-entry-detail-empty {
    display: grid;
    place-items: center;
}
</style>