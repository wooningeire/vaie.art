<script lang="ts">
import { GpuRunner } from "./GpuRunner.svelte";
import { onMount } from "svelte";

let canvas: HTMLCanvasElement;
let runner = $state<GpuRunner | null>(null);

let clientWidth = $state(0);
let clientHeight = $state(0);
let dpr = $state(1);

let width = $derived(Math.round(clientWidth * dpr));
let height = $derived(Math.round(clientHeight * dpr));

onMount(async () => {
    const runnerResult = await GpuRunner.create({canvas});
    if (runnerResult === null) return;

    runner = runnerResult;
});

$effect(() => {
    if (runner === null || width === 0 || height === 0) return;
    runner.draw();
});

const onResize = () => {
    dpr = devicePixelRatio;
};

onMount(onResize);
</script>

<svelte:window
    onresize={onResize}
/>

<canvas-container
    bind:clientWidth
    bind:clientHeight
>
    <canvas
        bind:this={canvas}
        {width}
        {height}
    ></canvas>
</canvas-container>

<style lang="scss">
canvas-container {
    grid-area: 1/1 / -1/-1;
    height: 100%;

    display: grid;

    > canvas {
        place-items: stretch;
        max-width: 100%;
        max-height: 100%;
    }
}
</style>