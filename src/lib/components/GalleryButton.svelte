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

<a {href}>
    <button>
        <img
            src={imageSrc}
            alt={imageAlt}
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

button {
    @include mixins.glass-button;

    display: grid;
    place-items: center;
    max-width: 30em;

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
    }

    > img {
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
    gap: 0.25em;

    margin: 0.25em;

    font-size: 0.6666666em;
}
</style>