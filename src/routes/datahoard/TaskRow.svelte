<script lang="ts">
	import type { Task, PriorityEnum, CompletionEnum, TimePeriod } from "$lib/pb";
	import TaskRow from "./TaskRow.svelte";

	let {
		task,
		depth,
		tasks,
		priorities,
		completions,
		activeTimePeriod,
		editingTaskId,
		editingLabel = $bindable(),
		startEdit,
		saveEdit,
		setPriority,
		setCompletion,
		setParentTask,
		setTargetDue,
		setHardDue,
		toggleClock,
		deleteTask,
		toDatetimeLocal,
		formatMs,
		totalTime,
		childTasks
	}: {
		task: Task;
		depth: number;
		tasks: Task[];
		priorities: PriorityEnum[];
		completions: CompletionEnum[];
		activeTimePeriod: TimePeriod | null;
		editingTaskId: string | null;
		editingLabel: string;
		startEdit: (t: Task) => void;
		saveEdit: (t: Task) => void;
		setPriority: (id: string, val: string) => void;
		setCompletion: (id: string, val: string) => void;
		setParentTask: (id: string, val: string) => void;
		setTargetDue: (id: string, val: string) => void;
		setHardDue: (id: string, val: string) => void;
		toggleClock: (id: string) => void;
		deleteTask: (id: string) => void;
		toDatetimeLocal: (iso: string) => string;
		formatMs: (ms: number) => string;
		totalTime: (id: string) => number;
		childTasks: (id: string) => Task[];
	} = $props();
</script>

<div style="margin-left: {depth * 24}px">
	<span>
		{#if editingTaskId === task.id}
			<input
				type="text"
				bind:value={editingLabel}
				onkeydown={(e) => e.key === "Enter" && saveEdit(task)}
				onblur={() => saveEdit(task)}
			/>
		{:else}
			<span role="button" tabindex="0" ondblclick={() => startEdit(task)}>{task.label || "(untitled)"}</span>
		{/if}
	</span>

	<select
		value={task.priority}
		onchange={(e) => setPriority(task.id, (e.target as HTMLSelectElement).value)}
	>
		<option value="">—</option>
		{#each priorities as p (p.id)}
			<option value={p.id}>{p.label}</option>
		{/each}
	</select>

	<select
		value={task.completion}
		onchange={(e) => setCompletion(task.id, (e.target as HTMLSelectElement).value)}
	>
		<option value="">—</option>
		{#each completions as c (c.id)}
			<option value={c.id}>{c.label}</option>
		{/each}
	</select>

	<select
		value={task.parent_task}
		onchange={(e) => setParentTask(task.id, (e.target as HTMLSelectElement).value)}
	>
		<option value="">[no parent]</option>
		{#each tasks.filter((t) => t.id !== task.id) as p (p.id)}
			<option value={p.id}>{p.label || p.id}</option>
		{/each}
	</select>

	<label>
		Target: 
		<input 
			type="datetime-local"
			value={toDatetimeLocal(task.target_due)}
			onchange={(e) => setTargetDue(task.id, (e.target as HTMLInputElement).value)}
		/>
	</label>

	<label>
		Hard: 
		<input 
			type="datetime-local"
			value={toDatetimeLocal(task.hard_due)}
			onchange={(e) => setHardDue(task.id, (e.target as HTMLInputElement).value)}
		/>
	</label>

	<button onclick={() => toggleClock(task.id)}>
		{activeTimePeriod?.task === task.id ? "⏹" : "▶"}
	</button>

	<span>{formatMs(totalTime(task.id))}</span>

	<button onclick={() => deleteTask(task.id)}>✕</button>

	{#each childTasks(task.id) as child (child.id)}
		<TaskRow 
			task={child} 
			depth={depth + 1}
			{tasks} {priorities} {completions} {activeTimePeriod}
			{editingTaskId} bind:editingLabel
			{startEdit} {saveEdit} {setPriority} {setCompletion}
			{setParentTask} {setTargetDue} {setHardDue}
			{toggleClock} {deleteTask}
			{toDatetimeLocal} {formatMs} {totalTime} {childTasks}
		/>
	{/each}
</div>
