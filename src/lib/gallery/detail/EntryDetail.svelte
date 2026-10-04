<script lang="ts">
import FullscreenEntryViewer from "./FullscreenEntryViewer.svelte";
import type { GalleryEntry } from "../GalleryEntry";
import { entryParents } from "../entries-data/entries";
import { onGalleryEntryClick } from "../entry/onGalleryEntryClick";
import { GALLERY_CONTEXT_KEY, type GalleryContext } from "../GalleryContext.svelte";
import { getContext } from "svelte";
    import Button from "@/generic/Button.svelte";

let {
    entry,
    limitPreviewHeight = false,
    displayPopout = false,
}: {
    entry: GalleryEntry,
    limitPreviewHeight?: boolean,
    displayPopout?: boolean,
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

const workAncestry: GalleryEntry[] = $derived.by(() => {
    const ancestry: GalleryEntry[] = [];

    let currentWork = entryParents.get(entry) ?? null;
    while (currentWork !== null) {
        ancestry.push(currentWork);
        currentWork = entryParents.get(currentWork) ?? null;
    }

    return ancestry.reverse();
});

const galleryContext = getContext<GalleryContext>(GALLERY_CONTEXT_KEY);
</script>

<work-entry-detail>
    {#if entry.image !== null}
        <work-entry-detail-media>
            <button
                bind:this={previewButton}
                aria-label="Open full resolution image viewer"
                aria-haspopup="dialog"
                aria-expanded={fullResolutionViewerOpen}
                onclick={openFullResolutionViewer}
                class:limit-preview-height={limitPreviewHeight}
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

    <work-entry-detail-description>
        {#if displayPopout}
            <popout-button>
                <a href={entry.href}>
                    <Button>show without gallery</Button>
                </a>
            </popout-button>
        {/if}

        <work-ancestry>
            {#each workAncestry as ancestorWork, i (ancestorWork.id)}
                <a
                    href={ancestorWork.href}
                    onclick={onGalleryEntryClick(galleryContext, ancestorWork)}
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
            {:else}
                <no-description-notice>
                    I didn’t write anything about this entry yet…!
                </no-description-notice>
            {/if}
        </work-entry-detail-description-body>
    </work-entry-detail-description>
</work-entry-detail>

{#if entry.image !== null && fullResolutionViewerOpen}
    <FullscreenEntryViewer
        label={entry.label}
        image={entry.image}
        onClose={closeFullResolutionViewer}
    />
{/if}

<style lang="scss">
@use "$/styles/fonts.scss";

work-entry-detail {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1em;

    overflow-y: auto;
}

work-entry-detail-media {
    display: grid;
    place-items: center;
}

work-entry-detail-description {
    display: flex;
    flex-direction: column;

    height: 100%;
    padding: 0 2em;
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
    }

    &.limit-preview-height > :is(img, video) {
        max-height: 20em;
    }
}

popout-button {
    margin-bottom: 2em;
}

work-ancestry {
    display: flex;
    gap: 1ch;

    font-size: 0.8em;
}

work-entry-detail-description-title {
    @include fonts.heading;

    font-size: 2em;
}

work-entry-detail-description-body {
    display: block;

    margin-top: 1em;

    line-height: 1.5;

    :global(p) {
        margin-block: 0;
    }
}

no-description-notice {
    opacity: 0.5;
}
</style>
