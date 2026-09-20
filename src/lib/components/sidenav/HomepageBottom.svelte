<script lang="ts">
import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";
import Logomark from "./Logomark.svelte";
import { removeFromPageFlow } from "@/betterCrossfade.svelte";

</script>

<homepage-bottom out:removeFromPageFlow>
    <logomark-container>
        <Logomark large />
    </logomark-container>
    
    <homepage-bottom-right>
        <social-links-container>
            <SocialLinksConcise />
        </social-links-container>

        <background-credit>
            Background art by <a href="https://www.furaffinity.net/view/61807537" target="_blank">Sapphi</a>
        </background-credit>

        <biography-headlines>
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
    flex-grow: 1;

    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    place-items: center;
    gap: 1rem;

    > social-links-container {
        grid-area: 1/1;
    }

    > background-credit {
        grid-area: 1/2;
    }

    > biography-headlines {
        grid-area: 2/1 / 3/3;
    }
}

social-links-container {
    display: flex;
    align-items: center;
}

background-credit {
    color: colors.$emph;
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