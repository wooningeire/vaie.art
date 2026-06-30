<script lang="ts">
import type { GalleryProject } from "$/gallery-models/GalleryProject";
import GalleryDeliverableView from "./GalleryDeliverableView.svelte";

let {
    project,
}: {
    project: GalleryProject,
} = $props();
</script>


<gallery-project-view>
    <gallery-project-view-title>
        {project.label}
    </gallery-project-view-title>

    <gallery-project-view-deliverables>
        {#each Object.entries(project.deliverables) as [deliverableId, deliverable] (deliverableId)}
            <GalleryDeliverableView {deliverable} />
        {/each}
    </gallery-project-view-deliverables>
</gallery-project-view>

<style lang="scss">
@use "$/styles/fonts.scss";
@use "$/styles/responsive.scss";

gallery-project-view {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    padding: 0.5em 1em;

    background: oklch(0.7 0.05 150 / 0.05);
    box-shadow: 0 0 64px oklch(0.8 0.04 140 / 0.25) inset;
    
    backdrop-filter: blur(4px);
    border-radius: 1em;

    @media screen and (min-width: responsive.$resize-threshold) {
        font-size: 1.25rem;
    }
}

gallery-project-view-title {
    @include fonts.heading;
}

gallery-project-view-deliverables {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;
}
</style>