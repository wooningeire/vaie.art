<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/vaiezzell favicon.png";
import Nav from "$/layout/Nav.svelte";
import Header from "$/layout/Header.svelte";
import Background from "$/layout/Background.svelte";
import Canvas from "$/layout/wgpu-scene/Canvas.svelte";

let {
    children,
} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<viewport-frame>
    <Background />

    <page-top>
        <Canvas />

        <Header />

        <Nav />
    </page-top>

    <main>
        {@render children()}
    </main>
</viewport-frame>

<style lang="scss">
@use "$/styles/responsive.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";
@use "$/layout/layout.scss";

viewport-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;

    min-width: 115ch;
    height: 100vh;
}

page-top {
    width: layout.$main-area-width;
    padding-top: 5em;

    display: flex;
    gap: 1.5em;
    flex-direction: column;
    align-items: stretch;
}

main {
    display: grid;
    place-items: stretch;

    overflow: auto;
}
</style>
