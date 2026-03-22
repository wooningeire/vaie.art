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
button {
    display: grid;
    place-items: center;
    max-width: 30em;

    border: 2px solid oklch(0.9 0.01 200 / 0.1);
    border-radius: 0.5em;
    background-color: oklch(0.9 0.01 200 / 0.05);
    backdrop-filter: blur(0.25rem);

    box-shadow: 0 0.125rem 1rem oklch(0 0 0 / 0.5);
    cursor: pointer;
    overflow: hidden;


    &:hover,
    &:focus-within {
        border-color: oklch(0.9 0.01 200 / 0.5);

        img {
            opacity: 1;
        }
    }

    &:active {
        border-color: oklch(0.9 0.01 200 / 0.1);

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