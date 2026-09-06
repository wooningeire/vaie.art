<script lang="ts">
import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";
import { quartIn, quartOut } from "svelte/easing";
import { fly, type FlyParams, type TransitionConfig } from "svelte/transition";
import Logomark from "./Logomark.svelte";

/**
 * `out` transition that forces absolute positioning on an element and hiding the element, even if it has children
 * with `out` transitions (which would otherwise keep the element in the page flow). Used with the `.keep` class
 * to make children with `out` transitions visible while the parent is removed from the page flow
 * @param node
 */
const removeFromPageFlow = (node: HTMLElement): TransitionConfig => {
    const rect = node.getBoundingClientRect();

    let ticked = false;
    return {
        duration: Number.EPSILON, // nonzero to run `tick` at least once
        tick: (t, u) => {
            if (ticked) return;
            ticked = true;

            node.style.cssText = `\
position: absolute;
visibility: hidden;
top: ${rect.top}px;
left: ${rect.left}px;
width: ${rect.width}px;
height: ${rect.height}px;`;
        },
    };
};
</script>

<homepage-bottom out:removeFromPageFlow>
    <logomark-container>
        <Logomark large />
    </logomark-container>
    
    <homepage-bottom-right>
        <social-links-container
            in:fly={{duration: 250, easing: quartOut, y: 100}}
            out:fly={{duration: 250, easing: quartIn, delay: 100, y: 100}}
            class="keep"
        >
            <SocialLinksConcise />
        </social-links-container>

        <biography-headlines
            in:fly={{duration: 250, easing: quartOut, delay: 100, y: 100}}
            out:fly={{duration: 250, easing: quartIn, y: 100}}
            class="keep"
        >
            <biography-headline>software dragon ΘΔ!</biography-headline>
            <biography-headline>digital media generalist!</biography-headline>
            <biography-headline>computer graphics studier!</biography-headline>
            <biography-headline>macro dragon enjoyer!</biography-headline>
        </biography-headlines>
    </homepage-bottom-right>
</homepage-bottom>

<style lang="scss">
@use "$/styles/colors.scss";

homepage-bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;

    font-size: 1.25rem;
}

logomark-container {
    display: grid;
    place-items: center;
    flex-grow: 1;
}

homepage-bottom-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
}

social-links-container {
    display: block;
}

biography-headlines {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5em;

    color: colors.$emph;
    text-align: center;
}

.keep {
    visibility: visible;
}
</style>