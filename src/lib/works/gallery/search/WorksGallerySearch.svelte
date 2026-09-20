<script lang="ts">
import { workTags } from "$/works/workTags";
import WorksGalleryTagCategory from "./WorksGalleryTagCategory.svelte";

</script>

<works-gallery-search>
    <WorksGalleryTagCategory
        label="Medium"
        tags={workTags.medium}
    />

    <WorksGalleryTagCategory
        label="Subject"
        tags={workTags.subject}
    />

    <WorksGalleryTagCategory
        label="Tools"
        tags={workTags.tools}
    />
</works-gallery-search>

<style lang="scss">
@use "$/styles/mixins.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

works-gallery-search {
    display: flex;
    flex-direction: column;
    gap: 1em;
    
    width: 15em;
    padding: 1em;
    overflow: auto;
}
</style>