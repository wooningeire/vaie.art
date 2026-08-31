<script lang="ts">
import SocialLinks from "./SocialLinksConcise.svelte";

</script>

<biography-section>
    <biography-title>
        <h1>
            <a href="/">vaiezzell</a>
        </h1>

        <SocialLinks />
    </biography-title>

</biography-section>

<style lang="scss">
@use "$/styles/colors.scss";
@use "$/styles/responsive.scss";

biography-section {
    align-self: flex-end;
    justify-self: flex-end;

    display: flex;
    flex-direction: column;
    gap: 1em;

    padding-bottom: 1em;


    @media (min-width: responsive.$resize-threshold) {
        padding-top: 1em;
        border-top: 1px solid oklch(0.9 0.02 200 / 0.25);
    
        font-size: 1.5rem;
    }
}
</style>