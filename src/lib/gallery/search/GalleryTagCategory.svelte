<script lang="ts">
import Button from "@/generic/Button.svelte";
import { galleryState } from "./GalleryState.svelte";
import type { GalleryTag } from "../GalleryTag";

let {
    label,
    tags,
}: {
    label: string,
    tags: Record<string, GalleryTag>,
} = $props();
</script>

<gallery-tag-category>
    <h3>{label}</h3>

    <gallery-tag-category-items>
        {#each Object.values(tags) as tag (tag.id)}
            <Button
                onclick={() => {
                    if (galleryState.activeTags.has(tag)) {
                        galleryState.activeTags.delete(tag);
                    } else {
                        galleryState.activeTags.add(tag);
                    }
                }}
            >
                <gallery-tag-toggle>
                    <input
                        type="checkbox"
                        checked={galleryState.activeTags.has(tag)}
                    />

                    <gallery-tag-label>
                        {tag.label}
                    </gallery-tag-label>
                </gallery-tag-toggle>
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
}

gallery-tag-category-items {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

gallery-tag-toggle {
    display: flex;
    gap: 0.5em;
}

h3 {
    color: colors.$emph;
    font-family: fonts.$font-title;
    font-size: 1.25em;
}
</style>