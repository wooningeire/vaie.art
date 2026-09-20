import type { WorkEntry } from "$/works/WorkEntry";
import type { WorksPageContext } from "$/works/WorksPageContext.svelte";

export const onWorkClick = (context: WorksPageContext, work: WorkEntry) => {
    return (event: MouseEvent) => {
        if (event.button !== 0 || work.external) return;
        
        event.preventDefault();
        context.selectedEntry = work;
    };
};