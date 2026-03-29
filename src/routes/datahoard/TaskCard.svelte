<script lang="ts">
	import type { Task } from "$lib/pb";
	import TaskClock from "./TaskClock.svelte";
	import { getPbStore, toDatetimeLocal } from "./PbStore.svelte";

	let { task }: { task: Task } = $props();

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

<div class="task-card">
	<div class="header">
		{#if editingTaskId === task.id}
			<!-- svelte-ignore a11y_autofocus -->
			<input
				type="text"
				bind:value={editingLabel}
				onkeydown={(e) => e.key === "Enter" && saveEdit()}
				onblur={() => saveEdit()}
				class="edit-input"
				autofocus
			/>
		{:else}
			<!-- svelte-ignore a11y_interactive_supports_focus -->
			<span role="button" ondblclick={startEdit} class="label">
				{task.label || "(untitled)"}
			</span>
		{/if}
		<div class="actions">
			<input
				type="checkbox"
				bind:checked={task.archive}
				onchange={(e) => store.setArchive(task.id, (e.target as HTMLInputElement).checked)}
				title="Archive"
			/>
			<button class="delete-btn" onclick={() => store.deleteTask(task.id)} title="Delete">✕</button>
		</div>
	</div>

	<div class="details">
		<label>
			<span>Pri:</span>
			<select
				value={task.priority}
				onchange={(e) => store.setPriority(task.id, (e.target as HTMLSelectElement).value)}
			>
				<option value="">—</option>
				{#each store.priorities as p (p.id)}
					<option value={p.id}>{p.label}</option>
				{/each}
			</select>
		</label>
		
		<label>
			<span>Status:</span>
			<select
				value={task.completion}
				onchange={(e) => store.setCompletion(task.id, (e.target as HTMLSelectElement).value)}
			>
				<option value="">—</option>
				{#each store.completions as c (c.id)}
					<option value={c.id}>{c.label}</option>
				{/each}
			</select>
		</label>
	</div>
	
	<div class="dates">
		{#if task.target_due || task.hard_due}
			<div class="due-dates">
				{#if task.target_due}
					<span class="due" title="Target Due">🎯 {new Date(task.target_due).toLocaleDateString()}</span>
				{/if}
				{#if task.hard_due}
					<span class="due" title="Hard Due">⏰ {new Date(task.hard_due).toLocaleDateString()}</span>
				{/if}
			</div>
		{/if}
	</div>

	<div class="footer">
		<TaskClock taskId={task.id} />
	</div>
</div>

<style lang="scss">
@use "$/styles/mixins";

.task-card {
	background: rgba(255, 255, 255, 0.03);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 0.5rem;
	padding: 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
	
	&:hover {
		background: rgba(255, 255, 255, 0.08);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;

		.label {
			flex: 1;
			font-weight: 500;
			cursor: pointer;
			word-break: break-word;
		}

		.edit-input {
			flex: 1;
			width: 100%;
			background: rgba(0, 0, 0, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.2);
			color: inherit;
			padding: 0.25rem;
			border-radius: 0.25rem;
		}

		.actions {
			display: flex;
			align-items: center;
			gap: 0.25rem;

			button.delete-btn {
				background: transparent;
				border: none;
				color: oklch(0.6 0.2 20);
				cursor: pointer;
				padding: 0.1rem 0.25rem;
				border-radius: 0.25rem;
				font-size: 0.9em;

				&:hover {
					background: rgba(255, 0, 0, 0.2);
				}
			}
		}
	}

	.details {
		display: flex;
		gap: 0.5rem;
		font-size: 0.8em;
		
		label {
			display: flex;
			align-items: center;
			gap: 0.25rem;
			background: rgba(0, 0, 0, 0.2);
			padding: 0.15rem 0.4rem;
			border-radius: 0.25rem;

			span {
				opacity: 0.7;
			}

			select {
				background: transparent;
				border: none;
				color: inherit;
				cursor: pointer;
				appearance: none;
				outline: none;
				
				option {
					background: #222;
					color: #fff;
				}
			}
		}
	}

	.dates {
		font-size: 0.8em;
		opacity: 0.8;
		
		.due-dates {
			display: flex;
			gap: 0.5rem;
			flex-wrap: wrap;

			span.due {
				background: rgba(0, 0, 0, 0.2);
				padding: 0.1rem 0.4rem;
				border-radius: 0.25rem;
			}
		}
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 0.25rem;
		padding-top: 0.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}
}
</style>
