<script lang="ts">
import { workTags } from "$/works/workTags";
import WorkTagCategory from "./GalleryTagCategory.svelte";

</script>

<gallery-search>
    <WorkTagCategory
        label="Medium"
        tags={workTags.medium}
    />

    <WorkTagCategory
        label="Subject"
        tags={workTags.subject}
    />

    <WorkTagCategory
        label="Tools"
        tags={workTags.tools}
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
    
    width: 15em;
    padding: 1em;
    overflow: auto;
}
</style>