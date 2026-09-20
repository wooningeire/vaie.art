<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/vaiezzell favicon.png";
import HomepageBottom from "@/sidenav/HomepageBottom.svelte";
import NavItem from "@/sidenav/NavItem.svelte";
import { page } from "$app/state";
import Logomark from "@/sidenav/Logomark.svelte";
import Background from "@/Background.svelte";
import GallerySearch from "@/gallery/GallerySearch.svelte";


let {children} = $props();

const isHomepage = $derived(page.url.pathname === "/");
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<frame-full>
    <!-- <BackgroundCanvas /> -->

    <Background />

    <frame-small
        class:is-homepage={isHomepage}
    >
        <main>
            {@render children()}
        </main>

        <nav>
            {#key isHomepage}
                <nav-items>
                    <NavItem
                        href="/works"
                        label="works"
                    />
                    <NavItem
                        href="/characters"
                        label="characters"
                    />
                </nav-items>
            {/key}
        </nav>

        {#if !isHomepage}
            <logomark-container
            >
                <Logomark />
            </logomark-container>

            {#if page.url.pathname === "/works"}
                <GallerySearch />
            {/if}
        {:else}
            <HomepageBottom />
        {/if}
    </frame-small>
</frame-full>

<style lang="scss">
@use "$/styles/responsive.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

frame-full {
    display: grid;
    place-items: stretch;

    min-width: 18.75rem;
    min-height: 100vh;
}

frame-small {
    grid-area: 1/1;

    display: grid;
    grid-template-columns: 15em 1fr;
    grid-template-rows: 1fr auto;
    gap: 3em;

    width: 100vw;
    height: 100vh;
    height: 100svh;
    padding: 1rem;

    nav {
        grid-area: 1/1;
    }

    > logomark-container {
        grid-area: 2/1;
    }
    

    > main {
        grid-area: 1/2;
    }

    > :global(homepage-bottom) {
        grid-area: 2/1 / 3/3;
    }

    
    > :global(gallery-search) {
        grid-area: 2/2;
    }
}


nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}

nav-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75em;

    font-size: 1.25em;
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
