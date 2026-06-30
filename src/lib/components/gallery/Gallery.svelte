<script lang="ts">
import type { GalleryProject } from "$/gallery-models/GalleryProject";
import GalleryButton from "./GalleryButton.svelte";

let {
    projects,
}: {
    projects: Record<string, GalleryProject>,
} = $props();
</script>

<project-gallery>
    <gallery-entry-list aria-live="polite">
        {#each Object.entries(projects) as [id, project] (id)}
            <GalleryButton
                href={project.href}
                imageSrc={project.imageSrc}
            />
        {:else}
            <gallery-empty>No matches</gallery-empty>
        {/each}
    </gallery-entry-list>
</project-gallery>

<style lang="scss">
@use "$/styles/mixins";

project-gallery {
    overflow: hidden;

    display: grid;
    min-height: 0;
}

gallery-entry-list {
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: safe center;
    gap: 1em;

    min-height: 0;
    padding: 2em 0;
}

gallery-empty {
    @include mixins.glass-button-small;

    align-self: center;
    color: oklch(0.95 0.04 190 / 0.8);
}
</style>
