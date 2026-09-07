<script lang="ts" module>
import { swapout } from "@/betterCrossfade.svelte";

const {receive, rectWatcher} = swapout();
</script>

<script lang="ts">
import vaiezzellLogomark from "$/assets/vaiezzell logomark.png";
    import Button from "@/generic/Button.svelte";
    import { page } from "$app/state";

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
    <Button
        buttonStyle="image"
    >
        <enhanced:img
            src={vaiezzellLogomark}
            alt="vaiezzell"
        />
    </Button>
</a>

<style lang="scss">
a {
    display: inline-block;

    img {
        width: 15rem;
    }

    &.large img {
        width: 20rem;
    }
}
</style>