<script lang="ts">
import { galleryState } from "./GalleryState.svelte";


</script>

<gallery-controls>
    <label>
        <input
            type="checkbox"
            bind:checked={galleryState.groupDeliverablesByProject}
        />

        Group by project
    </label>
</gallery-controls>
