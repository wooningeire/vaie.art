<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { list, create, update, remove, type PbRecord } from "$lib/pb";

	interface PriorityEnum extends PbRecord {
		label: string;
		value: number;
	}

	interface CompletionEnum extends PbRecord {
		label: string;
	}

	interface Task extends PbRecord {
		label: string;
		priority: string;
		parent_task: string;
		target_start: string;
		target_due: string;
		hard_due: string;
		completion: string;
		n_extra_hours: number;
		expand?: {
			priority?: PriorityEnum;
			completion?: CompletionEnum;
		};
	}

	interface TimePeriod extends PbRecord {
		start: string;
		end: string;
		task: string;
	}

	let tasks = $state<Task[]>([]);
	let priorities = $state<PriorityEnum[]>([]);
	let completions = $state<CompletionEnum[]>([]);
	let timePeriods = $state<TimePeriod[]>([]);

	let newTaskLabel = $state("");
	let editingTaskId = $state<string | null>(null);
	let editingLabel = $state("");

	let activeTimePeriod = $state<TimePeriod | null>(null);
	let elapsed = $state(0);
	let tickInterval: ReturnType<typeof setInterval> | undefined;

	// --- data loading ---

	async function loadAll() {
		const [tasksRes, prioritiesRes, completionsRes, periodsRes] = await Promise.all([
			list<Task>("tasks", { expand: "priority,completion", sort: "-created" }),
			list<PriorityEnum>("priority_enum", { sort: "value" }),
			list<CompletionEnum>("completion_enum"),
			list<TimePeriod>("task_time_periods", { sort: "-created" }),
		]);
		tasks = tasksRes.items;
		priorities = prioritiesRes.items;
		completions = completionsRes.items;
		timePeriods = periodsRes.items;

		// find active period (no end)
		const active = timePeriods.find(p => !p.end);
		if (active) {
			activeTimePeriod = active;
			startTicking();
		}
	}

	onMount(loadAll);
	onDestroy(() => clearInterval(tickInterval));

	// --- helpers ---

	function rootTasks(): Task[] {
		return tasks.filter(t => !t.parent_task);
	}

	function childTasks(parentId: string): Task[] {
		return tasks.filter(t => t.parent_task === parentId);
	}

	function totalTime(taskId: string): number {
		let total = 0;
		for (const p of timePeriods.filter(tp => tp.task === taskId)) {
			const start = new Date(p.start).getTime();
			const end = p.end ? new Date(p.end).getTime() : Date.now();
			total += end - start;
		}
		return total;
	}

	function formatMs(ms: number): string {
		const secs = Math.floor(ms / 1000);
		const h = Math.floor(secs / 3600);
		const m = Math.floor((secs % 3600) / 60);
		const s = secs % 60;
		return `${h}h ${m}m ${s}s`;
	}

	function formatDate(iso: string): string {
		if (!iso) return "";
		return new Date(iso).toLocaleDateString();
	}

	// --- clock ---

	function startTicking() {
		clearInterval(tickInterval);
		tickInterval = setInterval(() => {
			elapsed++;
		}, 1000);
	}

	async function toggleClock(taskId: string) {
		// stop active period if any
		if (activeTimePeriod) {
			const stoppedPeriod = await update<TimePeriod>("task_time_periods", activeTimePeriod.id, {
				end: new Date().toISOString(),
			});
			const idx = timePeriods.findIndex(p => p.id === stoppedPeriod.id);
			if (idx >= 0) timePeriods[idx] = stoppedPeriod;

			const wasActiveTask = activeTimePeriod.task;
			activeTimePeriod = null;
			clearInterval(tickInterval);
			elapsed = 0;

			// if clicking the same task, just stop
			if (wasActiveTask === taskId) return;
		}

		// start new period
		const period = await create<TimePeriod>("task_time_periods", {
			start: new Date().toISOString(),
			end: "",
			task: taskId,
		});
		timePeriods = [period, ...timePeriods];
		activeTimePeriod = period;
		startTicking();
	}

	// --- CRUD ---

	async function addTask() {
		if (!newTaskLabel.trim()) return;
		const task = await create<Task>("tasks", { label: newTaskLabel.trim() });
		tasks = [task, ...tasks];
		newTaskLabel = "";
	}

	async function deleteTask(id: string) {
		await remove("tasks", id);
		tasks = tasks.filter(t => t.id !== id);
		timePeriods = timePeriods.filter(p => p.task !== id);
		if (activeTimePeriod?.task === id) {
			activeTimePeriod = null;
			clearInterval(tickInterval);
			elapsed = 0;
		}
	}

	function startEdit(task: Task) {
		editingTaskId = task.id;
		editingLabel = task.label;
	}

	async function saveEdit(task: Task) {
		if (editingLabel.trim() && editingLabel !== task.label) {
			const updated = await update<Task>("tasks", task.id, { label: editingLabel.trim() });
			const idx = tasks.findIndex(t => t.id === task.id);
			if (idx >= 0) tasks[idx] = { ...tasks[idx], label: updated.label };
		}
		editingTaskId = null;
	}

	async function setPriority(taskId: string, priorityId: string) {
		const updated = await update<Task>("tasks", taskId, { priority: priorityId || "" });
		const idx = tasks.findIndex(t => t.id === taskId);
		if (idx >= 0) tasks[idx] = { ...tasks[idx], priority: updated.priority };
	}

	async function setCompletion(taskId: string, completionId: string) {
		const updated = await update<Task>("tasks", taskId, { completion: completionId || "" });
		const idx = tasks.findIndex(t => t.id === taskId);
		if (idx >= 0) tasks[idx] = { ...tasks[idx], completion: updated.completion };
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

	{#each rootTasks() as task (task.id)}
		{@render taskRow(task, 0)}
	{/each}
</datahoard-page>

{#snippet taskRow(task: Task, depth: number)}
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
				<span ondblclick={() => startEdit(task)}>{task.label || "(untitled)"}</span>
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

		{#if task.target_due}
			<span>due {formatDate(task.target_due)}</span>
		{/if}
		{#if task.hard_due}
			<span>hard due {formatDate(task.hard_due)}</span>
		{/if}

		<button onclick={() => toggleClock(task.id)}>
			{activeTimePeriod?.task === task.id ? "⏹" : "▶"}
		</button>

		<span>{formatMs(totalTime(task.id))}</span>

		<button onclick={() => deleteTask(task.id)}>✕</button>

		{#each childTasks(task.id) as child (child.id)}
			{@render taskRow(child, depth + 1)}
		{/each}
	</div>
{/snippet}

<style lang="scss">
</style>