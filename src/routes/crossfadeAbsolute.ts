import { cubicOut } from "svelte/easing";

/**
 * The `crossfade` function creates a pair of [transitions](https://svelte.dev/docs/svelte/transition) called `send` and `receive`. When an element is 'sent', it looks for a corresponding element being 'received', and generates a transition that transforms the element to its counterpart's position and fades it out. When an element is 'received', the reverse happens. If there is no counterpart, the `fallback` transition is used.
 *
 * @param {CrossfadeParams & {
 * 	fallback?: (node: Element, params: CrossfadeParams, intro: boolean) => TransitionConfig;
 * }} params
 * @returns {[(node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig, (node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig]}
 */
export function crossfade({ fallback, ...defaults }) {
    /** @type {Map<any, Element>} */
    const to_receive = new Map();
    /** @type {Map<any, Element>} */
    const to_send = new Map();

    /**
     * @param {Element} from_node
     * @param {Element} node
     * @param {CrossfadeParams} params
     * @returns {TransitionConfig}
     */
    function crossfade(from_node, node, params) {
        const {
            delay = 0,
            duration = /** @param {number} d */ (d) => Math.sqrt(d) * 30,
            easing = cubicOut,
        } = params;
        const from = from_node.getBoundingClientRect();
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const opacity = +style.opacity;
        return {
            delay,
            duration: typeof duration === 'function' ? duration(d) : duration,
            easing,
            css: (t, u) => `
               opacity: ${t * opacity};
               transform-origin: top left;
               transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${
                        t + (1 - t) * dh
                    });
           `
        };
    }

    /**
     * @param {Map<any, Element>} items
     * @param {Map<any, Element>} counterparts
     * @param {boolean} intro
     * @returns {(node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig}
     */
    function transition(items, counterparts, intro) {
        // @ts-expect-error TODO improve typings (are the public types wrong?)
        return (node, params) => {
            items.set(params.key, node);
            return () => {
                if (counterparts.has(params.key)) {
                    const other_node = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    return crossfade(/** @type {Element} */ (other_node), node, params);
                }
                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }
    return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}
