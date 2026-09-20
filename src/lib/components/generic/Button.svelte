<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

let {
    children,
    keyHeld = false,
    displayClass,
    buttonStyle = "text",
    red = false,
    noBg = false,
    ...buttonProps
}: {
    children: Snippet,
    keyHeld?: boolean,
    buttonStyle?: "text" | "image" | "icon",
    displayClass?: string,
    red?: boolean,
    noBg?: boolean,
} & HTMLButtonAttributes = $props();
</script>

<button
    class:no-bg={noBg}
    {...buttonProps}
>
    <button-display
        class:key-held={keyHeld}
        class:text-button={buttonStyle === "text"}
        class:icon-button={buttonStyle === "icon"}
        class:red
        class={displayClass}
        class:no-bg={noBg}
    >
        {@render children?.()}
    </button-display>
</button>

<style lang="scss">
@use "$/styles/colors.scss";
@use "$/styles/fonts.scss";

$bg-col: oklch(from colors.$fg l c h / 0.125);
$bg-stripe-col: oklch(from colors.$fg l c h / 0.125);
$inset-box-shadow: 0 1em 2em oklch(from colors.$fg l c h / 0.0625) inset;
$outset-box-shadow: 0 0.25rem 1rem 0.5rem oklch(0 0 0 / 0.125);


button {
    margin: 0;
    padding: 0;
    display: grid;
    place-items: stretch;

    border: none;
    background: none;


    font-family: fonts.$font-title;


    --bg-col: linear-gradient(#{$bg-col}, #{$bg-col});

    
    &:not(.no-bg) {
        cursor: pointer;
    }
    
    &[disabled] {
        pointer-events: none;
        opacity: 0.3;
    }

    button-display {
        display: block;
        border-radius: 1rem;

        pointer-events: none;
        overflow: hidden;

        transition:
            transform 0.25s cubic-bezier(0,2.75,.47,1),
            box-shadow 0.1s cubic-bezier(0,1,.47,1),
            filter 0.25s ease;

        &.red {
            --bg-col: oklch(0.99 0.15 350 / 0.75);
        }

        &.text-button {
            padding: 0.25rem 1rem;
        }

        &.icon-button {
            padding: 0.5rem;
        }

        &:not(.no-bg) {
            background: var(--bg-col);
            box-shadow:
                $outset-box-shadow,
                $inset-box-shadow;

            backdrop-filter: blur(4px);
        }
    }

    &:is(:hover, :focus-visible) > button-display:not(.no-bg),
    button-display.key-held:not(.no-bg) {
        transform: translateY(-0.125rem) scale(1.05);

        animation: sliding-background 1s infinite linear;
        background-color: var(--bg-col);
        background-image: repeating-linear-gradient(
            135deg,
            oklch(0 0 0 / 0) 0,
            oklch(0 0 0 / 0) 1rem,
            $bg-stripe-col 1rem,
            $bg-stripe-col 2rem,
        );
        background-size: calc(100% + 3rem) calc(100% + 3rem);

        @keyframes sliding-background {
            from {
                background-position: -2.828427rem -2.828427rem; // 2 * sqrt(2)
            }
            to {
                background-position: 0 0;
            }
        }
    }
}

:global(a:active) button-display:not(.no-bg),
button:active > button-display:not(.no-bg),
button-display.key-held:not(.no-bg) {
    transform: translateY(0.0625rem) scale(0.95);
}
</style>