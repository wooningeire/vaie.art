<script lang="ts">
	import type { Task } from "$lib/pb";
	import TaskRow from "./TaskRow.svelte";
	import TaskClock from "./TaskClock.svelte";
	import { getPbStore, toDatetimeLocal } from "./PbStore.svelte";

	let { task, depth, processTasks }: { task: Task; depth: number; processTasks?: (tasks: Task[]) => Task[] } = $props();

	const store = getPbStore();
	let editingTaskId = $state<string | null>(null);
	let editingLabel = $state("");

	function startEdit() {
		editingTaskId = task.id;
		editingLabel = task.label;
	}

	function saveEdit() {
		store.saveEdit(task, editingLabel);
		editingTaskId = null;
	}
</script>

<div style="display: contents;">
	<div>
		<input
			type="checkbox"
			bind:checked={task.archive}
			onchange={(e) => store.setArchive(task.id, (e.target as HTMLInputElement).checked)}
		/>
	</div>

	<div style="padding-left: {depth * 24}px; display: flex; align-items: center;">
		{#if editingTaskId === task.id}
			<input
				type="text"
				bind:value={editingLabel}
				onkeydown={(e) => e.key === "Enter" && saveEdit()}
				onblur={() => saveEdit()}
				style="width: 100%;"
			/>
		{:else}
			<span role="button" tabindex="0" ondblclick={startEdit} style="cursor: pointer; width: 100%;">
				{task.label || "(untitled)"}
			</span>
		{/if}
	</div>

	<select
		value={task.priority}
		onchange={(e) => store.setPriority(task.id, (e.target as HTMLSelectElement).value)}
	>
		<option value="">—</option>
		{#each store.priorities as p (p.id)}
			<option value={p.id}>{p.label}</option>
		{/each}
	</select>

	<select
		value={task.completion}
		onchange={(e) => store.setCompletion(task.id, (e.target as HTMLSelectElement).value)}
	>
		<option value="">—</option>
		{#each store.completions as c (c.id)}
			<option value={c.id}>{c.label}</option>
		{/each}
	</select>

	<select
		value={task.parent_task}
		onchange={(e) => store.setParentTask(task.id, (e.target as HTMLSelectElement).value)}
	>
		<option value="">[no parent]</option>
		{#each store.tasks.filter((t) => t.id !== task.id) as p (p.id)}
			<option value={p.id}>{p.label || p.id}</option>
		{/each}
	</select>

	<input 
		type="datetime-local"
		value={toDatetimeLocal(task.target_due)}
		onchange={(e) => store.setTargetDue(task.id, (e.target as HTMLInputElement).value)}
	/>

	<input 
		type="datetime-local"
		value={toDatetimeLocal(task.hard_due)}
		onchange={(e) => store.setHardDue(task.id, (e.target as HTMLInputElement).value)}
	/>

	<TaskClock taskId={task.id} />

	<button onclick={() => store.deleteTask(task.id)}>✕</button>

	{#each processTasks ? processTasks(store.childTasks(task.id)) : store.childTasks(task.id) as child (child.id)}
		<TaskRow 
			task={child} 
			depth={depth + 1}
			{processTasks}
		/>
	{/each}
</div>

<style lang="scss">
@use "$/styles/mixins";
@use "$/styles/fonts";

div {
	display: contents;
}

input[type="checkbox"] {
	width: 1em;
	height: 1em;
}

input[type="text"],
input[type="datetime-local"],
select,
button {
	@include mixins.glass-button-small;
}

input[type="datetime-local"] {
	font-family: fonts.$font-mono;
	font-size: 0.85em;
}
</style>
