<script lang="ts">
import type { GalleryInfoComponent } from "$/gallery-entries";
import type { NormalizedTag } from "$/gallery-tags";
import GalleryEntryTag from "./GalleryEntryTag.svelte";

let {
    href,
    imageSrc,
    imageAlt = "",
    displayTags = [],
    info,
    onInfoClick,
}: {
    href: string,
    imageSrc: string,
    imageAlt?: string,
    displayTags?: readonly NormalizedTag[],
    info?: GalleryInfoComponent,
    onInfoClick?: () => void,
} = $props();

let infoLabel = $derived(`Open info card for ${imageAlt || href}`);

function handleInfoClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onInfoClick?.();
}
</script>

<gallery-button>
    <a
        {href}
        rel="external"
    >

        <img
            src={imageSrc}
            alt={imageAlt}
            class="bg"
            loading="lazy"
            decoding="async"
        />
        
        <img
            src={imageSrc}
            alt={imageAlt}
            class="thumb"
            loading="lazy"
            decoding="async"
        />

        <gallery-entry-tags>
            {#each displayTags as tag (tag.id)}
                <GalleryEntryTag label={tag.label} />
            {/each}
        </gallery-entry-tags>
    </a>

    {#if info}
        <button
            type="button"
            class="info-button"
            aria-label={infoLabel}
            aria-haspopup="dialog"
            title="Info"
            onclick={handleInfoClick}
        >
            <span aria-hidden="true">i</span>
        </button>
    {/if}
</gallery-button>

<style lang="scss">
@use "$/styles/mixins";
@use "./gallery.scss";

gallery-button {
    position: relative;

    display: grid;
    place-items: stretch;

    max-width: 30em;
    height: 8em;
    
    > * {
        grid-area: 1/1;
    }
}

a {
    @include mixins.glass-button;

    display: grid;
    place-items: center;

    border-radius: 0.5em;
    overflow: hidden;

    opacity: 0.75;

    &:hover,
    &:focus-within {
        opacity: 1;
        
        gallery-entry-tags {
            opacity: 1;
        }

        > img.bg {
            filter: blur(8px) brightness(0.75);
            transform: scale(1.25);
        }
    }

    &:active {
        opacity: 0.15;
    }

    > * {
        grid-area: 1/1;
        min-width: 0;
        min-height: 0;
    }

    > img {
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

button.info-button {
    @include mixins.glass-button;
    @include gallery.gallery-entry-overlay;

    align-self: flex-start;
    justify-self: flex-end;
    margin: 0.25em;

    display: grid;
    place-items: center;

    width: 1.5em;
    height: 1.5em;

    border-radius: 0.125em;
    border-top-right-radius: 0.25em;


    color: oklch(0.95 0.05 180 / 0.85);
}

gallery-entry-tags {
    align-self: flex-end;
    justify-self: flex-start;

    display: flex;
    flex-wrap: wrap;
    gap: 0.25em;

    margin: 0.25em;
    max-width: calc(100% - 0.5em);
    min-width: 0;

    font-size: 0.6666666em;
}
</style>
