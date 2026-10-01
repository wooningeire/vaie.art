<script lang="ts">
import { galleryTags } from "$/gallery/GalleryTag";
import GalleryTagCategory from "./GalleryTagCategory.svelte";

</script>

<gallery-search>
    <GalleryTagCategory
        label="Subject"
        tags={galleryTags.subject}
    />

    <GalleryTagCategory
        label="Purpose"
        tags={galleryTags.purpose}
    />

    <GalleryTagCategory
        label="Medium"
        tags={galleryTags.medium}
    />

    <GalleryTagCategory
        label="Tools"
        tags={galleryTags.tools}
    />
</gallery-search>

<style lang="scss">
@use "$/styles/mixins.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

gallery-search {
    display: flex;
    flex-direction: column;
    gap: 1em;
    
    width: 12em;
    padding: 1em;
    overflow: auto;
}
</style>