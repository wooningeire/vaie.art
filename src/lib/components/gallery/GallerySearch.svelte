<script lang="ts">
import { galleryTagTree } from "$/gallery-models/GalleryTags";
import GalleryTagCategory from "./GalleryTagCategory.svelte";

</script>

<gallery-search>
    <GalleryTagCategory
        label="Medium"
        tags={galleryTagTree.medium}
    />

    <GalleryTagCategory
        label="Subject"
        tags={galleryTagTree.subject}
    />
</gallery-search>

<style lang="scss">
@use "$/styles/mixins.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

gallery-search {
    display: flex;
    gap: 1em;
}
</style>