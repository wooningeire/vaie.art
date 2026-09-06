<script lang="ts" module>
import { swapout } from "@/betterCrossfade.svelte";

const {receive, rectWatcher} = swapout();
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
    {@attach rectWatcher.watch}
    in:receive
    class:large
>
    <enhanced:img
        src={vaiezzellLogomark}
        alt="vaiezzell"
    />
</a>

<style lang="scss">
a {
    display: inline-block;

    > img {
        width: 15rem;
    }

    &.large > img {
        width: 20rem;
    }
}
</style>