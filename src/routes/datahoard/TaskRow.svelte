<script lang="ts">
	import type { Task } from "$lib/pb";
	import TaskRow from "./TaskRow.svelte";
	import { getPbStore, formatMs, toDatetimeLocal } from "./PbStore.svelte";

	let { task, depth }: { task: Task; depth: number } = $props();

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

	<button onclick={() => store.toggleClock(task.id)}>
		{store.activeTimePeriod?.task === task.id ? "⏹" : "▶"}
	</button>

	<span>{formatMs(store.totalTime(task.id))}</span>

	<button onclick={() => store.deleteTask(task.id)}>✕</button>

	{#each store.childTasks(task.id) as child (child.id)}
		<TaskRow 
			task={child} 
			depth={depth + 1}
		/>
	{/each}
</div>
