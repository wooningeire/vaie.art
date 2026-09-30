<script>
import NavItem from "@/sidenav/NavItem.svelte";
import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";

</script>


<nav>
    <nav-content>
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

    </nav-content>
</nav>

<style lang="scss">
@use "$/styles/responsive.scss";
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

nav {
    display: flex;
    overflow: auto;

    background-color: oklch(0.2 0.05 200 / 0.75);

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
</style>