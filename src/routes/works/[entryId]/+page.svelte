<script lang="ts">
import GalleryImageViewerOverlay from "@/gallery/GalleryImageViewerOverlay.svelte";
import type { PageData } from "./$types";
    import { galleryWorks } from "$/gallery-models/galleryProjectList";
    import { SITENAME } from "$/constants";

let {
    data,
}: {
    data: PageData,
} = $props();


const entry = $derived(galleryWorks[data.entryId]);

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

const canonicalUrl = $derived(`https://vaie.art/works/${data.entryId}`);
</script>

<svelte:head>
    <title>{entry.label} • {SITENAME}</title>
    <link rel="canonical" href={canonicalUrl} />

    <meta name="description" content={entry.descShort} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={entry.label} />
    <meta name="twitter:description" content={entry.descShort} />
    {#if entry.image !== null}
        <meta name="twitter:image" content={entry.image.full.src} />
        <meta name="twitter:image:alt" content={entry.label} />
    {/if}

    <meta property="og:title" content={entry.label} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITENAME} />
    <meta property="og:description" content={entry.descShort} />
    <meta property="og:url" content={canonicalUrl} />
    {#if entry.image !== null}
        <meta property="og:image" content={entry.image.full.src} />
        <meta property="og:image:alt" content={entry.label} />
        <meta property="og:image:width" content={entry.image.full.width.toString()} />
        <meta property="og:image:height" content={entry.image.full.height.toString()} />
    {/if}
</svelte:head>

<gallery-image-view aria-labelledby="gallery-image-title">
    <gallery-image-page>
        <gallery-image-container>
            <button
                bind:this={previewButton}
                class="gallery-image-preview-button"
                type="button"
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
                        <img
                            src={entry.image.preview.src}
                            alt={entry.image.alt}
                            width={entry.image.preview.width}
                            height={entry.image.preview.height}
                            decoding="async"
                            fetchpriority="high"
                        />
                    {/if}
                {/if}
            </button>
        </gallery-image-container>

        <gallery-image-details>
            <gallery-image-title id="gallery-image-title">
                {entry.label}
            </gallery-image-title>

            <gallery-image-description>
                {#if Description !== null}
                    <Description />
                {/if}
            </gallery-image-description>
        </gallery-image-details>
    </gallery-image-page>

    {#if entry.image !== null && fullResolutionViewerOpen}
        <GalleryImageViewerOverlay
            image={entry.image}
            onClose={closeFullResolutionViewer}
        />
    {/if}
</gallery-image-view>

<style lang="scss">
@use "$/styles/fonts.scss";

gallery-image-view {
    display: grid;

    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
}

gallery-image-page {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
}

gallery-image-container {
    flex: 1 1 0;

    overflow: hidden;

    display: grid;
    place-items: center;

    min-width: 0;
    min-height: 0;
}

button.gallery-image-preview-button {
    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;

    color: inherit;

    cursor: zoom-in;

    &:focus-visible > img,
    &:focus-visible > video {
        outline: 0.125rem solid oklch(0.95 0.05 180 / 0.85);
        outline-offset: 0.25rem;
    }

    > img,
    > video {
        display: block;

        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        min-width: 0;
        min-height: 0;

        object-fit: contain;

        filter: drop-shadow(0 0 1rem oklch(0 0 0 / 0.5));
    }
}

gallery-image-details {
    flex: 0 0 auto;

    display: grid;
    gap: 1rem;

    width: 100%;
    padding: 2em;
}

gallery-image-title {
    @include fonts.heading;

    font-size: 3rem;
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
