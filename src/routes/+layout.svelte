<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/favicon.svg";
import Sidenav from "@/sidenav/Sidenav.svelte";
import GallerySearch from "@/gallery/GallerySearch.svelte";
import { page } from "$app/state";
import Canvas from "./Canvas.svelte";

let {children} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<frame-full>
    <Canvas />

    <frame-small>
        <main>
            {@render children()}
        </main>

        <site-sidenav>
            <Sidenav>
                {#if page.url.pathname === "/"}
                    <GallerySearch />
                {/if}
            </Sidenav>
        </site-sidenav>
    </frame-small>
</frame-full>

<style lang="scss">
@use "$/styles/responsive.scss";

frame-full {
    display: grid;
    place-items: stretch;

    min-width: 18.75rem;
    min-height: 100vh;
    min-height: 100svh;
}

frame-small {
    grid-area: 1/1;

    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    grid-template-columns: minmax(0, 1fr);
    gap: 1em;

    width: 100vw;
    height: 100vh;
    height: 100svh;
    padding: 1em;
}

main {
    grid-area: 1 / 1;

    display: grid;
    min-width: 0;
    min-height: 0;
}

site-sidenav {
    grid-area: 2 / 1;
    align-self: flex-end;
    justify-self: flex-end;

    display: grid;
    width: min(100%, 25em);
    min-width: 0;
}

site-sidenav > :global(nav) {
    min-width: 0;
}

@media (min-width: responsive.$resize-threshold) {
    app-frame {
        grid-template-rows: minmax(0, 1fr);
        grid-template-columns: minmax(0, 1fr) minmax(0, 25em);

        padding: 0 1em;
    }

    site-sidenav {
        grid-area: 1 / 2;

        padding: 1em 0;
    }
}
</style>
