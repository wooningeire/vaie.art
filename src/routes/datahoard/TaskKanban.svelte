<script lang="ts">
	import type { Task } from "$lib/pb";
	import { getPbStore } from "./PbStore.svelte";
	import TaskCard from "./TaskCard.svelte";

	const store = getPbStore();

	let groupBy = $state<"completion" | "priority">("completion");

	let columns = $derived.by(() => {
		if (groupBy === "completion") {
			return [
				{ id: "", label: "No Status" },
				...store.completions.map((c) => ({ id: c.id, label: c.label })),
			];
		} else {
			return [
				{ id: "", label: "No Priority" },
				...store.priorities.map((p) => ({ id: p.id, label: p.label })),
			];
		}
	});

	let leafTasks = $derived.by(() => {
		// Get all tasks that are active
		const activeTasks = store.tasks.filter(t => !t.archive);
		
		// Find leaf nodes (tasks that are not a parent_task to any other active task)
		const parentIds = new Set(activeTasks.map(t => t.parent_task).filter(Boolean));
		return activeTasks.filter(t => !parentIds.has(t.id));
	});

	let groupedTasks = $derived.by(() => {
		const groups: Record<string, Task[]> = {};
		for (const col of columns) {
			groups[col.id] = [];
		}

		for (const task of leafTasks) {
			const key = groupBy === "completion" ? task.completion : task.priority;
			if (groups[key]) {
				groups[key].push(task);
			} else {
				groups[""]?.push(task); // Fallback to "No Status" / "No Priority"
			}
		}

		// Sort tasks within groups if needed (e.g. by target_due or created)
		for (const key in groups) {
			groups[key].sort((a, b) => {
				const dueA = a.target_due ? new Date(a.target_due).getTime() : Number.MAX_SAFE_INTEGER;
				const dueB = b.target_due ? new Date(b.target_due).getTime() : Number.MAX_SAFE_INTEGER;
				if (dueA !== dueB) return dueA - dueB;
				return new Date(a.created).getTime() - new Date(b.created).getTime();
			});
		}

		return groups;
	});
</script>

<div class="kanban-container">
	<div class="kanban-controls">
		<label class="control-group">
			<span>Group by:</span>
			<select bind:value={groupBy}>
				<option value="completion">Completion</option>
				<option value="priority">Priority</option>
			</select>
		</label>
		<span class="leaf-notice">Showing active leaf tasks only</span>
	</div>

	<div class="kanban-board">
		{#each columns as col (col.id)}
			<div class="kanban-column">
				<div class="column-header">
					<h3>{col.label}</h3>
					<span class="count">{groupedTasks[col.id].length}</span>
				</div>
				<div class="column-cards">
					{#each groupedTasks[col.id] as task (task.id)}
						<TaskCard {task} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
@use "$/styles/mixins";

.kanban-container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 250px); /* Adjust to fit screen so columns can scroll independently */
	min-height: 40em;
}

.kanban-controls {
	display: flex;
	gap: 1.5rem;
	padding: 0 1rem;
	align-items: center;
	margin-top: 1rem;
	margin-bottom: 1rem;
	font-size: 0.9em;

	.control-group {
		display: flex;
		gap: 0.5rem;
		align-items: center;

		select {
			@include mixins.glass-button;
			padding: 0.25rem 0.5rem;
			cursor: pointer;
		}
	}
	
	.leaf-notice {
		opacity: 0.6;
		font-style: italic;
	}
}

.kanban-board {
	display: flex;
	gap: 1.5rem;
	padding: 0 1rem 1rem 1rem;
	overflow-x: auto;
	flex: 1;
	align-items: flex-start; // Keeps columns from stretching vertically to match the tallest one

	.kanban-column {
		background: rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 0.75rem;
		min-width: 300px;
		max-width: 350px;
		display: flex;
		flex-direction: column;
		max-height: 100%; // Ensure it doesn't overflow container

		.column-header {
			padding: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);

			h3 {
				font-size: 1.1em;
				font-weight: 600;
				margin: 0;
			}

			.count {
				background: rgba(255, 255, 255, 0.1);
				padding: 0.1rem 0.5rem;
				border-radius: 1rem;
				font-size: 0.8em;
			}
		}

		.column-cards {
			padding: 1rem;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			overflow-y: auto; // Scrollable list of cards!
			flex: 1;

			/* Custom scrollbar for column */
			&::-webkit-scrollbar {
				width: 6px;
			}
			&::-webkit-scrollbar-track {
				background: transparent;
			}
			&::-webkit-scrollbar-thumb {
				background: rgba(255, 255, 255, 0.1);
				border-radius: 3px;
			}
			&::-webkit-scrollbar-thumb:hover {
				background: rgba(255, 255, 255, 0.2);
			}
		}
	}
}
</style>
