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
import SocialLink from "@/SocialButton.svelte";
import BareLink from "@/BareLink.svelte";

import GithubSvg from "@/social-icons/Github.svg.svelte";
import KofiSvg from "@/social-icons/Kofi.svg.svelte";
import ArtfightSvg from "@/social-icons/Artfight.svg.svelte";
import BlueskySvg from "@/social-icons/Bluesky.svg.svelte";

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

        <biography-section>
            <biography-title>
                <h1>vaiezzell</h1>

                <title-headline>software dragon ΘΔ!</title-headline>
                <title-headline>digital media generalist!</title-headline>
                <title-headline>macro dragon enjoyer!</title-headline>
            </biography-title>

            <background-credit>
                Background art by <BareLink href="https://www.furaffinity.net/view/61807537/">Sapphi</BareLink>
            </background-credit>

            <social-links>
                <SocialLink
                    href="https://github.com/wooningeire"
                    label="GitHub"
                >
                    {#snippet icon()}
                        <GithubSvg />
                    {/snippet}
                </SocialLink>

                <SocialLink
                    href="https://ko-fi.com/vaiezzell"
                    label="Ko-fi"
                >
                    {#snippet icon()}
                        <KofiSvg />
                    {/snippet}
                </SocialLink>

                <SocialLink
                    href="https://artfight.net/~vaiezzell"
                    label="Art Fight"
                >
                    {#snippet icon()}
                        <ArtfightSvg />
                    {/snippet}
                </SocialLink>

                <SocialLink
                    href="https://bsky.app/profile/vaiezzell.bsky.social"
                    label="Bluesky"
                >
                    {#snippet icon()}
                        <BlueskySvg />
                    {/snippet}
                </SocialLink>
            </social-links>
        </biography-section>
    </main>
</page-contents>


<style lang="scss">
@use "./colors.scss";

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

    > biography-section {
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

        > biography-section {
            grid-area: 2/2;
        }
        
        > :global(project-gallery) {
            grid-area: 1/1 / 3/2;
        }
    }
}

biography-section {
    align-self: flex-end;
    justify-self: flex-end;

    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 1em;

    padding-bottom: 1em;

    @media (min-width: 720px) {
        width: 100%;
        padding-top: 1em;
        border-top: 1px solid oklch(0.9 0.02 200 / 0.25);
    }
}

biography-title {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.25em;
}

title-headline {
    color: colors.$emph;
}

background-credit {
    font-size: 0.75em;
}

social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    justify-content: flex-end;

    :global(path) {
        fill: currentcolor;
    }
}
</style>
