<script lang="ts">
	import { getPbStore } from "./PbStore.svelte";

	const store = getPbStore();


	function getMonday(d: Date) {
		const date = new Date(d);
		const day = date.getDay();
		const diff = date.getDate() - day + (day === 0 ? -6 : 1);
		return new Date(date.setDate(diff));
	}

	let weekStart = $derived(() => {
		const d = getMonday(new Date(store.now));
		d.setHours(0, 0, 0, 0);
		return d;
	});

	let days = $derived(() => {
		const base = weekStart();
		return Array.from({ length: 7 }).map((_, i) => {
			const d = new Date(base);
			d.setDate(d.getDate() + i);
			return d;
		});
	});

	function getTasksForDay(day: Date) {
		const startMs = day.getTime();
		const endMs = startMs + 24 * 60 * 60 * 1000;
		return store.tasks.filter((t) => {
			if (!t.hard_due) return false;
			const dueMs = new Date(t.hard_due).getTime();
			return dueMs >= startMs && dueMs < endMs;
		});
	}

    const nowDate = $derived(new Date(store.now));
    const nowPct = $derived(((nowDate.getHours() + nowDate.getMinutes() / 60) / 24) * 100);
</script>

<task-calendar>
	<h2>Weekly Calendar (Hard Due)</h2>
	<div class="calendar-grid">
		<div class="time-axis-col">
			<div class="day-header" style="visibility: hidden;">Time</div>
			<div class="time-axis">
				{#each Array.from({ length: 25 }) as _, hour}
					<div class="time-label" style="top: {(hour / 24) * 100}%">
						{hour.toString().padStart(2, "0")}:00
					</div>
				{/each}
			</div>
		</div>

		{#each days() as day}
			<div class="day-col">
				<div class="day-header">
					{day.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit",  })}
				</div>
				<div class="day-body">
					<!-- Time grid lines -->
					{#each Array.from({ length: 25 }) as _, hour}
						<div class="grid-line" style="top: {(hour / 24) * 100}%"></div>
					{/each}

					<!-- Current time indicator if today -->
					{#if day.toDateString() === nowDate.toDateString()}
						<div class="current-time-line" style="top: {nowPct}%"></div>
					{/if}

					<!-- Tasks -->
					{#each getTasksForDay(day) as task (task.id)}
						{@const date = new Date(task.hard_due)}
						{@const hours = date.getHours() + date.getMinutes() / 60}
						{@const topPercent = (hours / 24) * 100}
						
						<div class="task-line" style="top: {topPercent}%">
							<div class="fade-up"></div>
							<span class="task-label">{task.label || "(untitled)"}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</task-calendar>

<style lang="scss">

	.calendar-grid {
		display: grid;
		grid-template-columns: 50px repeat(7, 1fr);

		height: 50em;
		padding: 0 1em;
		margin: 2em 0;
	}

	.time-axis-col {
		display: flex;
		flex-direction: column;
		border-right: 2px solid oklch(1 0 0 / 0.5);
	}

	.time-axis {
		flex: 1;
		position: relative;

		.time-label {
			position: absolute;
			transform: translateY(-50%);
			right: 0.5em;
		}
	}

	.day-col {
		display: flex;
		flex-direction: column;
		border-right: 1px solid oklch(1 0 0 / 0.5);

		&:last-child {
			border-right: none;
		}
	}

	.day-header {
		padding: 0.5em;
		border-bottom: 1px solid oklch(1 0 0 / 0.5);
	}

	.day-body {
		flex: 1;
		position: relative;

		.grid-line {
			position: absolute;
			left: 0;
			right: 0;
			height: 1px;
			background: oklch(1 0 0 / 0.15);
			z-index: 0;
		}

		.current-time-line {
			position: absolute;
			left: 0;
			right: 0;
			height: 2px;
			background: oklch(0.9 0.2 160);
			z-index: 10;
		}

		.task-line {
			position: absolute;
			left: 0;
			right: 0;
			border-top: 2px solid oklch(0.9 0.2 350);
			z-index: 5;

			.fade-up {
				position: absolute;
				bottom: 0; // sits right above the border top
				left: 0;
				right: 0;
				height: 60px; // roughly ~2.4 hours visually in a 600px grid
				background: linear-gradient(to top, oklch(0.9 0.2 350 / 0.3), oklch(0 0 0 / 0));
				pointer-events: none;
			}

			.task-label {
				position: absolute;
				top: 0;
				padding: 0 4px;
				border-radius: 0 0 4px 4px;

				color: oklch(0.9 0.2 350 / 0.7);
			}
		}
	}
</style>
