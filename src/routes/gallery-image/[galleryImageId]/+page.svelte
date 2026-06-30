<script lang="ts">
import type { PageData } from "./$types";

let {
    data,
}: {
    data: PageData,
} = $props();
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
    <meta property="og:image:width" content={data.image.display.width.toString()} />
    <meta property="og:image:height" content={data.image.display.height.toString()} />
</svelte:head>

<gallery-image-view aria-labelledby="gallery-image-title">
    <gallery-image-page>
        <gallery-image-container>
            <img
                src={data.image.display.src}
                alt={data.image.alt}
                width={data.image.display.width}
                height={data.image.display.height}
                decoding="async"
                fetchpriority="high"
            />
        </gallery-image-container>

        <gallery-image-details>
            <gallery-image-title id="gallery-image-title">
                {data.title}
            </gallery-image-title>
        </gallery-image-details>
    </gallery-image-page>
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

gallery-image-details {
    flex: 0 0 auto;

    width: 100%;
    padding: 2em;

    border-top: 1px solid oklch(0.9 0.05 150 / 0.5);
}

gallery-image-title {
    @include fonts.heading;

    font-size: 3rem;
    overflow-wrap: anywhere;
}

img {
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
</style>
