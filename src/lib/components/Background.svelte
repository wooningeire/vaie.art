<background->
    <img
        src="/media/misc/home-bg-sapphi.webp"
        alt="Artwork by Sapphi"
    />

    <background-credit>art by <a href="https://www.furaffinity.net/view/61807537" target="_blank">Sapphi</a></background-credit>
</background->

<style lang="scss">
background- {
    position: fixed;
    align-self: stretch;

    width: 100%;
    height: 100%;

    z-index: -1;
    
    display: grid;
    pointer-events: none;

    > * {
        grid-area: 1/1;
    }
}

img {
    width: 100%;
    height: 100%;


    opacity: 0.125;

    object-fit: cover;
    object-position: 75% 50%;
}

background-credit {
    align-self: flex-end;
    justify-self: flex-end;
    margin: 0 1em 1em 0;

    pointer-events: auto;
}
</style>
