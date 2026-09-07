<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

let {
    children,
    keyHeld = false,
    displayClass,
    buttonStyle = "text",
    red = false,
    emph = false,
    ...buttonProps
}: {
    children: Snippet,
    keyHeld?: boolean,
    buttonStyle?: "text" | "image" | "icon",
    displayClass?: string,
    red?: boolean,
    emph?: boolean,
} & HTMLButtonAttributes = $props();
</script>

<button {...buttonProps}>
    <button-display
        class:key-held={keyHeld}
        class:text-button={buttonStyle === "text"}
        class:icon-button={buttonStyle === "icon"}
        class:red
        class:emph
        class={displayClass}
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

    cursor: pointer;

    font-family: fonts.$font-title;


    --bg-col: linear-gradient(#{$bg-col}, #{$bg-col});

    
    &[disabled] {
        pointer-events: none;
        opacity: 0.3;
    }

    button-display {
        display: block;

        border-radius: 1rem;
        background: var(--bg-col);
        box-shadow:
            $outset-box-shadow,
            $inset-box-shadow;

        pointer-events: none;
        overflow: hidden;

        backdrop-filter: blur(4px);

        transition:
            transform 0.25s cubic-bezier(0,2.75,.47,1),
            box-shadow 0.1s cubic-bezier(0,1,.47,1),
            filter 0.25s ease;

        &.red {
            --bg-col: oklch(0.99 0.15 350 / 0.75);
        }

        &.emph {
            --bg-col: linear-gradient(
                to right,
                oklch(0.85 0.15 320),
                oklch(1 0 0),
                oklch(0.85 0.15 160)
            );

            color: oklch(0 0 0);
        }

        &.text-button {
            padding: 0.25rem 1rem;
        }

        &.icon-button {
            padding: 0.5rem;
        }
    }

    &:is(:hover, :focus-visible) > button-display,
    button-display.key-held {
        transform: translateY(-0.125rem) scale(1.05);

        animation: sliding-background 1s infinite linear;
        background-image: 
            repeating-linear-gradient(
                135deg,
                oklch(0 0 0 / 0) 0,
                oklch(0 0 0 / 0) 1rem,
                $bg-stripe-col 1rem,
                $bg-stripe-col 2rem,
            ),
            var(--bg-col);
        background-size:
            calc(100% + 3rem) calc(100% + 3rem),
            100% 100%;

        @keyframes sliding-background {
            from {
                background-position:
                    -2.828427rem -2.828427rem, // 2 * sqrt(2)
                    0 0;
            }
            to {
                background-position: 0 0, 0 0;
            }
        }
    }

    &:active > button-display,
    button-display.key-held {
        transform: translateY(0.0625rem) scale(0.95);
    }
}
</style>