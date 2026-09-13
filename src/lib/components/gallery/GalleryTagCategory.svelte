<script lang="ts">
import Button from "@/generic/Button.svelte";

let {
    label,
    tags,
}: {
    label: string,
    tags: Record<string, string>,
} = $props();
</script>

<gallery-tag-category>
    <h3>{label}</h3>

    <gallery-tag-category-items>
        {#each Object.entries(tags) as [tagId, tagLabel]}
            <Button>{tagLabel}</Button>
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

h3 {
    color: colors.$emph;
    font-family: fonts.$font-title;
    font-size: 1.25em;
}
</style>