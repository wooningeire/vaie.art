<script lang="ts">
    import type { Snippet } from "svelte";

let {
    href,
    label,
    icon = null,
}: {
    href: string,
    label: string,
    icon?: Snippet | null,
} = $props();
</script>

<a
    {href}
    target="_blank"
    rel="noopener noreferrer"
>
    <button tabindex="-1">
        {#if icon !== null}
            <social-button-icon>{@render icon?.()}</social-button-icon>
        {/if}

        <social-button-label>{label}</social-button-label>
    </button>
</a>

<style lang="scss">
button {
    display: flex;
    gap: 0.5em;
    align-items: center;

    padding: 0.125em 0.5em;
    border: 2px solid oklch(0.9 0.01 200 / 0.1);
    border-radius: 0.125em;
    background-color: oklch(0.9 0.01 200 / 0.05);
    backdrop-filter: blur(0.25rem);

    box-shadow: 0 0.125rem 1rem oklch(0 0 0 / 0.5);
    cursor: pointer;

    &:hover,
    &:focus-within {
        border-color: oklch(0.9 0.01 200 / 0.5);
    }

    &:active {
        border-color: oklch(0.9 0.01 200 / 0.1);
    }

    > social-button-icon {
        width: 1.25em;
        height: 1.25em;

        display: grid;
        place-items: center;
    }

    :global(svg) {
        width: 100%;
        height: 100%;
    }
}
</style>
