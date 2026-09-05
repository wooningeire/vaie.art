<script lang="ts" module>
import { crossfade, type CrossfadeParams, type TransitionConfig } from "svelte/transition";
import { cubicInOut, cubicOut, quartInOut } from "svelte/easing";

export type SwapoutParams = {
    key: any,
    delay?: number,
    duration?: number | ((distance: number) => number),
    easing?: (time: number) => number,
    parent?: HTMLElement | null,
};

type Rect = {
    left: number,
    top: number,
    width: number,
    height: number,
};

const {receive, pollRect} = (() => {
    let sentRect: Rect | null = null;

    // const send = (element: Element) => {
    //     sentRect = asRect(element.getBoundingClientRect());
    //     return {
    //         duration: 0,
    //     }
    // };

    const pollRect = (element: Element) => {
        let handle = 0;

        const updateRect = () => {
            sentRect = element.getBoundingClientRect();

            handle = requestAnimationFrame(updateRect);
        };
        handle = requestAnimationFrame(updateRect);

        return () => {
            cancelAnimationFrame(handle);
        };
    };

    const receive = (element: Element): TransitionConfig => {
        if (sentRect === null) {
            return {
                duration: 0,
            };
        }


        

        let distanceX = 0;
        let distanceY = 0;
        let ratioWidth = 1;
        let ratioHeight = 1;

        const oldRect = sentRect; 
        tick().then(() => {
            const newRect = element.getBoundingClientRect();
            
            distanceX = oldRect.left - newRect.left;
            distanceY = oldRect.top - newRect.top;
            ratioWidth = oldRect.width / newRect.width;
            ratioHeight = oldRect.height / newRect.height;
        });

        sentRect = null;



        return {
            duration: 250,
            easing: cubicOut,
            css: (t, u) => `\
transform-origin: top left;
transform: translate(${distanceX * u}px, ${distanceY * u}px) scale(${ratioWidth ** u}, ${ratioHeight ** u})`,
        };
    };

    return {receive, pollRect};
})();
</script>

<script lang="ts">
import vaiezzellLogomark from "$/assets/vaiezzell logomark.png";
    import { tick } from "svelte";

let {
    large = false,
}: {
    large?: boolean,
} = $props();
</script>

<a
    href="/"
    aria-label="vaiezzell"
    {@attach pollRect}
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