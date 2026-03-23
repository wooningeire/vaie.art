<script lang="ts">
import { getPbStore, formatMs } from "./PbStore.svelte";

let { taskId }: { taskId: string } = $props();

const store = getPbStore();

// Re-evaluates every second because `store.elapsed` changes.
let totalMs = $derived((store.elapsed, store.totalTime(taskId)));

let activePeriod = $derived(store.timePeriods.find(p => p.task === taskId && !p.end));

// Session duration
let sessionMs = $derived((store.elapsed, activePeriod ? Date.now() - new Date(activePeriod.start).getTime() : 0));
</script>

<button onclick={() => store.toggleClock(taskId)}>
	{store.activeTimePeriod?.task === taskId ? "⏹" : "▶"}
</button>

<span>
	{formatMs(totalMs)}
	{#if sessionMs > 0}
		<span class="session">(+{formatMs(sessionMs)})</span>
	{/if}
</span>

<style>
	.session {
		color: #888;
		font-size: 0.9em;
		margin-left: 4px;
	}
</style>
