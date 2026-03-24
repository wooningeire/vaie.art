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

<div class="calendar-wrapper">
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
					{day.toLocaleDateString(undefined, { weekday: "short", month: "numeric", day: "numeric" })}
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
</div>

<style lang="scss">
	.calendar-wrapper {
		margin-bottom: 2rem;

		h2 {
			margin-bottom: 1rem;
		}
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: 50px repeat(7, 1fr);
		gap: 4px;
		height: 600px;
		background: #f9f9f9;
		border: 1px solid #ddd;
	}

	.time-axis-col {
		display: flex;
		flex-direction: column;
		border-right: 1px solid #ddd;
		background: #fff;
	}

	.time-axis {
		flex: 1;
		position: relative;
		margin: 12px 0;

		.time-label {
			position: absolute;
			transform: translateY(-50%);
			right: 8px;
			font-size: 0.75rem;
			color: #666;
		}
	}

	.day-col {
		display: flex;
		flex-direction: column;
		border-right: 1px solid #eaeaea;
		background: #fff;

		&:last-child {
			border-right: none;
		}
	}

	.day-header {
		text-align: center;
		padding: 8px 4px;
		font-weight: bold;
		border-bottom: 1px solid #ddd;
		background: #f1f1f1;
		font-size: 0.9rem;
	}

	.day-body {
		flex: 1;
		position: relative;
		margin: 12px 0;

		.grid-line {
			position: absolute;
			left: 0;
			right: 0;
			height: 1px;
			background: #f0f0f0;
			z-index: 0;
		}

		.current-time-line {
			position: absolute;
			left: 0;
			right: 0;
			height: 2px;
			background: rgba(0, 0, 255, 0.4);
			z-index: 10;
		}

		.task-line {
			position: absolute;
			left: 0;
			right: 0;
			border-top: 2px solid red;
			z-index: 5;

			.fade-up {
				position: absolute;
				bottom: 0; // sits right above the border top
				left: 0;
				right: 0;
				height: 60px; // roughly ~2.4 hours visually in a 600px grid
				background: linear-gradient(to top, rgba(255, 0, 0, 0.3), transparent);
				pointer-events: none;
			}

			.task-label {
				position: absolute;
				top: 0;
				left: 4px;
				font-size: 0.75rem;
				color: #a00;
				font-weight: bold;
				background: rgba(255, 255, 255, 0.8);
				padding: 0 4px;
				border-radius: 0 0 4px 4px;
			}
		}
	}
</style>
