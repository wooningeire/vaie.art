<script lang="ts">
    import { getPbStore } from "./PbStore.svelte";
    import TaskRow from "./TaskRow.svelte";

    const store = getPbStore();
</script>

<task-grid>
    <task-grid-header>Task</task-grid-header>
    <task-grid-header>Priority</task-grid-header>
    <task-grid-header>Completion</task-grid-header>
    <task-grid-header>Parent Task</task-grid-header>
    <task-grid-header>Target Due</task-grid-header>
    <task-grid-header>Hard Due</task-grid-header>
    <task-grid-header>Clock</task-grid-header>
    <task-grid-header>Time</task-grid-header>
    <task-grid-header></task-grid-header>

    {#each store.rootTasks() as task (task.id)}
        <TaskRow {task} depth={0} />
    {/each}
</task-grid>

<style lang="scss">
task-grid {

    overflow-x: auto;
    display: grid;
    grid-template-columns: minmax(200px, 1fr) repeat(8, max-content);
    gap: 0.5em 1em;
    align-items: center;

    padding: 1em;
    margin-top: 1rem;

    

    task-grid-header:not(:empty) {
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.5em;

        font-weight: 600;
    }
}
</style>