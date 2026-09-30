<script lang="ts">
import { SITENAME } from "$/constants";
    import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";

</script>

<svelte:head>
    <title>{SITENAME}</title>
</svelte:head>

<homepage->
    <col-left>
        <homepage-box>
            <h3>awrawr i’m dragon!</h3>

            <p>facts about dragon:</p>

            <ul>
                <li>digital media generalist!</li>
                <ul>
                    <li>i like it when i can make the computer do or show things! this includes:</li>
                    <ul>
                        <li>software & websites</li>
                        <li>drawing & painting</li>
                        <li>2d illustration</li>
                        <li>3d modeling</li>
                        <li>graphics programming</li>
                        <li>2d/3d animation</li>
                        <li><subtle->(maybe audiovisual someday…)</subtle-></li>
                    </ul>
                </ul>
                <li>enjoys (very) big dragons! <blush->&gt;.//.&lt;</blush-></li>
                <li>ΘΔ!</li>
            </ul>
        </homepage-box>


        <homepage-box>
            <h3>quick socials</h3>

            <SocialLinksConcise />

            <a href="/links">more?</a>
        </homepage-box>
    </col-left>
</homepage->

<style lang="scss">
@use "$/styles/fonts.scss";

homepage- {
    display: flex;
    gap: 1em;
}

h3 {
    @include fonts.heading;
    font-size: 1.5rem;
}

subtle- {
    font-style: italic;
    opacity: 0.5;
}

blush- {
    color: oklch(0.8 0.2 350);
}

col-left {
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    width: 25em;
}

</style>
