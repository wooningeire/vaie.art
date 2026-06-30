<script lang="ts">
import type { GalleryDeliverable } from "$/gallery-models/GalleryDeliverable";
import GalleryButton from "./GalleryButton.svelte";

let {
    deliverable,
}: {
    deliverable: GalleryDeliverable,
} = $props();
</script>

<GalleryButton
    href={deliverable.href}
    imageSrc={deliverable.imageSrc}
    shrinkwrapImage
/>