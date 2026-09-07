<script lang="ts">
import Button from "@/generic/Button.svelte";

let {
    label,
    thumbSrc,
}: {
    label: string,
    thumbSrc: string,
} = $props();
</script>

<Button>
    <character-entry>
        <character-entry-thumb>
            <enhanced:img
                src={thumbSrc}
                alt={label}
            />
        </character-entry-thumb>

        <character-entry-label>{label}</character-entry-label>
    </character-entry>
</Button>

<style lang="scss">
@use "$/styles/fonts.scss";

character-entry {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 15rem;
}

character-entry-thumb {
    display: block;
    width: 100%;
}

img {
    width: 100%;
}

character-entry-label {
    font-family: fonts.$font-title;
    font-size: 2em;
}
</style>