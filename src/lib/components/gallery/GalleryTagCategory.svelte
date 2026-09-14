<script lang="ts">
import Button from "@/generic/Button.svelte";
    import { galleryState } from "./GalleryState.svelte";

let {
    label,
    tags,
}: {
    label: string,
    tags: Record<string, string>,
} = $props();

$inspect(galleryState.activeTags);
</script>

<gallery-tag-category>
    <h3>{label}</h3>

    <gallery-tag-category-items>
        {#each Object.entries(tags) as [tagId, tagLabel]}
            <Button
                onclick={() => {
                    if (galleryState.activeTags.has(tagId)) {
                        galleryState.activeTags.delete(tagId);
                    } else {
                        galleryState.activeTags.add(tagId);
                    }
                }}
            >
                <works-gallery-tag-toggle>
                    <works-gallery-tag-label>
                        {tagLabel}
                    </works-gallery-tag-label>

                    <input
                        type="checkbox"
                        checked={galleryState.activeTags.has(tagId)}
                    />
                </works-gallery-tag-toggle>
            </Button>
        {/each}
    </gallery-tag-category-items>
</gallery-tag-category>

<style lang="scss">
@use "$/styles/mixins.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

gallery-tag-category {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    width: 20em;
}

gallery-tag-category-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

works-gallery-tag-toggle {
    display: flex;
    gap: 0.5em;
}

h3 {
    color: colors.$emph;
    font-family: fonts.$font-title;
    font-size: 1.25em;
}
</style>