<script>
import { galleryState } from "./GalleryState.svelte";

</script>

<gallery-search>
    <input
        bind:value={galleryState.queryString}
    />
</gallery-search>

<style lang="scss">
@use "$/styles/mixins.scss";

gallery-search {
    display: block;
    
    margin-bottom: 2em;
}

input {
    @include mixins.glass-input
}
</style>