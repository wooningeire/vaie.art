<script lang="ts">
import { SITENAME } from "$/constants";

</script>

<svelte:head>
    <title>{SITENAME}</title>
</svelte:head>

<home-page>
    <h3>awrawr i’m dragon!</h3>

    <p>facts about dragon:</p>

    <ul>
        <li>digital media generalist!</li>
        <ul>
            <li>i like it when i can make the computer do or show things! this includes:</li>
            <ul>
                <li>software and website development</li>
                <li>drawing & painting</li>
                <li>2d illustration</li>
                <li>3d modeling</li>
                <li>computer graphics</li>
                <li><subtle->(maybe animation and audiovisual someday…)</subtle-></li>
            </ul>
        </ul>
        <li>enjoys (very) big dragons! <blush->&gt;.//.&lt;</blush-></li>
        <li>ΘΔ!</li>
    </ul>
</home-page>

<style lang="scss">
@use "$/styles/fonts.scss";

home-page {
    display: grid;
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
</style>
