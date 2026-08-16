<script lang="ts">
import type { GalleryProject } from "$/gallery-models/GalleryProject";
import GalleryButton from "./GalleryButton.svelte";
import GalleryProjectView from "./GalleryProjectView.svelte";

let {
    project,
    depth = 0,
}: {
    project: GalleryProject,
    depth?: number,
} = $props();

let childProjectEntries = $derived(Object.entries(project.children));
</script>

{#if project.href !== null && project.image !== null}
    <GalleryButton
        href={project.href}
        image={project.image}
        external={project.external}
    />
{/if}

{#each childProjectEntries as [projectId, childProject] (projectId)}
    <GalleryProjectView project={childProject} depth={depth + 1} />
{/each}