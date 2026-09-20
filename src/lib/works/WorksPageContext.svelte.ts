import type { WorkEntry } from "$/works/WorkEntry";

export const WORKS_PAGE_CONTEXT_KEY = Symbol("works page context");

export class WorksPageContext {
    selectedEntry: WorkEntry | null = $state()!;

    constructor({
        selectedEntry = null,
    }: {
        selectedEntry?: WorkEntry | null,
    }={}) {
        this.selectedEntry = selectedEntry;
    }
}