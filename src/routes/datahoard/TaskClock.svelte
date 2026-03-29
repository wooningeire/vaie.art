<script lang="ts">
import { getPbStore, formatMs } from "./PbStore.svelte";

let { taskId }: { taskId: string } = $props();

const store = getPbStore();

// Automatically tracks `store.now` because `totalTime` uses it internally
let totalMs = $derived(store.totalTime(taskId));

let activePeriod = $derived(store.timePeriods.find(p => p.task === taskId && !p.end));

// Session duration
let sessionMs = $derived(activePeriod ? store.now - new Date(activePeriod.start).getTime() : 0);
</script>


<task-clock>
    <button onclick={() => store.toggleClock(taskId)}>
        {store.activeTimePeriod?.task === taskId ? "⏹" : "▶"}
    </button>

    <span>
        {formatMs(totalMs)}
        {#if sessionMs > 0}
            <span class="session">(+{formatMs(sessionMs)})</span>
        {/if}
    </span>
</task-clock>

<style lang="scss">
    @use "$/styles/fonts";

    task-clock {
        display: flex;
        gap: 0.5em;
        align-items: center;

        font-family: fonts.$font-mono;
	    font-size: 0.85em;
    }

    .session {
        color: #888;
        font-size: 0.9em;
        margin-left: 4px;
    }
</style>
