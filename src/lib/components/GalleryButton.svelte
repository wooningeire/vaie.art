<script lang="ts">
let {
    href,
    imageSrc,
    imageAlt = "",
}: {
    href: string,
    imageSrc: string,
    imageAlt?: string,
} = $props();
</script>

<a {href}>
    <button>
        <img
            src={imageSrc}
            alt={imageAlt}
        />
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

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        opacity: 0.35;
    }
}
</style>