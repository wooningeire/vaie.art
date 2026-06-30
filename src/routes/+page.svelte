<script lang="ts">
import { galleryProjects } from "$/gallery-models/GalleryProject";
import Background from "@/Background.svelte";
import Gallery from "@/gallery/Gallery.svelte";
import Biography from "@/Biography.svelte";
import GalleryControls from "@/gallery/GalleryControls.svelte";
</script>

<page-contents>
    <Background />

    <main>
        <Gallery projects={galleryProjects} />

        <Biography />

        <GalleryControls />
    </main>
</page-contents>


<style lang="scss">
@use "$/styles/responsive.scss";

page-contents {
    display: grid;
    place-items: center;

    :global(> *) {
        grid-area: 1/1;
    }
}

main {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr auto;
    gap: 1em;

    padding: 1em;

    width: 100vw;
    height: 100vh;
    min-width: 300px;
    min-height: 300px;

    > :global(gallery-controls) {
        grid-area: 2/1;
        align-self: flex-end;
        justify-self: flex-end;
    }

    > :global(project-gallery) {
        grid-area: 1/1;
    }

    > :global(biography-section) {
        grid-area: 3/1;
    }

    @media (min-width: responsive.$resize-threshold) {
        grid-template-rows: minmax(0, 1fr) auto;
        grid-template-columns: minmax(0, 1fr) 25em;

        padding: 0 1em;

        > :global(gallery-controls) {
            grid-area: 1/2;
        }

        > :global(biography-section) {
            grid-area: 2/2;
        }
        
        > :global(project-gallery) {
            grid-area: 1/1 / 3/2;
        }
    }
}
</style>
