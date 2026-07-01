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

let DescriptionComponent = $derived(project.descriptionComponent);
let childProjectEntries = $derived(Object.entries(project.children));
</script>

<gallery-project-view
    class:top-level={depth === 0}
    class:child-project={depth > 0}
    class:has-children={project.hasChildren}
    class:has-link={project.hasLink}
>
    <gallery-project-heading>
        <gallery-project-view-title>
            {project.label}
        </gallery-project-view-title>

        {#if DescriptionComponent}
            <gallery-project-description>
                <DescriptionComponent />
            </gallery-project-description>
        {/if}
    </gallery-project-heading>

    {#if project.href !== null && project.image !== null}
        <gallery-project-link>
            <GalleryButton
                href={project.href}
                image={project.image}
                external={project.external}
            />
        </gallery-project-link>
    {/if}

    {#if childProjectEntries.length > 0}
        <gallery-project-view-children>
            {#each childProjectEntries as [projectId, childProject] (projectId)}
                <GalleryProjectView project={childProject} depth={depth + 1} />
            {/each}
        </gallery-project-view-children>
    {/if}
</gallery-project-view>

<style lang="scss">
@use "$/styles/fonts.scss";
@use "$/styles/responsive.scss";

gallery-project-view {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    min-width: 0;

    &.top-level {
        padding: 0.5em 1em;

        background: oklch(0.7 0.05 150 / 0.05);
        box-shadow: 0 0 4rem oklch(0.8 0.04 140 / 0.25) inset;

        backdrop-filter: blur(0.25rem);
        border-radius: 1em;

        @media screen and (min-width: responsive.$resize-threshold) {
            font-size: 1.25rem;
        }
    }

    &.child-project.has-link {
        font-size: 1rem;
    }
}

gallery-project-heading {
    display: block;

    min-width: 0;
}

gallery-project-view-title {
    @include fonts.heading;

    display: block;

    overflow-wrap: anywhere;
}

gallery-project-description {
    display: block;

    min-width: 0;
}

gallery-project-link {
    display: block;
}

gallery-project-view-children {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;

    min-width: 0;
}
</style>
