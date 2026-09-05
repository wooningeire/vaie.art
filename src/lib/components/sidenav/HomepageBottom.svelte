<script lang="ts">
import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";
import { quartIn, quartOut } from "svelte/easing";
import { fly, type TransitionConfig } from "svelte/transition";
import Logomark from "./Logomark.svelte";

const float = (node: Element, {
    duration,
    parent = null,
}: {
    duration: number,
    parent?: HTMLElement | null,
}): TransitionConfig => {
    const rect = node.getBoundingClientRect();

    const parentRect = parent?.getBoundingClientRect() ?? null;
    const offsetLeft = parentRect?.left ?? 0;
    const offsetTop = parentRect?.top ?? 0;

    return {
        duration,
        css: (t, u) => `\
position: absolute;
left: ${rect.left - offsetLeft}px;
top: ${rect.top - offsetTop}px;
width: ${rect.width}px;
height: ${rect.height}px;`,
    };
};

const gone = (node: Element, {
    duration,
}: {
    duration: number,
}): TransitionConfig => {
    return {
        duration,
        css: (t, u) => `\
position: fixed;
width: 0;
height: 0;
overflow: hidden;`,
    };
};
</script>

<homepage-bottom>
    <logomark-container out:gone={{duration: 350}}>
        <Logomark large />
    </logomark-container>
    
    <homepage-bottom-right out:float={{duration: 350}}>
        <social-links-container
            in:fly={{duration: 250, easing: quartOut, y: 100}}
            out:fly={{duration: 250, easing: quartIn, delay: 100, y: 100}}
        >
            <SocialLinksConcise />
        </social-links-container>

        <biography-headlines
            in:fly={{duration: 250, easing: quartOut, delay: 100, y: 100}}
            out:fly={{duration: 250, easing: quartIn, y: 100}}
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
</style>