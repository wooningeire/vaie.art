<script lang="ts">
import type { Snippet } from "svelte";
import Biography from "./Biography.svelte";

let {
    children,
}: {
    children?: Snippet,
} = $props();
</script>

<nav>
    <Biography />

    {@render children?.()}
</nav>

<style lang="scss">
nav {
    display: flex;
    flex-direction: column-reverse;

    width: 100%;
    min-width: 0;
}
</style>
