<script lang="ts">
import { Draggable } from "@vaie/hui";
import { onMount, tick } from "svelte";
import { on } from "svelte/events";
import type { ComponentProps } from "svelte";
import type { GalleryImage } from "$/gallery-models/GalleryImage";

let {
    image,
    onClose,
}: {
    image: GalleryImage,
    onClose: () => void,
} = $props();

type DraggableProps = ComponentProps<typeof Draggable>;

type Point = {
    x: number,
    y: number,
};

type PanDragState = {
    startScrollLeft: number,
    startScrollTop: number,
    displacement: Point,
};

type ZoomAnchor = {
    viewportX: number,
    viewportY: number,
    imageXRatio: number,
    imageYRatio: number,
};

const minZoom = 1/16;
const maxZoom = 16;
const zoomStep = 0.25;
const wheelDeltaModeLine = 1;
const wheelDeltaModePage = 2;
const wheelLinePixelHeight = 16;
const wheelPixelsPerZoomDoubling = 600;

let stage: HTMLElement | undefined;
let imageElement: HTMLImageElement | undefined;
let closeButton: HTMLButtonElement | undefined;
let zoom = $state(1);
let dragState: PanDragState | null = null;
let dragMoved = false;
let pointerStartedOutsideImage = false;
let dragging = $state(false);

const zoomPercent = $derived(`${Math.round(zoom * 100)}%`);
const zoomedWidth = $derived(`${Math.round(image.full.width * zoom)}px`);
const zoomedHeight = $derived(`${Math.round(image.full.height * zoom)}px`);

const clampZoom = (value: number) => Math.min(maxZoom, Math.max(minZoom, value));

const getZoomAnchor = (viewportX: number, viewportY: number): ZoomAnchor => {
    if (stage === undefined) {
        return {
            viewportX,
            viewportY,
            imageXRatio: 0.5,
            imageYRatio: 0.5,
        };
    }

    const zoomedImageWidth = image.full.width * zoom;
    const zoomedImageHeight = image.full.height * zoom;
    const imageLeft = (stage.scrollWidth - zoomedImageWidth) / 2;
    const imageTop = (stage.scrollHeight - zoomedImageHeight) / 2;
    const contentX = stage.scrollLeft + viewportX;
    const contentY = stage.scrollTop + viewportY;

    return {
        viewportX,
        viewportY,
        imageXRatio: (contentX - imageLeft) / zoomedImageWidth,
        imageYRatio: (contentY - imageTop) / zoomedImageHeight,
    };
};

const getCenterZoomAnchor = () => {
    if (stage === undefined) {
        return getZoomAnchor(0, 0);
    }

    return getZoomAnchor(stage.clientWidth / 2, stage.clientHeight / 2);
};

const scrollToZoomAnchor = (anchor: ZoomAnchor) => {
    if (stage === undefined) {
        return;
    }

    const zoomedImageWidth = image.full.width * zoom;
    const zoomedImageHeight = image.full.height * zoom;
    const imageLeft = (stage.scrollWidth - zoomedImageWidth) / 2;
    const imageTop = (stage.scrollHeight - zoomedImageHeight) / 2;

    stage.scrollLeft = imageLeft + zoomedImageWidth * anchor.imageXRatio - anchor.viewportX;
    stage.scrollTop = imageTop + zoomedImageHeight * anchor.imageYRatio - anchor.viewportY;

    if (dragState !== null) {
        // Draggable reports displacement from pointer down, so zoom must rebase the stored
        // scroll origin instead of letting the next drag frame replay the pre-zoom origin.
        dragState = {
            ...dragState,
            startScrollLeft: stage.scrollLeft + dragState.displacement.x,
            startScrollTop: stage.scrollTop + dragState.displacement.y,
        };
    }
};

const getWheelDeltaY = (event: WheelEvent) => {
    if (event.deltaMode === wheelDeltaModeLine) {
        return event.deltaY * wheelLinePixelHeight;
    }

    if (event.deltaMode === wheelDeltaModePage) {
        return event.deltaY * (stage?.clientHeight ?? window.innerHeight);
    }

    return event.deltaY;
};

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

const setZoom = async (nextZoom: number, anchor = getCenterZoomAnchor()) => {
    const clampedZoom = clampZoom(nextZoom);

    if (clampedZoom === zoom) {
        return;
    }

    zoom = clampedZoom;

    await tick();

    requestAnimationFrame(() => scrollToZoomAnchor(anchor));
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

const handleWheel = (event: WheelEvent) => {
    if (stage === undefined) {
        return;
    }

    const deltaY = getWheelDeltaY(event);

    if (deltaY === 0) {
        return;
    }

    event.preventDefault();

    const stageRect = stage.getBoundingClientRect();
    const anchor = getZoomAnchor(
        event.clientX - stageRect.left,
        event.clientY - stageRect.top,
    );
    const zoomMultiplier = 2 ** (-deltaY / wheelPixelsPerZoomDoubling);

    void setZoom(zoom * zoomMultiplier, anchor);
};

const startDrag: NonNullable<DraggableProps["onDown"]> = ({ button, pointerEvent }) => {
    if (stage === undefined || button !== 0) {
        return;
    }

    dragState = {
        startScrollLeft: stage.scrollLeft,
        startScrollTop: stage.scrollTop,
        displacement: {
            x: 0,
            y: 0,
        },
    };
    dragMoved = false;
    pointerStartedOutsideImage = !isImageEventTarget(pointerEvent.target);
    dragging = true;

    pointerEvent.preventDefault();
};

const drag: NonNullable<DraggableProps["onDrag"]> = ({ displacement, button }) => {
    if (stage === undefined || dragState === null || button !== 0) {
        return;
    }

    dragMoved = dragMoved || Math.abs(displacement.x) > 4 || Math.abs(displacement.y) > 4;
    dragState = {
        ...dragState,
        displacement,
    };
    stage.scrollLeft = dragState.startScrollLeft - displacement.x;
    stage.scrollTop = dragState.startScrollTop - displacement.y;
};

const stopDrag: NonNullable<DraggableProps["onUp"]> = ({ button }) => {
    if (dragState === null || button !== 0) {
        return;
    }

    const shouldClose = pointerStartedOutsideImage
        && !dragMoved;

    dragState = null;
    dragMoved = false;
    pointerStartedOutsideImage = false;
    dragging = false;

    if (shouldClose) {
        onClose();
    }
};

onMount(() => {
    const removeWheelListener = on(window, "wheel", handleWheel, {
        capture: true,
        passive: false,
    });

    closeButton?.focus({ preventScroll: true });
    centerStageAfterLayout();

    return removeWheelListener;
});
</script>

<svelte:window
    onkeydown={handleKeydown}
/>

<gallery-image-viewer-overlay
    role="dialog"
    aria-modal="true"
    aria-label="Full resolution image viewer"
>
    <Draggable
        onDown={startDrag}
        onDrag={drag}
        onUp={stopDrag}
    >
        {#snippet dragTarget({ onpointerdown })}
            <gallery-image-viewer-stage
                bind:this={stage}
                role="region"
                aria-label="Full resolution image pan area"
                class:dragging={dragging}
                onpointerdown={onpointerdown}
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
        {/snippet}
    </Draggable>

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

    &.dragging {
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

        background: oklch(0.2 0.05 180 / 0.5);
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
