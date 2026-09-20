<script lang="ts">
import vaiezzellLogomark from "$/assets/vaiezzell logomark.png";
import Button from "@/generic/Button.svelte";

let {
    large = false,
    noButton = false,
}: {
    large?: boolean,
    noButton?: boolean,
} = $props();
</script>

<a
    href={noButton ? null : "/"}
    aria-label="vaiezzell"
    class:large
>
    <Button
        buttonStyle="image"
        noBg={noButton}
    >
        <enhanced:img
            src={vaiezzellLogomark}
            alt="vaiezzell"
            class:large
        />
    </Button>
</a>

<style lang="scss">
a {
    display: inline-block;
}

img {
    display: inline-block;
    width: 15rem;

    &.large {
        width: 20rem;
    }
}
</style>