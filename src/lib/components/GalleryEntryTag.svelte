<script lang="ts">
let {
    label
}: {
    label: string,
} = $props();
</script>

<gallery-entry-tag>
    {label}
</gallery-entry-tag>

<style lang="scss">
@use "./gallery.scss";

gallery-entry-tag {
    @include gallery.gallery-entry-overlay;

    display: block;

    border-radius: 0.25em;
    padding: 0.125em 0.5em;
}
</style>