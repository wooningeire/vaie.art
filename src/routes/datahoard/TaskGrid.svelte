<script lang="ts">
    import type { Task } from "$lib/pb";
    import { getPbStore } from "./PbStore.svelte";
    import TaskRow from "./TaskRow.svelte";

    const store = getPbStore();

    let filterArchive = $state("active"); // 'active', 'archived', 'all'
    let sortBy = $state("created"); // 'created', 'priority', 'target_due', 'hard_due'
    let sortDesc = $state(true);

    let isVisible = $derived((t: Task) => {
        if (filterArchive === "active") return !t.archive;
        if (filterArchive === "archived") return t.archive;
        return true;
    });

    let processTasks = $derived((tasks: Task[]) => {
        let result = tasks.filter(isVisible);

        // Sort
        result.sort((a, b) => {
            let valA: any;
            let valB: any;

            if (sortBy === "priority") {
                valA = a.expand?.priority?.value ?? Number.MAX_SAFE_INTEGER;
                valB = b.expand?.priority?.value ?? Number.MAX_SAFE_INTEGER;
            } else if (sortBy === "target_due") {
                valA = a.target_due ? new Date(a.target_due).getTime() : Number.MAX_SAFE_INTEGER;
                valB = b.target_due ? new Date(b.target_due).getTime() : Number.MAX_SAFE_INTEGER;
            } else if (sortBy === "hard_due") {
                valA = a.hard_due ? new Date(a.hard_due).getTime() : Number.MAX_SAFE_INTEGER;
                valB = b.hard_due ? new Date(b.hard_due).getTime() : Number.MAX_SAFE_INTEGER;
            } else {
                valA = new Date(a.created).getTime();
                valB = new Date(b.created).getTime();
            }

            if (valA < valB) return sortDesc ? 1 : -1;
            if (valA > valB) return sortDesc ? -1 : 1;
            // Fallback to creation date if values are equal
            const createA = new Date(a.created).getTime();
            const createB = new Date(b.created).getTime();
            return sortDesc ? (createB - createA) : (createA - createB);
        });

        return result;
    });

    let filteredTasks = $derived.by(() => {
        const visibleRoots = store.tasks.filter(t => {
            if (!isVisible(t)) return false;
            
            if (!t.parent_task) return true;
            
            const parent = store.tasks.find(p => p.id === t.parent_task);
            return !parent || !isVisible(parent);
        });

        return processTasks(visibleRoots);
    });
</script>

<div class="task-grid-container">
    <div class="grid-controls">
        <label class="control-group">
            <span>Show:</span>
            <select bind:value={filterArchive}>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="all">All</option>
            </select>
        </label>

        <label class="control-group">
            <span>Sort:</span>
            <select bind:value={sortBy}>
                <option value="created">Created</option>
                <option value="priority">Priority</option>
                <option value="target_due">Target Due</option>
                <option value="hard_due">Hard Due</option>
            </select>
        </label>

        <button onclick={() => sortDesc = !sortDesc} class="sort-dir-btn" title="Toggle Direction">
            {sortDesc ? 'Descending ▼' : 'Ascending ▲'}
        </button>
    </div>

    <task-grid>
        <task-grid-header>Archive</task-grid-header>
        <task-grid-header>Task</task-grid-header>
        <task-grid-header>Priority</task-grid-header>
        <task-grid-header>Completion</task-grid-header>
        <task-grid-header>Parent Task</task-grid-header>
        <task-grid-header>Target Due</task-grid-header>
        <task-grid-header>Hard Due</task-grid-header>
        <task-grid-header>Clock</task-grid-header>
        <task-grid-header>Time</task-grid-header>
        <task-grid-header></task-grid-header>

        {#each filteredTasks as task (task.id)}
            <TaskRow {task} depth={0} {processTasks} />
        {/each}
    </task-grid>
</div>

<style lang="scss">
@use "$/styles/mixins";

.grid-controls {
    display: flex;
    gap: 1.5rem;
    padding: 0 1rem;
    align-items: center;
    margin-top: 1rem;
    font-size: 0.9em;

    .control-group {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        select {
            @include mixins.glass-button;
            padding: 0.25rem 0.5rem;
            cursor: pointer;
        }
    }

    button.sort-dir-btn {
        @include mixins.glass-button;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
    }
}

task-grid {
    overflow-x: auto;
    display: grid;
    grid-template-columns: repeat(10, auto);
    gap: 0.5em 1em;
    align-items: center;

    padding: 1em;
    margin-top: 0.5rem;

    task-grid-header:not(:empty) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 0.5em;
        font-weight: 600;
        min-width: 60px;
    }
}
</style>