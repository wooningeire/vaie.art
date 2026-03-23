<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import TaskRow from "./TaskRow.svelte";
	import { setPbStore } from "./PbStore.svelte";

	const store = setPbStore();

	let newTaskLabel = $state("");

	onMount(() => store.loadAll());
	onDestroy(() => store.destroy());

	function addTask() {
		store.addTask(newTaskLabel);
		newTaskLabel = "";
	}
</script>

<datahoard-page>
	<h1>Tasks</h1>

	<div>
		<input
			type="text"
			placeholder="New task…"
			bind:value={newTaskLabel}
			onkeydown={(e) => e.key === "Enter" && addTask()}
		/>
		<button onclick={addTask}>Add</button>
	</div>

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
</datahoard-page>

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