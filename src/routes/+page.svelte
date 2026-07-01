<script lang="ts">
import { galleryProjects } from "$/gallery-models/GalleryProject";
import Gallery from "@/gallery/Gallery.svelte";
</script>

<home-page>
    <Gallery projects={galleryProjects} />
</home-page>

<style lang="scss">
home-page {
    display: grid;

    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;

    > :global(project-gallery) {
        grid-area: 1 / 1;
    }

    > :global(gallery-controls) {
        grid-area: 1 / 1;
        align-self: flex-end;
        justify-self: flex-end;
    }
}
</style>
