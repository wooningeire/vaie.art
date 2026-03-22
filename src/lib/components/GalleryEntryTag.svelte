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
gallery-entry-tag {
    background-color: oklch(0.2 0.02 190);
    border-radius: 0.25em;
    padding: 0.125em 0.5em;
}
</style>