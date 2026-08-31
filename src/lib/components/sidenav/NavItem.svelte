<script lang="ts">
let {
    href,
    label,
}: {
    href: string,
    label: string,
} = $props();
</script>

<nav-item>
    <a
        {href}
    >
        {label}
    </a>
</nav-item>