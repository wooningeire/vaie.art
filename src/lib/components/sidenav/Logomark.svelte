<script lang="ts" module>
import { crossfade } from "svelte/transition";
import { cubicOut, quartInOut } from "svelte/easing";


export const logomarkKey = Symbol("logomark key");

export const [logomarkSend, logomarkReceive] = crossfade({
	duration: (d) => Math.sqrt(d * 250),

	fallback(node, params) {
		const style = getComputedStyle(node);
		const opacity = +style.opacity;

		return {
			duration: 250,
			easing: quartInOut,
			css: (t) => `opacity: ${t * opacity}; scale: ${t}`,
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
    in:logomarkReceive|global={{key: logomarkKey}}
    out:logomarkSend|global={{key: logomarkKey}}
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