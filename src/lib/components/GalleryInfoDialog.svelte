<script lang="ts">
import { onMount } from "svelte";
import type { GalleryEntryWithInfo } from "$/gallery-entries";

let {
    entry,
    onClose,
}: {
    entry: GalleryEntryWithInfo,
    onClose: () => void,
} = $props();

let dialog: HTMLDialogElement;
let closeButton: HTMLButtonElement;
let Info = $derived(entry.info);
let title = $derived(entry.infoTitle ?? entry.imageAlt);

onMount(() => {
    if (!dialog.open) {
        dialog.showModal();
    }

    closeButton.focus();
});

function handleCancel(event: Event) {
    event.preventDefault();
    onClose();
}

function handleBackdropClick(event: MouseEvent) {
    if (event.target === dialog) {
        onClose();
    }
}
</script>

<dialog
    bind:this={dialog}
    aria-label={`About ${title}`}
    oncancel={handleCancel}
    onclick={handleBackdropClick}
>
    <gallery-info-card>
        <gallery-info-header>
            <gallery-info-title>{title}</gallery-info-title>

            <a
                class="open-link"
                href={entry.href}
                rel="external"
            >
                Open
            </a>

            <button
                bind:this={closeButton}
                type="button"
                class="close-button"
                aria-label="Close info card"
                onclick={onClose}
            >
                x
            </button>
        </gallery-info-header>

        <gallery-info-body>
            <gallery-info-preview>
                <img
                    src={entry.imageSrc}
                    alt={entry.imageAlt}
                    loading="lazy"
                    decoding="async"
                />
            </gallery-info-preview>

            <gallery-info-content>
                <Info />
            </gallery-info-content>
        </gallery-info-body>
    </gallery-info-card>
</dialog>

<style lang="scss">
@use "$/styles/mixins";
@use "#/routes/colors.scss" as colors;

dialog {
    margin: auto;
    padding: 0;

    width: min(42rem, calc(100vw - 2rem));
    max-height: min(42rem, calc(100vh - 2rem));

    border: 2px solid oklch(0.9 0.01 200 / 0.25);
    border-radius: 0.5rem;
    overflow: hidden;

    background-color: oklch(0.16 0.02 205 / 0.94);
    color: oklch(0.92 0.01 205 / 0.78);
    box-shadow: 0 1rem 3rem oklch(0 0 0 / 0.55);
    backdrop-filter: blur(0.5rem);

    &::backdrop {
        background: oklch(0.05 0.015 220 / 0.62);
        backdrop-filter: blur(0.3rem);
    }
}

gallery-info-card {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);

    max-height: inherit;
}

gallery-info-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 0.5rem;

    padding: 0.75rem;
    border-bottom: 1px solid oklch(0.9 0.01 200 / 0.14);
}

gallery-info-title {
    min-width: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: colors.$emph;
    font-family: "Belanosima", "Averia Libre", sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
}

.open-link,
.close-button {
    @include mixins.glass-button-small;

    display: inline-grid;
    place-items: center;

    min-width: 2rem;
    min-height: 2rem;
}

.close-button {
    color: oklch(0.95 0.05 180 / 0.85);
    font-family: "Belanosima", "Averia Libre", sans-serif;
    font-weight: 600;
}

gallery-info-body {
    display: grid;
    grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1fr);
    gap: 1rem;

    min-height: 0;
    padding: 1rem;
    overflow: auto;
}

gallery-info-preview {
    display: grid;
    place-items: center;

    min-width: 0;
    min-height: 0;

    > img {
        display: block;

        width: 100%;
        max-height: 24rem;
        object-fit: contain;

        border-radius: 0.35rem;
        box-shadow: 0 0.5rem 1.5rem oklch(0 0 0 / 0.35);
    }
}

gallery-info-content {
    min-width: 0;

    :global(h1) {
        margin-bottom: 0.45rem;

        font-size: 1.8rem;
        line-height: 1;
    }

    :global(p) {
        margin-top: 0.75rem;

        line-height: 1.35;
    }

    :global(ul) {
        margin-top: 0.85rem;
        padding-left: 1.25rem;
    }

    :global(li + li) {
        margin-top: 0.35rem;
    }
}

@media (max-width: 620px) {
    dialog {
        width: calc(100vw - 1rem);
        max-height: calc(100vh - 1rem);
    }

    gallery-info-body {
        grid-template-columns: 1fr;
    }

    gallery-info-preview > img {
        max-height: 14rem;
    }
}
</style>
