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

{#if project.image === null}
    <project-group-label
        style:--depth={depth}
    >
        {project.label}
    </project-group-label>
{/if}

{#if project.href !== null && project.image !== null}
    <GalleryButton
        href={project.href}
        image={project.image}
        external={project.external}
    />
{/if}

{#each childProjectEntries as [projectId, childProject] (projectId)}
    <GalleryProjectView
        project={childProject}
        depth={depth + 1}
    />
{/each}

{#if project.image === null}
    <project-group-label
        style:--depth={depth}
        class:end={true}
    >
    </project-group-label>
{/if}

<style lang="scss">
@use "$/styles/fonts.scss";

project-group-label {
    display: grid;
    place-items: center;
    text-align: center;
    width: min-content;
    padding: 0 0.5rem;

    font-family: fonts.$font-title;
    font-weight: 600;
    font-size: 1.25rem;
    color: oklch(1 0 0);
    
    background: oklch(calc(0.4 + 0.15 * var(--depth)) 0.03 180 / 0.5);
    box-shadow: 0 0 4px 4px oklch(0.9 0.02 190 / 0.2) inset;

    backdrop-filter: blur(2px);

    --depth: 0;

    &:not(.end) {
        min-width: 6.5rem;
        border-radius: 1rem 0 0 1rem;
    }

    &.end {
        border-radius: 0 1rem 1rem 0;
    }
}
</style>