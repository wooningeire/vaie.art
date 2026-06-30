<script lang="ts">
    import Sidenav from "@/sidenav/Sidenav.svelte";
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

<main aria-labelledby="gallery-image-title">
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

    <Sidenav />
</main>

<style lang="scss">
@use "$/styles/fonts.scss";

main {
    display: flex;
    align-items: stretch;

    background: oklch(0.18 0.018 205);
}

gallery-image-page {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    min-height: 100vh;
    min-height: 100svh;

}

gallery-image-container {
    max-width: 100vw;
    max-height: min(100svh, calc(100svh - 8rem));

    display: grid;
    place-items: center;
}

gallery-image-details {
    width: 100%;

    padding: 2em;

    border-top: 1px solid oklch(0.9 0.05 150 / 0.5);
}

gallery-image-title {
    @include fonts.heading;
    
    font-size: 3rem;
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
