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

    <tasks-list>
        {#each store.rootTasks() as task (task.id)}
            <TaskRow {task} depth={0} />
        {/each}
    </tasks-list>
</datahoard-page>

<style lang="scss">
</style>