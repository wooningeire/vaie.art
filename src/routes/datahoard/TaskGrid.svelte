<script lang="ts">
    import type { Task } from "$lib/pb";
    import { getPbStore } from "./PbStore.svelte";
    import TaskRow from "./TaskRow.svelte";

    import { TaskFilterSort } from "./taskFilterSort.svelte";
    import TaskControls from "./TaskControls.svelte";

    const store = getPbStore();
    const filterSort = new TaskFilterSort();

    let filteredTasks = $derived.by(() => {
        const visibleRoots = store.tasks.filter(t => {
            if (!filterSort.isVisible(t)) return false;
            
            if (!t.parent_task) return true;
            
            const parent = store.tasks.find(p => p.id === t.parent_task);
            return !parent || !filterSort.isVisible(parent);
        });

        return filterSort.processTasks(visibleRoots);
    });
</script>

<div class="task-grid-container">
    <div class="grid-controls">
        <TaskControls {filterSort} />
    </div>

    <task-grid>
        <task-grid-header>Archive</task-grid-header>
        <task-grid-header>Task</task-grid-header>
        <task-grid-header>Priority</task-grid-header>
        <task-grid-header>Completion</task-grid-header>
        <task-grid-header>Parent Task</task-grid-header>
        <task-grid-header>Target Due</task-grid-header>
        <task-grid-header>Hard Due</task-grid-header>
        <task-grid-header>Time</task-grid-header>
        <task-grid-header></task-grid-header>

        {#each filteredTasks as task (task.id)}
            <TaskRow {task} depth={0} processTasks={filterSort.processTasks} />
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
}

task-grid {
    overflow-x: auto;
    display: grid;
    grid-template-columns: repeat(9, auto);
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