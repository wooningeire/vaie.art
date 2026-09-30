<script lang="ts">
    import { page } from "$app/state";
import Button from "@/generic/Button.svelte";

let {
    href,
    label,
}: {
    href: string,
    label: string,
} = $props();

const isCurrent = $derived(new URL(href, page.url).href === page.url.href);
</script>

<nav-item class:current={isCurrent}>
    <a
        {href}
    >
        <Button
            noBg={isCurrent}
        >
            {label}
        </Button>
    </a>
</nav-item>

<style lang="scss">
nav-item {
    transition: transform 0.5s cubic-bezier(0, 1.5, 0.5, 1);

    &.current {
        transform: translateY(0.5em);

        :global(button) {
            color: oklch(1 0 0);
        }
    }
}
</style>