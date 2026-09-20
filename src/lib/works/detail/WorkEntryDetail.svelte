<script lang="ts">
import WorkEntryOverlay from "./WorkEntryOverlay.svelte";
import type { WorkEntry } from "../WorkEntry";

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
</script>

<work-entry-detail>
    <work-entry-detail-media>
        <button
            bind:this={previewButton}
            aria-label="Open full resolution image viewer"
            aria-haspopup="dialog"
            aria-expanded={fullResolutionViewerOpen}
            onclick={openFullResolutionViewer}
        >
            {#if entry.image !== null}
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
            {/if}
        </button>
    </work-entry-detail-media>

    <work-entry-detail-description>
        <gallery-image-title id="gallery-image-title">
            {entry.label}
        </gallery-image-title>

        <gallery-image-description>
            {#if Description !== null}
                <Description />
            {/if}
        </gallery-image-description>
    </work-entry-detail-description>
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

    padding: 2em;
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

gallery-image-title {
    @include fonts.heading;

    font-size: 2em;
    overflow-wrap: anywhere;
}

gallery-image-description {
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
