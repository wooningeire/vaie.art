<script lang="ts">
import { onMount } from "svelte";
import type { GalleryImage } from "$/gallery-models/GalleryImage";

let {
    image,
    onClose,
}: {
    image: GalleryImage,
    onClose: () => void,
} = $props();

let closeButton: HTMLButtonElement | undefined;

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        onClose();
    }
};

onMount(() => {
    closeButton?.focus({ preventScroll: true });
});
</script>

<svelte:window onkeydown={handleKeydown} />

<gallery-image-viewer-overlay
    role="dialog"
    aria-modal="true"
    aria-label="Full resolution image viewer"
>
    <gallery-image-viewer-stage>
        <img
            src={image.full.src}
            alt={image.alt}
            width={image.full.width}
            height={image.full.height}
            decoding="async"
        />
    </gallery-image-viewer-stage>

    <gallery-image-viewer-controls>
        <button
            bind:this={closeButton}
            type="button"
            aria-label="Close full resolution image viewer"
            onclick={onClose}
        ></button>
    </gallery-image-viewer-controls>
</gallery-image-viewer-overlay>

<style lang="scss">
@use "$/styles/mixins";

gallery-image-viewer-overlay {
    position: fixed;
    inset: 0;
    z-index: 10;

    display: grid;
    place-items: stretch;
    width: 100svw;
    height: 100svh;
    min-width: 0;
    min-height: 0;

    background: oklch(0.2 0.01 180 / 0.75);

    > * {
        grid-area: 1/1;
    }
}

gallery-image-viewer-stage {
    overflow: auto;

    display: grid;
    justify-items: center;
    align-items: start;

    width: 100svw;
    height: 100svh;
    min-width: 0;
    min-height: 0;
    padding: 50svh 50svw;

    > img {
        display: block;

        width: auto;
        height: auto;
        max-width: none;
        max-height: none;

        filter: drop-shadow(0 0 1rem oklch(0 0 0 / 0.5));
    }
}

gallery-image-viewer-controls {
    align-self: start;
    justify-self: end;

    display: flex;
    gap: 0.5rem;

    padding: 1rem;

    pointer-events: none;

    > button {
        @include mixins.glass-button;

        display: grid;
        place-items: center;

        width: 2.5rem;
        height: 2.5rem;

        border-radius: 0.25rem;

        color: oklch(0.95 0.05 180 / 0.85);
        font-size: 2rem;
        line-height: 1;

        cursor: pointer;
        pointer-events: auto;

        &::before,
        &::after {
            content: "";

            grid-area: 1/1;

            width: 1.25rem;
            height: 0.125rem;

            border-radius: 999rem;

            background: currentColor;
        }

        &::before {
            transform: rotate(45deg);
        }

        &::after {
            transform: rotate(-45deg);
        }
    }
}
</style>
