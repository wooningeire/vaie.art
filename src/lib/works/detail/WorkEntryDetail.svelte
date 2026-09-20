<script lang="ts">
import WorkEntryOverlay from "./WorkEntryOverlay.svelte";
import type { WorkEntry } from "../WorkEntry";
    import { workEntryParents } from "../entries-data/entries";
    import { onWorkClick } from "../gallery/entry/onWorkClick";
    import { WORKS_PAGE_CONTEXT_KEY, type WorksPageContext } from "../WorksPageContext.svelte";
    import { getContext } from "svelte";

let {
    entry,
}: {
    entry: WorkEntry,
} = $props();


const Description = $derived(entry.descriptionComponent ?? null);

let fullResolutionViewerOpen = $state(false);
let previewButton: HTMLButtonElement | undefined;

const openFullResolutionViewer = () => {
    fullResolutionViewerOpen = true;
};

const closeFullResolutionViewer = () => {
    fullResolutionViewerOpen = false;
    previewButton?.focus({ preventScroll: true });
};

const workAncestry: WorkEntry[] = $derived.by(() => {
    const ancestry: WorkEntry[] = [];

    let currentWork = workEntryParents.get(entry) ?? null;
    while (currentWork !== null) {
        ancestry.push(currentWork);
        currentWork = workEntryParents.get(currentWork) ?? null;
    }

    return ancestry.reverse();
});

const worksGalleryContext = getContext<WorksPageContext>(WORKS_PAGE_CONTEXT_KEY);
</script>

<work-entry-detail>
    <work-entry-detail-description>
        <work-ancestry>
            {#each workAncestry as ancestorWork, i (ancestorWork.id)}
                <a
                    href={ancestorWork.href}
                    onclick={onWorkClick(worksGalleryContext, ancestorWork)}
                >{ancestorWork.label}</a>

                {#if i < workAncestry.length - 1}
                    <work-ancestry-separator>/</work-ancestry-separator>
                {/if}
            {/each}
        </work-ancestry>

        <work-entry-detail-description-title>
            {entry.label}
        </work-entry-detail-description-title>

        <work-entry-detail-description-body>
            {#if Description !== null}
                <Description />
            {/if}
        </work-entry-detail-description-body>
    </work-entry-detail-description>
    
    {#if entry.image !== null}
        <work-entry-detail-media>
            <button
                bind:this={previewButton}
                aria-label="Open full resolution image viewer"
                aria-haspopup="dialog"
                aria-expanded={fullResolutionViewerOpen}
                onclick={openFullResolutionViewer}
            >
                {#if entry.image.preview.src.endsWith(".mp4")}
                    <video
                        src={entry.image.preview.src}
                        width={entry.image.preview.width}
                        height={entry.image.preview.height}
                        autoplay
                        loop
                        muted
                        playsinline
                    ></video>
                {:else}
                    <enhanced:img
                        src={entry.image.preview.src}
                        alt={entry.label}
                        decoding="async"
                        fetchpriority="high"
                    />
                {/if}
            </button>
        </work-entry-detail-media>
    {/if}
</work-entry-detail>

{#if entry.image !== null && fullResolutionViewerOpen}
    <WorkEntryOverlay
        label={entry.label}
        image={entry.image}
        onClose={closeFullResolutionViewer}
    />
{/if}

<style lang="scss">
@use "$/styles/fonts.scss";

work-entry-detail {
    display: flex;
    align-items: stretch;
    gap: 1em;

    min-width: 0;
}

work-entry-detail-media {
    flex: 1 1 0;
    height: 100%;

    display: grid;
    place-items: center;
}

work-entry-detail-description {
    flex: 1 1 0;

    display: flex;
    flex-direction: column;

    height: 100%;
    padding: 0 2em;
    overflow-y: auto;
}

button {
    display: grid;
    place-items: center;

    cursor: zoom-in;

    &:focus-visible > img,
    &:focus-visible > video {
        outline: 0.125rem solid oklch(0.95 0.05 180 / 0.85);
        outline-offset: 0.25rem;
    }

    > img,
    > video {
        max-width: 100%;
        max-height: 20em;
    }
}

work-ancestry {
    display: flex;
    gap: 1ch;

    font-size: 0.8em;
}

work-entry-detail-description-title {
    @include fonts.heading;

    font-size: 2em;
    overflow-wrap: anywhere;
}

work-entry-detail-description-body {
    display: block;

    max-width: 48rem;
    min-width: 0;

    line-height: 1.5;
    overflow-wrap: anywhere;

    :global(p) {
        margin-block: 0;
    }
}
</style>
