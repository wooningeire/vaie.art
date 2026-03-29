<script lang="ts">
    import type { TaskFilterSort } from "./taskFilterSort.svelte";
    
    let { filterSort }: { filterSort: TaskFilterSort } = $props();
</script>

<label class="control-group">
    <span>Show:</span>
    <select bind:value={filterSort.filterArchive}>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
        <option value="all">All</option>
    </select>
</label>

<label class="control-group">
    <span>Sort:</span>
    <select bind:value={filterSort.sortBy}>
        <option value="created">Created</option>
        <option value="priority">Priority</option>
        <option value="target_due">Target Due</option>
        <option value="hard_due">Hard Due</option>
    </select>
</label>

<button onclick={() => filterSort.sortDesc = !filterSort.sortDesc} class="sort-dir-btn" title="Toggle Direction">
    {filterSort.sortDesc ? 'Descending ▼' : 'Ascending ▲'}
</button>

<style lang="scss">
@use "$/styles/mixins";

.control-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    select {
        @include mixins.glass-button-small;
        cursor: pointer;
    }
}

button.sort-dir-btn {
    @include mixins.glass-button-small;
    cursor: pointer;
}
</style>
