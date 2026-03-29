<script lang="ts">
	import TaskRow from "./TaskRow.svelte";
	import TaskCalendar from "./TaskCalendar.svelte";
	import { setPbStore } from "./PbStore.svelte";
    import TaskGrid from "./TaskGrid.svelte";
	import TaskKanban from "./TaskKanban.svelte";

	const store = setPbStore();

	let newTaskLabel = $state("");
	let viewMode = $state<"grid" | "calendar" | "kanban">("grid");

	function addTask() {
		store.addTask(newTaskLabel);
		newTaskLabel = "";
	}
</script>

<datahoard-page>
	<h1>Tasks</h1>

	<div class="controls">
		<div class="add-task">
			<input
				type="text"
				placeholder="New task…"
				bind:value={newTaskLabel}
				onkeydown={(e) => e.key === "Enter" && addTask()}
			/>
			<button onclick={addTask}>Add</button>
		</div>

		<div class="tabs">
			<button class:active={viewMode === 'grid'} onclick={() => viewMode = 'grid'}>Grid</button>
			<button class:active={viewMode === 'calendar'} onclick={() => viewMode = 'calendar'}>Calendar</button>
			<button class:active={viewMode === 'kanban'} onclick={() => viewMode = 'kanban'}>Kanban</button>
		</div>
	</div>

	{#if viewMode === 'calendar'}
		<TaskCalendar />
	{:else if viewMode === 'kanban'}
		<TaskKanban />
	{:else}
		<TaskGrid />
	{/if}
</datahoard-page>

<style lang="scss">
@use "$/styles/mixins";

	.controls {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.add-task {
		display: flex;
		gap: 0.5rem;
	}
	
	.tabs {
		display: flex;
		gap: 0.25rem;
		background: rgba(0, 0, 0, 0.05);
		padding: 0.25rem;
		border-radius: 0.5rem;

		button {
			padding: 0.25rem 0.75rem;
			border: none;
			background: transparent;
			color: inherit;
			cursor: pointer;
			border-radius: 0.25rem;
			transition: background 0.2s, box-shadow 0.2s;

			@include mixins.glass-button;
		}
	}
</style>