<script>
import NavItem from "@/sidenav/NavItem.svelte";
import Sep from "./Sep.svelte";

</script>

<nav>
    <NavItem
        href="/"
        label="home"
    />

    <Sep />
    
    <NavItem
        href="/gallery"
        label="gallery"
    />

    <Sep />

    <NavItem
        href="/characters"
        label="characters"
    />

    <Sep />

    <NavItem
        href="/links"
        label="links"
    />
</nav>

<style lang="scss">

nav {
    display: flex;
}
</style>