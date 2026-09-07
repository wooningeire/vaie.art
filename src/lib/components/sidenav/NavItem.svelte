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

const emph = $derived(new URL(href, page.url).href === page.url.href);
</script>

<nav-item>
    <a
        {href}
    >
        <Button {emph}>{label}</Button>
    </a>
</nav-item>