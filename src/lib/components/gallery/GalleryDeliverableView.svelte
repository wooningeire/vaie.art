<script lang="ts">
import type { GalleryDeliverable } from "$/gallery-models/GalleryDeliverable";
import GalleryButton from "./GalleryButton.svelte";

let {
    deliverable,
}: {
    deliverable: GalleryDeliverable,
} = $props();
</script>

<gallery-deliverable>
    <gallery-deliverable-title>{deliverable.label}</gallery-deliverable-title>

    <GalleryButton
        href={deliverable.href}
        image={deliverable.image}
        external={deliverable.external}
    />
</gallery-deliverable>

<style lang="scss">
@use "$/styles/fonts.scss";

gallery-deliverable {
    @include fonts.heading;

    display: flex;
    flex-direction: column;

    font-size: 1rem;
}
</style>