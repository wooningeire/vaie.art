<script lang="ts">
import type { GalleryImage } from "$/gallery-models/GalleryImage";
    import Button from "@/generic/Button.svelte";

let {
    href,
    image,
    external = false,
    imageElement = $bindable(),
    videoElement = $bindable(),
}: {
    href: string,
    image: GalleryImage,
    external?: boolean,
    imageElement?: HTMLImageElement,
    videoElement?: HTMLVideoElement,
} = $props();
</script>

<gallery-button>
    <a
        {href}
        rel={external ? "external" : null}
    >
        <gallery-button-media
            style:--aspect="{image.thumb.width} / {image.thumb.height}"
        >
            {#if image.thumb.src.endsWith(".mp4")}
                <video
                    src={image.thumb.src}
                    width={image.thumb.width}
                    height={image.thumb.height}
                    class="bg"
                    autoplay
                    loop
                    muted
                    playsinline
                ></video>

                <video
                    src={image.thumb.src}
                    width={image.thumb.width}
                    height={image.thumb.height}
                    class="thumb"
                    autoplay
                    loop
                    muted
                    playsinline
                    bind:this={videoElement}
                ></video>
            {:else}
                <img
                    src={image.thumb.src}
                    alt={image.alt}
                    width={image.thumb.width}
                    height={image.thumb.height}
                    class="bg"
                    loading="lazy"
                    decoding="async"
                />

                <img
                    src={image.thumb.src}
                    alt={image.alt}
                    width={image.thumb.width}
                    height={image.thumb.height}
                    class="thumb"
                    loading="lazy"
                    decoding="async"
                    bind:this={imageElement}
                />
            {/if}
        </gallery-button-media>
    </a>
</gallery-button>

<style lang="scss">
@use "$/styles/mixins";
@use "./gallery.scss";

gallery-button {
    position: relative;

    display: inline-grid;
    place-items: stretch;

    height: 9.5em;

    > * {
        grid-area: 1/1;
    }
}

a {

    height: 100%;

    overflow: hidden;

    opacity: 0.75;

    &:hover,
    &:focus-within {
        opacity: 1;

        gallery-entry-tags {
            opacity: 1;
        }

        gallery-button-media > img.bg,
        gallery-button-media > video.bg {
            filter: blur(8px) brightness(0.75);
            transform: scale(1.25);
        }
    }

    &:active {
        opacity: 0.15;
    }
}

gallery-button-media {
    display: grid;

    height: 100%;
    aspect-ratio: var(--aspect);
    min-width: 0;
    min-height: 0;

    --aspect: 1 / 1;

    > * {
        grid-area: 1/1;
        min-width: 0;
        min-height: 0;
    }

    > img,
    > video {
        display: block;

        width: 100%;
        height: 100%;

        &.thumb {
            object-fit: contain;

            filter: drop-shadow(0 0 0.25em oklch(0 0 0));
        }

        &.bg {
            object-fit: cover;

            filter: blur(8px) brightness(0.5);
            transform: scale(1.15);

            transition:
                blur 0.2s cubic-bezier(0, 0.5, 0.4, 1),
                transform 0.2s cubic-bezier(0, 0.5, 0.4, 1);
        }
    }
}
</style>
