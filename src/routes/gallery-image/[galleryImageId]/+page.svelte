<script lang="ts">
import type { PageData } from "./$types";

let {
    data,
}: {
    data: PageData,
} = $props();
</script>

<svelte:head>
    <title>{data.title} | {data.siteName}</title>
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

<main aria-labelledby="gallery-image-title">
    <figure>
        <img
            src={data.image.display.src}
            alt={data.image.alt}
            width={data.image.display.width}
            height={data.image.display.height}
            decoding="async"
            fetchpriority="high"
        />

        <figcaption id="gallery-image-title">
            {data.title}
        </figcaption>
    </figure>
</main>

<style lang="scss">
@use "$/styles/fonts.scss";

main {
    display: grid;
    place-items: center;

    min-width: 18.75rem;
    min-height: 100vh;
    min-height: 100svh;
    padding: 1rem;

    background: oklch(0.18 0.018 205);
}

figure {
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 1rem;

    width: 100%;
    max-width: 100rem;
    min-height: calc(100vh - 2rem);
    min-height: calc(100svh - 2rem);
    min-width: 0;
}

img {
    display: block;

    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100vh - 8rem);
    max-height: calc(100svh - 8rem);
    min-width: 0;
    min-height: 0;

    object-fit: contain;

    filter: drop-shadow(0 0 1rem oklch(0 0 0 / 0.35));
}

figcaption {
    @include fonts.heading;

    max-width: min(100%, 60rem);

    font-size: 2rem;
    line-height: 1.1;
    text-align: center;
    overflow-wrap: anywhere;

    @media (min-width: 48rem) {
        font-size: 3rem;
    }
}
</style>
