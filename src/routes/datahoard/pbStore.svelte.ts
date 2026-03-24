import { list, create, update, remove } from "$lib/pb";
import type { Task, PriorityEnum, CompletionEnum, TimePeriod } from "$lib/pb";
import { setContext, getContext, onMount, onDestroy } from "svelte";

export class PbStore {
	tasks = $state<Task[]>([]);
	priorities = $state<PriorityEnum[]>([]);
	completions = $state<CompletionEnum[]>([]);
	timePeriods = $state<TimePeriod[]>([]);

	activeTimePeriod = $state<TimePeriod | null>(null);
	now = $state(Date.now());
	reqFrame: number | undefined;

	async loadAll() {
		const [tasksRes, prioritiesRes, completionsRes, periodsRes] = await Promise.all([
			list<Task>("tasks", { expand: "priority,completion", sort: "-created" }),
			list<PriorityEnum>("priority_enum", { sort: "value" }),
			list<CompletionEnum>("completion_enum"),
			list<TimePeriod>("task_time_periods", { sort: "-created" }),
		]);
		this.tasks = tasksRes.items;
		this.priorities = prioritiesRes.items;
		this.completions = completionsRes.items;
		this.timePeriods = periodsRes.items;

		const active = this.timePeriods.find(p => !p.end);
		if (active) {
			this.activeTimePeriod = active;
		}
	}

	destroy() {
		if (this.reqFrame !== undefined) cancelAnimationFrame(this.reqFrame);
	}

	rootTasks(): Task[] {
		return this.tasks.filter(t => !t.parent_task);
	}

	childTasks(parentId: string): Task[] {
		return this.tasks.filter(t => t.parent_task === parentId);
	}

	totalTime(taskId: string): number {
		let total = 0;
		for (const p of this.timePeriods.filter(tp => tp.task === taskId)) {
			const start = new Date(p.start).getTime();
			const end = p.end ? new Date(p.end).getTime() : this.now;
			total += end - start;
		}
		return total;
	}

	startTicking() {
		if (this.reqFrame !== undefined) cancelAnimationFrame(this.reqFrame);
		const tick = () => {
			this.now = Date.now();
			this.reqFrame = requestAnimationFrame(tick);
		};
		this.reqFrame = requestAnimationFrame(tick);
	}

	async toggleClock(taskId: string) {
		if (this.activeTimePeriod) {
			const stoppedPeriod = await update<TimePeriod>("task_time_periods", this.activeTimePeriod.id, {
				end: new Date().toISOString(),
			});
			const idx = this.timePeriods.findIndex(p => p.id === stoppedPeriod.id);
			if (idx >= 0) this.timePeriods[idx] = stoppedPeriod;

			const wasActiveTask = this.activeTimePeriod.task;
			this.activeTimePeriod = null;

			if (wasActiveTask === taskId) return;
		}

		const period = await create<TimePeriod>("task_time_periods", {
			start: new Date().toISOString(),
			end: "",
			task: taskId,
		});
		this.timePeriods = [period, ...this.timePeriods];
		this.activeTimePeriod = period;
	}

	async addTask(label: string) {
		if (!label.trim()) return;
		const task = await create<Task>("tasks", { label: label.trim() });
		this.tasks = [task, ...this.tasks];
	}

	async deleteTask(id: string) {
		await remove("tasks", id);
		this.tasks = this.tasks.filter(t => t.id !== id);
		this.timePeriods = this.timePeriods.filter(p => p.task !== id);
		if (this.activeTimePeriod?.task === id) {
			this.activeTimePeriod = null;
		}
	}

	async saveEdit(task: Task, newLabel: string) {
		if (newLabel.trim() && newLabel !== task.label) {
			const updated = await update<Task>("tasks", task.id, { label: newLabel.trim() });
			const idx = this.tasks.findIndex(t => t.id === task.id);
			if (idx >= 0) this.tasks[idx] = { ...this.tasks[idx], label: updated.label };
		}
	}

	async setPriority(taskId: string, priorityId: string) {
		const updated = await update<Task>("tasks", taskId, { priority: priorityId || "" });
		const idx = this.tasks.findIndex(t => t.id === taskId);
		if (idx >= 0) this.tasks[idx] = { ...this.tasks[idx], priority: updated.priority };
	}

	async setCompletion(taskId: string, completionId: string) {
		const updated = await update<Task>("tasks", taskId, { completion: completionId || "" });
		const idx = this.tasks.findIndex(t => t.id === taskId);
		if (idx >= 0) this.tasks[idx] = { ...this.tasks[idx], completion: updated.completion };
	}

	async setParentTask(taskId: string, parentId: string) {
		const updated = await update<Task>("tasks", taskId, { parent_task: parentId || "" });
		const idx = this.tasks.findIndex(t => t.id === taskId);
		if (idx >= 0) this.tasks[idx] = { ...this.tasks[idx], parent_task: updated.parent_task };
	}

	async setTargetDue(taskId: string, dateStr: string) {
		const iso = dateStr ? new Date(dateStr).toISOString() : "";
		const updated = await update<Task>("tasks", taskId, { target_due: iso });
		const idx = this.tasks.findIndex(t => t.id === taskId);
		if (idx >= 0) this.tasks[idx] = { ...this.tasks[idx], target_due: updated.target_due };
	}

	async setHardDue(taskId: string, dateStr: string) {
		const iso = dateStr ? new Date(dateStr).toISOString() : "";
		const updated = await update<Task>("tasks", taskId, { hard_due: iso });
		const idx = this.tasks.findIndex(t => t.id === taskId);
		if (idx >= 0) this.tasks[idx] = { ...this.tasks[idx], hard_due: updated.hard_due };
	}
}

export const PB_CONTEXT_KEY = Symbol("pb_store");

export function setPbStore() {
	const store = new PbStore();
	
	onMount(() => {
		store.loadAll();
		store.startTicking();
	});

	onDestroy(() => {
		store.destroy();
	});

	return setContext(PB_CONTEXT_KEY, store);
}

export function getPbStore() {
    return getContext<PbStore>(PB_CONTEXT_KEY);
}

export function formatMs(ms: number): string {
    const secs = Math.floor(ms / 1000);
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m}m ${s}s`;
}

export function toDatetimeLocal(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
}
