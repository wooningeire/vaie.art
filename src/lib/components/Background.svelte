<script lang="ts">
import BackgroundSrc from "$/assets/home-bg-sapphi.png";
</script>

<img
    src={BackgroundSrc}
    alt="background image by Sapphi"
/>

<style lang="scss">
img {
    position: fixed;
    align-self: stretch;
    width: 100%;
    height: 100%;
    z-index: -1;

    opacity: 0.25;

    object-fit: cover;
    object-position: 75% 50%;
}
</style>