<script lang="ts">
import { galleryProjects } from "$/gallery-models/GalleryProject";
import Background from "@/Background.svelte";
import Gallery from "@/gallery/Gallery.svelte";
import Biography from "@/Biography.svelte";
</script>

<page-contents>
    <Background />

    <main>
        <Gallery projects={galleryProjects} />

        <Biography />
    </main>
</page-contents>


<style lang="scss">
page-contents {
    display: grid;
    place-items: center;

    :global(> *) {
        grid-area: 1/1;
    }
}

main {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    grid-template-columns: minmax(0, 1fr);
    gap: 1em;

    padding: 1em;

    width: 100vw;
    height: 100vh;
    min-width: 300px;
    min-height: 300px;

    > :global(gallery-filter-bar) {
        grid-area: 1/1;
        align-self: flex-start;
        justify-self: center;
    }

    > :global(project-gallery) {
        grid-area: 2/1;
    }

    > :global(biography-section) {
        grid-area: 3/1;
    }

    @media (min-width: 720px) {
        grid-template-rows: minmax(0, 1fr) auto;
        grid-template-columns: minmax(0, 1fr) 15em;

        padding: 0 1em;

        > :global(gallery-filter-bar) {
            grid-area: 1/2;
            align-self: flex-end;
            justify-self: flex-end;

            max-height: calc(100vh - 16rem);
            padding: 1rem 0 0;
            overflow-y: auto;
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
