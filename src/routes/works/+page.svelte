<script lang="ts">
import Gallery from "@/gallery/Gallery.svelte";
import { galleryProjects } from "$/gallery-models/galleryProjectList";
</script>

<svelte:head>
    <title>works | vaiezzell</title>
</svelte:head>

<works-entries>
    <works-entries-scroller>
        <Gallery projects={galleryProjects} />
    </works-entries-scroller>
</works-entries>

<style lang="scss">
works-entries {
    display: grid;
    min-width: 0;
    min-height: 0;


    mask: linear-gradient(
        to bottom,
        oklch(0 0 0 / 0),
        oklch(0 0 0) 2em,
        oklch(0 0 0) calc(100% - 2em),
        oklch(0 0 0 / 0)
    );
}

works-entries-scroller {
    padding: 2em 0;
    overflow: auto;
    min-width: 0;
    min-height: 0;
}
</style>