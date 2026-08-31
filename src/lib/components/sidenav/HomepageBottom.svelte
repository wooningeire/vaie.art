<script lang="ts">
import vaiezzellLogomark from "$/assets/vaiezzell logomark.png";
import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";
</script>

<homepage-bottom>
    <logomark-container>
        <a
            href="/"
            aria-label="vaiezzell"
        >
            <enhanced:img
                src={vaiezzellLogomark}
                alt="vaiezzell"
            />
        </a>
    </logomark-container>
    
    <homepage-bottom-right>
        <SocialLinksConcise />

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

    img {
        width: 20rem;
    }
}

homepage-bottom-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
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