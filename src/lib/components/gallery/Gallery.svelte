<script lang="ts">
import { GalleryProject } from "$/gallery-models/GalleryProject";
import GalleryProjectView from "./GalleryProjectView.svelte";

let {
    projects,
}: {
    projects: Record<string, GalleryProject>,
} = $props();
</script>

<project-gallery>
    <gallery-entry-list aria-live="polite">
        {#each Object.entries(projects) as [projectId, project] (projectId)}
            <GalleryProjectView {project} />
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
    gap: 0.5em;

    min-height: 0;
    padding: 2em 0;
}

gallery-empty {
    @include mixins.glass-button-small;

    align-self: center;
    color: oklch(0.95 0.04 190 / 0.8);
}
</style>
