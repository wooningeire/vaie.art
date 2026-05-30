<script lang="ts">
import GalleryEntryTag from "./GalleryEntryTag.svelte";

let {
    href,
    imageSrc,
    imageAlt = "",
    tags = [],
}: {
    href: string,
    imageSrc: string,
    imageAlt?: string,
    tags?: string[],
} = $props();
</script>

<a
    {href}
    rel="external"
>
    <button>
        <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
        />

        <gallery-entry-tags>
            {#each tags as tag}
                <GalleryEntryTag label={tag} />
            {/each}
        </gallery-entry-tags>
    </button>
</a>

<style lang="scss">
@use "$/styles/mixins";

a {
    display: contents;
}

button {
    @include mixins.glass-button;

    display: grid;
    place-items: center;

    max-width: min(100%, 30em);
    height: 6.5em;

    border-radius: 0.5em;
    overflow: hidden;

    &:hover,
    &:focus-within {
        img {
            opacity: 1;
        }
    }

    &:active {
        img {
            opacity: 0.15;
        }
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
        object-fit: cover;

        opacity: 0.5;

        z-index: -1;
    }

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
