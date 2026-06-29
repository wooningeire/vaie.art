<script lang="ts">
import {
    applyGalleryQueryToSearchParams,
    clearGalleryQuery,
    createEmptyGalleryQuery,
    createGalleryFacetGroups,
    createGalleryIndex,
    filterGalleryEntries,
    parseGalleryQuerySearchParams,
    toggleGalleryQueryInclude,
    type GalleryFacetValue,
    type GalleryQuery,
} from "$/gallery-tags";
import { browser } from "$app/environment";
import { galleryCharacters } from "$/gallery-characters";
import { galleryEntries } from "$/gallery-entries";
import { onMount } from "svelte";
import Background from "@/Background.svelte";
import Gallery from "@/Gallery.svelte";
import GalleryFilterBar from "@/GalleryFilterBar.svelte";
    import Biography from "@/Biography.svelte";

const indexedGalleryEntries = createGalleryIndex(galleryEntries, galleryCharacters);
const facetGroups = createGalleryFacetGroups(indexedGalleryEntries);

let activeQuery = $state<GalleryQuery>(createEmptyGalleryQuery());
let urlStateReady = $state(false);
let visibleEntries = $derived(filterGalleryEntries(indexedGalleryEntries, activeQuery));

onMount(() => {
    activeQuery = readGalleryQueryFromLocation();
    urlStateReady = true;

    const handlePopState = () => {
        activeQuery = readGalleryQueryFromLocation();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
        window.removeEventListener("popstate", handlePopState);
    };
});

$effect(() => {
    if (!browser || !urlStateReady) {
        return;
    }

    writeGalleryQueryToLocation(activeQuery);
});

function toggleFilter(tag: GalleryFacetValue) {
    activeQuery = toggleGalleryQueryInclude(activeQuery, tag.id);
}

function clearFilters() {
    activeQuery = clearGalleryQuery();
}

function readGalleryQueryFromLocation(): GalleryQuery {
    if (!browser) {
        return createEmptyGalleryQuery();
    }

    return parseGalleryQuerySearchParams(new URLSearchParams(window.location.search));
}

function writeGalleryQueryToLocation(query: GalleryQuery) {
    const url = new URL(window.location.href);
    applyGalleryQueryToSearchParams(url.searchParams, query);

    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const nextPath = `${url.pathname}${url.search}${url.hash}`;

    if (currentPath !== nextPath) {
        window.history.replaceState(window.history.state, "", nextPath);
    }
}
</script>

<page-contents>
    <Background />

    <main>
        <GalleryFilterBar
            {facetGroups}
            {activeQuery}
            onToggleFilter={toggleFilter}
            onClearFilters={clearFilters}
        />

        <Gallery entries={visibleEntries} />

        <Biography />
    </main>
</page-contents>


<style lang="scss">
page-contents {
    display: grid;
    place-items: center;

    :global(> *) {
        grid-area: 1/1;
    }
}

main {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    grid-template-columns: minmax(0, 1fr);
    gap: 1em;

    padding: 1em;

    width: 100vw;
    height: 100vh;
    min-width: 300px;
    min-height: 300px;

    > :global(gallery-filter-bar) {
        grid-area: 1/1;
        align-self: flex-start;
        justify-self: center;
    }

    > :global(project-gallery) {
        grid-area: 2/1;
    }

    > :global(biography-section) {
        grid-area: 3/1;
    }

    @media (min-width: 720px) {
        grid-template-rows: minmax(0, 1fr) auto;
        grid-template-columns: minmax(0, 1fr) 15em;

        padding: 0 1em;
        font-size: 1.5rem;

        > :global(gallery-filter-bar) {
            grid-area: 1/2;
            align-self: flex-end;
            justify-self: flex-end;

            max-height: calc(100vh - 16rem);
            padding: 1rem 0 0;
            overflow-y: auto;
        }

        > :global(biography-section) {
            grid-area: 2/2;
        }
        
        > :global(project-gallery) {
            grid-area: 1/1 / 3/2;
        }
    }
}
</style>
