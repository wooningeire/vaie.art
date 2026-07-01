<script lang="ts">
import GalleryImageViewerOverlay from "@/gallery/GalleryImageViewerOverlay.svelte";
import { getGalleryImagePage } from "$/gallery-models/GalleryImagePage";
import type { PageData } from "./$types";

let {
    data,
}: {
    data: PageData,
} = $props();

let galleryImagePage = $derived(getGalleryImagePage(data.galleryImageId));
let DescriptionComponent = $derived(galleryImagePage?.descriptionComponent ?? null);

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

<svelte:head>
    <title>{data.title} | vaiezzell</title>
    <link rel="canonical" href={data.canonicalUrl} />

    <meta name="description" content={data.description} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={data.title} />
    <meta name="twitter:description" content={data.description} />
    <meta name="twitter:image" content={data.imageUrl} />
    <meta name="twitter:image:alt" content={data.image.alt} />

    <meta property="og:title" content={data.title} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={data.siteName} />
    <meta property="og:description" content={data.description} />
    <meta property="og:url" content={data.canonicalUrl} />
    <meta property="og:image" content={data.imageUrl} />
    <meta property="og:image:alt" content={data.image.alt} />
    <meta property="og:image:width" content={data.image.preview.width.toString()} />
    <meta property="og:image:height" content={data.image.preview.height.toString()} />
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
                <img
                    src={data.image.preview.src}
                    alt={data.image.alt}
                    width={data.image.preview.width}
                    height={data.image.preview.height}
                    decoding="async"
                    fetchpriority="high"
                />
            </button>
        </gallery-image-container>

        <gallery-image-details>
            <gallery-image-title id="gallery-image-title">
                {data.title}
            </gallery-image-title>

            {#if DescriptionComponent}
                <gallery-image-description>
                    <DescriptionComponent />
                </gallery-image-description>
            {/if}
        </gallery-image-details>
    </gallery-image-page>

    {#if fullResolutionViewerOpen}
        <GalleryImageViewerOverlay
            image={data.image}
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

    &:focus-visible > img {
        outline: 0.125rem solid oklch(0.95 0.05 180 / 0.85);
        outline-offset: 0.25rem;
    }

    > img {
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

    border-top: 1px solid oklch(0.9 0.05 150 / 0.5);
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
