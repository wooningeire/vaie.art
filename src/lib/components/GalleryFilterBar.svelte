<script lang="ts">
import type { GalleryFacetGroup, GalleryFacetValue, GalleryQuery } from "$/gallery-tags";

let {
    facetGroups,
    activeQuery,
    onToggleFilter,
    onClearFilters,
}: {
    facetGroups: readonly GalleryFacetGroup[],
    activeQuery: GalleryQuery,
    onToggleFilter: (tag: GalleryFacetValue) => void,
    onClearFilters: () => void,
} = $props();

let activeIncludedTagIds = $derived(new Set(activeQuery.include));
let activeExcludedTagIds = $derived(new Set(activeQuery.exclude));
let hasActiveFilters = $derived(activeQuery.include.length > 0 || activeQuery.exclude.length > 0);
</script>

<gallery-filter-bar aria-label="Gallery filters">
    {#each facetGroups as group (group.facet)}
        <gallery-filter-group>
            <gallery-filter-label>{group.facet}</gallery-filter-label>

            <gallery-filter-options>
                {#each group.tags as tag (tag.id)}
                    <button
                        type="button"
                        class="filter-chip"
                        class:excluded={activeExcludedTagIds.has(tag.id)}
                        aria-pressed={activeIncludedTagIds.has(tag.id)}
                        title={`${tag.count} ${tag.count === 1 ? "entry" : "entries"}`}
                        onclick={() => onToggleFilter(tag)}
                    >
                        <span>{tag.label}</span>
                        <span class="filter-count" aria-hidden="true">{tag.count}</span>
                    </button>
                {/each}
            </gallery-filter-options>
        </gallery-filter-group>
    {/each}

    <button
        type="button"
        class="clear-filter-button"
        aria-label="Clear gallery filters"
        title={hasActiveFilters ? "Clear filters" : "No filters selected"}
        disabled={!hasActiveFilters}
        onclick={onClearFilters}
    >
        <span aria-hidden="true">&times;</span>
    </button>
</gallery-filter-bar>

<style lang="scss">
@use "$/styles/mixins";

gallery-filter-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.75rem 1rem;

    max-width: min(100%, 54rem);
    padding: 0 1rem;

    @media (min-width: 720px) {
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 0.65rem;

        width: 100%;
        max-width: 15em;
        padding: 0;
    }
}

gallery-filter-group {
    display: grid;
    gap: 0.25rem;
    min-width: 0;

    @media (min-width: 720px) {
        justify-items: flex-end;
    }
}

gallery-filter-label {
    color: oklch(0.9 0.02 200 / 0.75);
    font-size: 0.58em;
    letter-spacing: 0;
    line-height: 1;
    text-transform: uppercase;
}

gallery-filter-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    min-width: 0;

    @media (min-width: 720px) {
        justify-content: flex-end;
    }
}

button.filter-chip,
button.clear-filter-button {
    @include mixins.glass-button-small;

    color: oklch(0.95 0.04 190 / 0.9);
    font: inherit;
    line-height: 1.15;
}

button.filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;

    &[aria-pressed="true"] {
        border-color: oklch(0.95 0.06 190 / 0.65);
        background-color: oklch(0.82 0.08 190 / 0.18);
    }

    &.excluded {
        opacity: 0.65;
        text-decoration: line-through;
    }
}

.filter-count {
    opacity: 0.65;
}

button.clear-filter-button {
    align-self: end;

    display: grid;
    place-items: center;

    width: 1.65em;
    height: 1.65em;
    padding: 0;

    &:disabled {
        cursor: default;
        opacity: 0.35;
    }
}
</style>
