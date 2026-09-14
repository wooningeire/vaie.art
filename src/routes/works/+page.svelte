<script lang="ts">
import WorksGallery from "@/gallery/WorksGallery.svelte";
import { galleryWorks } from "$/gallery-models/galleryProjectList";
</script>

<works-entries>
    <works-entries-scroller>
        <WorksGallery works={galleryWorks} />
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