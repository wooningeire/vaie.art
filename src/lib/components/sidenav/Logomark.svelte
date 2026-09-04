<script lang="ts" module>
import { crossfade } from "svelte/transition";
import { cubicOut, quartInOut } from "svelte/easing";


export const logomarkKey = Symbol("logomark key");

export const [logomarkSend, logomarkReceive] = crossfade({
	duration: (d) => Math.sqrt(d * 500),

	fallback(node, params) {
		return {
            duration: 0,
        };
	}
});
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
    in:logomarkReceive={{key: logomarkKey}}
    out:logomarkSend={{key: logomarkKey}}
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