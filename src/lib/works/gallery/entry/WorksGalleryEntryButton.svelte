<script lang="ts">
import type { WorkEntry } from "$/works/WorkEntry";
import Button from "@/generic/Button.svelte";

let {
    work,
    onClick = null,
}: {
    work: WorkEntry,
    onClick?: ((event: MouseEvent) => void) | null,
} = $props();
</script>

<gallery-button>
    <a
        href={work.href}
        rel={work.external ? "external" : null}
        onclick={onClick}
    >
        {#if work.image === null}
            <Button style="height: 100%;">{work.label}</Button>
        {:else}
            <!-- TODO: doable wthout inline styles? -->
            <Button
                buttonStyle="image"
                style="height: 100%; aspect-ratio: {work.image.thumb.width} / {work.image.thumb.height};"
            >
                <gallery-button-media
                    style:--aspect="{work.image.thumb.width} / {work.image.thumb.height}"
                >
                    {#if work.image.thumb.src.endsWith(".mp4")}
                        <video
                            src={work.image.thumb.src}
                            width={work.image.thumb.width}
                            height={work.image.thumb.height}
                            class="bg"
                            autoplay
                            loop
                            muted
                            playsinline
                        ></video>

                        <video
                            src={work.image.thumb.src}
                            width={work.image.thumb.width}
                            height={work.image.thumb.height}
                            class="thumb"
                            autoplay
                            loop
                            muted
                            playsinline
                        ></video>
                    {:else}
                        <img
                            src={work.image.thumb.src}
                            alt={work.label}
                            width={work.image.thumb.width}
                            height={work.image.thumb.height}
                            class="bg"
                            loading="lazy"
                            decoding="async"
                        />

                        <img
                            src={work.image.thumb.src}
                            alt={work.label}
                            width={work.image.thumb.width}
                            height={work.image.thumb.height}
                            class="thumb"
                            loading="lazy"
                            decoding="async"
                        />
                    {/if}
                </gallery-button-media>
            </Button>
        {/if}
    </a>
</gallery-button>

<style lang="scss">
@use "$/styles/mixins";

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
