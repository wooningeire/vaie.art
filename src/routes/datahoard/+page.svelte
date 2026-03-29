<script lang="ts">
	import TaskRow from "./TaskRow.svelte";
	import TaskCalendar from "./TaskCalendar.svelte";
	import { setPbStore } from "./PbStore.svelte";
    import TaskGrid from "./TaskGrid.svelte";

	const store = setPbStore();

	let newTaskLabel = $state("");

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

	<TaskCalendar />

	<TaskGrid />
</datahoard-page>