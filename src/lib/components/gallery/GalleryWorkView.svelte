<script lang="ts">
import type { WorkEntry } from "$/gallery-models/WorkEntry";
import GalleryButton from "./GalleryButton.svelte";
import GalleryWorkView from "./GalleryWorkView.svelte";

let {
    work,
    depth = 0,
}: {
    work: WorkEntry,
    depth?: number,
} = $props();

let childProjectEntries = $derived(Object.entries(work.children));
</script>

{#if work.href !== null && work.image !== null}
    <GalleryButton
        href={work.href}
        image={work.image}
        external={work.external}
    />
{/if}

{#each childProjectEntries as [projectId, childProject] (projectId)}
    <GalleryWorkView
        work={childProject}
        depth={depth + 1}
    />
{/each}