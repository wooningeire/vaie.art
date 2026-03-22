<script lang="ts">
import GalleryButton from "./GalleryButton.svelte";

import PudleCoverSrc from "$/assets/pudle-cover.png";
</script>

<project-gallery>
    <GalleryButton
        href="/pudle"
        imageSrc={PudleCoverSrc}
        imageAlt="Pudle"
    />
</project-gallery>

<style lang="scss">
project-gallery {
    display: flex;
    flex-direction: column;
}
</style>