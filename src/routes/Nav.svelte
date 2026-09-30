<script>
import NavItem from "@/sidenav/NavItem.svelte";
import SocialLinksConcise from "@/sidenav/SocialLinksConcise.svelte";

</script>

<nav>
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
</nav>

<style lang="scss">
</style>