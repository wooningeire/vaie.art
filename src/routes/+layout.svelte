<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/vaiezzell favicon.png";
import { page } from "$app/state";
import Logomark from "@/sidenav/Logomark.svelte";
    import Nav from "./Nav.svelte";
    import Sep from "./Sep.svelte";


let {children} = $props();

const isHomepage = $derived(page.url.pathname === "/");
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<viewport-frame>
    <page-frame>
        <header>
            <Logomark noButton={isHomepage} />
        </header>

        <Sep />

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
    place-items: center;


    min-width: 18.75rem;
    min-height: 100vh;
}

page-frame {
    width: 95ch;
    max-width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    border: 1px solid oklch(1 0 0 / 0.5);
    box-shadow: -4px 4px oklch(0 0 0);
}

main {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
}

main {
    display: grid;
    min-width: 0;
    min-height: 0;
}
</style>
