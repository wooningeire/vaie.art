<script lang="ts">
import { type WorkEntryImageVariants } from "$/works/WorkEntryImage";

let {
    href = null,
    imageVariants,
    label,
    external = false,
    onClick = null,
}: {
    href?: string | null,
    imageVariants: WorkEntryImageVariants,
    label: string,
    external?: boolean,
    onClick?: ((event: MouseEvent) => void) | null,
} = $props();
</script>

<gallery-button>
    <a
        {href}
        rel={external ? "external" : null}
        onclick={onClick}
    >
        <gallery-button-media
            style:--aspect="{imageVariants.thumb.width} / {imageVariants.thumb.height}"
        >
            {#if imageVariants.thumb.src.endsWith(".mp4")}
                <video
                    src={imageVariants.thumb.src}
                    width={imageVariants.thumb.width}
                    height={imageVariants.thumb.height}
                    class="bg"
                    autoplay
                    loop
                    muted
                    playsinline
                ></video>

                <video
                    src={imageVariants.thumb.src}
                    width={imageVariants.thumb.width}
                    height={imageVariants.thumb.height}
                    class="thumb"
                    autoplay
                    loop
                    muted
                    playsinline
                ></video>
            {:else}
                <img
                    src={imageVariants.thumb.src}
                    alt={label}
                    width={imageVariants.thumb.width}
                    height={imageVariants.thumb.height}
                    class="bg"
                    loading="lazy"
                    decoding="async"
                />

                <img
                    src={imageVariants.thumb.src}
                    alt={label}
                    width={imageVariants.thumb.width}
                    height={imageVariants.thumb.height}
                    class="thumb"
                    loading="lazy"
                    decoding="async"
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
