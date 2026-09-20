<script lang="ts">
import "./index.scss";

import favicon from "$lib/assets/vaiezzell favicon.png";
import HomepageBottom from "@/sidenav/HomepageBottom.svelte";
import NavItem from "@/sidenav/NavItem.svelte";
import { page } from "$app/state";
import Logomark from "@/sidenav/Logomark.svelte";
import Background from "@/Background.svelte";
import GallerySearch from "$/works/gallery/search/WorksGallerySearch.svelte";
    import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";


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
            <nav-content>
                <background-credit>
                    Background art by <a href="https://www.furaffinity.net/view/61807537" target="_blank">Sapphi</a>
                </background-credit>
                
                <SocialLinksConcise />

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

                <Logomark noButton={isHomepage} />
            </nav-content>
        </nav>
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

    display: flex;

    overflow: hidden;

    @media (max-width: responsive.$resize-threshold) {
        flex-direction: column;
    }

    width: 100vw;
    height: 100vh;
    height: 100svh;
}

main {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
}


nav {
    display: flex;
    overflow: auto;

    background-color: oklch(0.2 0.05 200 / 0.75);
    box-shadow: 0.25em 0 2em oklch(0 0 0 / 0.5);

    nav-content {
        flex: 1 0 auto;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 3em;

        padding: 1em;

        @media (max-width: responsive.$resize-threshold) {
            flex-direction: row-reverse;
            gap: 2em;
        }
    }
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
</style>
