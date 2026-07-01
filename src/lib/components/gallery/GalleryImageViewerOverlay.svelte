<script lang="ts">
import { onMount, tick } from "svelte";
import type { GalleryImage } from "$/gallery-models/GalleryImage";

let {
    image,
    onClose,
}: {
    image: GalleryImage,
    onClose: () => void,
} = $props();

type DragState = {
    pointerId: number,
    startX: number,
    startY: number,
    startScrollLeft: number,
    startScrollTop: number,
};

const minZoom = 0.25;
const maxZoom = 4;
const zoomStep = 0.25;

let stage: HTMLElement | undefined;
let imageElement: HTMLImageElement | undefined;
let closeButton: HTMLButtonElement | undefined;
let zoom = $state(1);
let dragState: DragState | null = null;
let dragMoved = false;
let pointerStartedOutsideImage = false;
let dragging = $state(false);

const zoomPercent = $derived(`${Math.round(zoom * 100)}%`);
const zoomedWidth = $derived(`${Math.round(image.full.width * zoom)}px`);
const zoomedHeight = $derived(`${Math.round(image.full.height * zoom)}px`);

const clampZoom = (value: number) => Math.min(maxZoom, Math.max(minZoom, value));

const isImageEventTarget = (target: EventTarget | null) => (
    target instanceof Node
    && imageElement !== undefined
    && imageElement.contains(target)
);

const centerStage = () => {
    if (stage === undefined) {
        return;
    }

    stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2);
    stage.scrollTop = Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2);
};

const centerStageAfterLayout = async () => {
    await tick();
    requestAnimationFrame(centerStage);
};

const setZoom = async (nextZoom: number) => {
    const clampedZoom = clampZoom(nextZoom);

    if (clampedZoom === zoom) {
        return;
    }

    const centerXRatio = stage === undefined || stage.scrollWidth === 0
        ? 0.5
        : (stage.scrollLeft + stage.clientWidth / 2) / stage.scrollWidth;
    const centerYRatio = stage === undefined || stage.scrollHeight === 0
        ? 0.5
        : (stage.scrollTop + stage.clientHeight / 2) / stage.scrollHeight;

    zoom = clampedZoom;

    await tick();

    requestAnimationFrame(() => {
        if (stage === undefined) {
            return;
        }

        stage.scrollLeft = stage.scrollWidth * centerXRatio - stage.clientWidth / 2;
        stage.scrollTop = stage.scrollHeight * centerYRatio - stage.clientHeight / 2;
    });
};

const zoomIn = () => {
    void setZoom(zoom + zoomStep);
};

const zoomOut = () => {
    void setZoom(zoom - zoomStep);
};

const resetZoom = () => {
    void setZoom(1);
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        onClose();
    }
};

const startDrag = (event: PointerEvent) => {
    if (stage === undefined || event.button !== 0) {
        return;
    }

    dragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: stage.scrollLeft,
        startScrollTop: stage.scrollTop,
    };
    dragMoved = false;
    pointerStartedOutsideImage = !isImageEventTarget(event.target);
    dragging = true;

    stage.setPointerCapture(event.pointerId);
    event.preventDefault();
};

const drag = (event: PointerEvent) => {
    if (stage === undefined || dragState === null || event.pointerId !== dragState.pointerId) {
        return;
    }

    const xDelta = event.clientX - dragState.startX;
    const yDelta = event.clientY - dragState.startY;

    dragMoved = dragMoved || Math.abs(xDelta) > 4 || Math.abs(yDelta) > 4;
    stage.scrollLeft = dragState.startScrollLeft - xDelta;
    stage.scrollTop = dragState.startScrollTop - yDelta;
};

const stopDrag = (event: PointerEvent) => {
    if (stage === undefined || dragState === null || event.pointerId !== dragState.pointerId) {
        return;
    }

    const shouldClose = event.type === "pointerup"
        && pointerStartedOutsideImage
        && !dragMoved;

    if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
    }

    dragState = null;
    dragMoved = false;
    pointerStartedOutsideImage = false;
    dragging = false;

    if (shouldClose) {
        onClose();
    }
};

onMount(() => {
    closeButton?.focus({ preventScroll: true });
    void centerStageAfterLayout();
});
</script>

<svelte:window onkeydown={handleKeydown} />

<gallery-image-viewer-overlay
    role="dialog"
    aria-modal="true"
    aria-label="Full resolution image viewer"
>
    <gallery-image-viewer-stage
        bind:this={stage}
        role="region"
        aria-label="Full resolution image pan area"
        data-dragging={dragging}
        onpointerdown={startDrag}
        onpointermove={drag}
        onpointerup={stopDrag}
        onpointercancel={stopDrag}
    >
        <gallery-image-viewer-content
            style:--viewer-image-width={zoomedWidth}
            style:--viewer-image-height={zoomedHeight}
        >
            <img
                bind:this={imageElement}
                src={image.full.src}
                alt={image.alt}
                width={image.full.width}
                height={image.full.height}
                draggable="false"
                decoding="async"
                onload={centerStage}
            />
        </gallery-image-viewer-content>
    </gallery-image-viewer-stage>

    <gallery-image-viewer-controls>
        <button
            class="viewer-control icon-button zoom-out-button"
            type="button"
            aria-label="Zoom out"
            title="Zoom out"
            disabled={zoom <= minZoom}
            onclick={zoomOut}
        ></button>

        <button
            class="viewer-control zoom-reset-button"
            type="button"
            aria-label="Reset zoom to 100%"
            title="Reset zoom"
            onclick={resetZoom}
        >
            {zoomPercent}
        </button>

        <button
            class="viewer-control icon-button zoom-in-button"
            type="button"
            aria-label="Zoom in"
            title="Zoom in"
            disabled={zoom >= maxZoom}
            onclick={zoomIn}
        ></button>

        <button
            bind:this={closeButton}
            class="viewer-control icon-button close-button"
            type="button"
            aria-label="Close full resolution image viewer"
            title="Close"
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

    background: oklch(0.2 0.01 180 / 0.875);

    > * {
        grid-area: 1/1;
    }
}

gallery-image-viewer-stage {
    overflow: auto;

    display: grid;

    min-width: 100%;
    min-height: 100%;

    cursor: grab;
    touch-action: none;
    user-select: none;

    &[data-dragging="true"] {
        cursor: grabbing;
    }
}

gallery-image-viewer-content {
    display: grid;
    place-items: center;

    box-sizing: border-box;
    width: calc(var(--viewer-image-width) + 100svw);
    height: calc(var(--viewer-image-height) + 100svh);
    min-width: 100%;
    min-height: 100%;
    padding: 50svh 50svw;

    > img {
        display: block;

        width: var(--viewer-image-width);
        height: var(--viewer-image-height);
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

    > button.viewer-control {
        @include mixins.glass-button;

        display: grid;
        place-items: center;

        width: 2.5rem;
        height: 2.5rem;

        border-radius: 0.25rem;

        color: oklch(0.95 0.05 180 / 0.85);
        font-size: 0.875rem;
        line-height: 1;

        cursor: pointer;
        pointer-events: auto;

        &:disabled {
            opacity: 0.35;
            cursor: default;
        }
    }

    > button.zoom-reset-button {
        width: 4rem;
    }

    > button.icon-button {
        &::before,
        &::after {
            content: "";

            grid-area: 1/1;

            width: 1.25rem;
            height: 0.125rem;

            border-radius: 999rem;

            background: currentColor;
        }
    }

    > button.zoom-out-button::after {
        display: none;
    }

    > button.zoom-in-button::after {
        transform: rotate(90deg);
    }

    > button.close-button::before {
        transform: rotate(45deg);
    }

    > button.close-button::after {
        transform: rotate(-45deg);
    }
}
</style>
