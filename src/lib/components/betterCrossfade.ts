import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

/**
 * `out` transition that forces absolute positioning on an element and hiding the element, even if it has children
 * with `out` transitions (which would otherwise keep the element in the page flow). Used with the `.keep` class
 * to make children with `out` transitions visible while the parent is removed from the page flow
 * @param node
 */
export const removeFromPageFlow = (node: HTMLElement): TransitionConfig => {
    const rect = node.getBoundingClientRect();

    let ticked = false;
    return {
        duration: Number.EPSILON, // nonzero to run `tick` at least once
        tick: (t, u) => {
            if (ticked) return;
            ticked = true;

            node.style.cssText = `\
position: absolute;
visibility: hidden;
top: ${rect.top}px;
left: ${rect.left}px;
width: ${rect.width}px;
height: ${rect.height}px;`;
        },
    };
};


export type SwapoutParams = {
    key: any,
    delay?: number,
    duration?: number | ((distance: number) => number),
    easing?: (time: number) => number,
    parent?: HTMLElement | null,
};

export const swapout = ({
    duration = 250,
    easing = cubicOut,
}: {
    duration?: number,
    easing?: (t: number) => number,
} = {}) => {
    let sentRect: DOMRect | null = null;

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

    const receive = (element: HTMLElement): TransitionConfig => {
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
        let newRectIsKnown = false;
        // need to wait 2 frames to know the new rect
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const newRect = element.getBoundingClientRect();
                
                distanceX = oldRect.left - newRect.left;
                distanceY = oldRect.top - newRect.top;
                ratioWidth = oldRect.width / newRect.width;
                ratioHeight = oldRect.height / newRect.height;

                newRectIsKnown = true;
            });
        });
        sentRect = null;


        return {
            duration,
            easing,
            tick: (t, u) => {
                if (!newRectIsKnown) {
                    element.style.cssText = `visibility: hidden;`;
                    return;
                }


                element.style.cssText = `\
transform-origin: top left;
transform: translate(${distanceX * u}px, ${distanceY * u}px) scale(${ratioWidth ** u}, ${ratioHeight ** u})`
            },
        };
    };

    return {receive, pollRect};
};