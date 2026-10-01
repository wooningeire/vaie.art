<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/vaiezzell favicon.png";
import Nav from "./Nav.svelte";
import Header from "./Header.svelte";
import Background from "@/Background.svelte";
import Canvas from "./Canvas.svelte";

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

viewport-frame {
    display: grid;
    justify-items: center;

    grid-template-columns: 1fr 95ch 1fr;
    grid-template-rows: auto 1fr;

    min-width: 115ch;
    min-height: 100vh;

    > page-top {
        place-self: stretch;
        grid-area: 1/2;
    }

    > main {
        place-self: stretch;
        grid-area: 2/2;
    }
}

page-top {
    padding-top: 5em;

    display: flex;
    gap: 1.5em;
    flex-direction: column;
    align-items: stretch;
}

main {
    flex: 1 1 0;
    overflow: auto;
}
</style>
