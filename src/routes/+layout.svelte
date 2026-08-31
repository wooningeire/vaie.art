<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/favicon.svg";
import BackgroundCanvas from "./Canvas.svelte";
import HomepageBottom from "@/sidenav/HomepageBottom.svelte";

let {children} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<frame-full>
    <BackgroundCanvas />

    <frame-small>
        <main>
            {@render children()}
        </main>

        <nav>
            <nav-item>works</nav-item>
            <nav-item>characters</nav-item>
            <nav-item>links</nav-item>
            <nav-item>friends</nav-item>
        </nav>

        <HomepageBottom />
    </frame-small>
</frame-full>

<style lang="scss">
@use "$/styles/responsive.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

frame-full {
    display: grid;
    place-items: center;

    min-width: 18.75rem;
    min-height: 100vh;
}

frame-small {
    grid-area: 1/1;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 15em 1fr;
    gap: 3em;

    width: 100vw;
    height: 100vh;
    height: 100svh;
    padding: 1rem;

    > nav {
        grid-area: 1/1;
    }

    > main {
        grid-area: 1/2;
    }

    > :global(homepage-bottom) {
        grid-area: 2/1 / 3/3;
    }
}

nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;

    font-size: 1.5em;
    color: colors.$emph;
    font-family: fonts.$font-title;
}

main {
    display: grid;
    min-width: 0;
    min-height: 0;
}
@media (min-width: responsive.$resize-threshold) {
}
</style>
