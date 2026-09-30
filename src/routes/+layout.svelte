<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/vaiezzell favicon.png";
import Nav from "./Nav.svelte";
import Sep from "./Sep.svelte";
import Header from "./Header.svelte";
import Background from "@/Background.svelte";
import Canvas from "./Canvas.svelte";

let {children} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<viewport-frame>
    <Background />

    <page-frame>
        <Canvas />

        <Header />

        <Nav />

        <main>
            {@render children()}
        </main>
    </page-frame>
</viewport-frame>

<style lang="scss">
@use "$/styles/responsive.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

viewport-frame {
    display: grid;
    justify-items: center;

    min-width: 18.75rem;
    min-height: 100vh;
}

page-frame {
    width: 95ch;
    max-width: 100vw;
    margin-top: 10em;

    display: flex;
    gap: 1.5em;
    flex-direction: column;
    align-items: stretch;
}
</style>
