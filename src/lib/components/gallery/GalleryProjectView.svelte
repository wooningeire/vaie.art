<script lang="ts">
import type { GalleryProject } from "$/gallery-models/GalleryProject";
import GalleryButton from "./GalleryButton.svelte";

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
            <GalleryButton
                href={deliverable.href}
                imageSrc={deliverable.imageSrc}
            />
        {/each}
    </gallery-project-view-deliverables>
</gallery-project-view>

<style lang="scss">
@use "$/styles/fonts.scss";

gallery-project-view {
    display: flex;
    align-items: center;
    gap: 1em;
}

gallery-project-view-title {
    @include fonts.heading;

    width: 10ch;
    font-size: 1.5rem;

    text-align: right;
}

gallery-project-view-deliverables {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1em;
}
</style>