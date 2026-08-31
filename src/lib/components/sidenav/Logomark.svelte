<script lang="ts" module>
export const logomarkKey = Symbol("logomark key");
</script>

<script lang="ts">
import vaiezzellLogomark from "$/assets/vaiezzell logomark.png";

let {
    large = false,
}: {
    large?: boolean,
} = $props();
</script>

<a
    href="/"
    aria-label="vaiezzell"
>
    <enhanced:img
        src={vaiezzellLogomark}
        alt="vaiezzell"
        class:large
    />
</a>

<style lang="scss">
img {
    width: 15rem;

    &.large {
        width: 20rem;
    }
}
</style>