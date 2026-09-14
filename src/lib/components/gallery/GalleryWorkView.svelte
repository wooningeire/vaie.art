<script lang="ts">
import type { WorkEntry } from "$/works/WorkEntry";
    import Button from "@/generic/Button.svelte";
import GalleryButton from "./GalleryButton.svelte";
import GalleryWorkView from "./GalleryWorkView.svelte";

let {
    work,
}: {
    work: WorkEntry,
} = $props();
</script>

{#if work.image !== null}
    <GalleryButton
        href={work.href}
        imageVariants={work.image}
        label={work.label}
        external={work.external}
    />
{:else}
    <Button>{work.label}</Button>
{/if}