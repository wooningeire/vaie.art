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
@use "$/styles/mixins";

button {
    @include mixins.glass-button-small;

    display: flex;
    gap: 0.5em;
    align-items: center;

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
