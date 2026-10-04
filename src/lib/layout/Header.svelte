<header>
    <a href="/" class="emph">
        vaie.art
    </a>

    <subtle->i.e.</subtle->
    
    <with-undernote><span class="emph">vaiezzell</span><undernote->/ˈveɪ zəl/</undernote-></with-undernote><span class="emph">’s den!</span>
</header>

<style lang="scss">
@use "$/styles/fonts.scss";

header {
    align-items: stretch;
}

.emph {
    font-family: fonts.$font-title;
    font-size: 2rem;
    font-weight: 600;
}

subtle- {
    font-size: 1.5em;
}

with-undernote {
    position: relative;
}

undernote- {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);

    opacity: 0.5;
}
</style>