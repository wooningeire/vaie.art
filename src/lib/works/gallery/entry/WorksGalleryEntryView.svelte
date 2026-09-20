<script lang="ts">
import type { WorkEntry } from "$/works/WorkEntry";
import WorksGalleryEntryButton from "./WorksGalleryEntryButton.svelte";
import { getContext } from "svelte";
import { WORKS_PAGE_CONTEXT_KEY, WorksPageContext } from "$/works/WorksPageContext.svelte";
import { onWorkClick } from "./onWorkClick";

let {
    work,
}: {
    work: WorkEntry,
} = $props();

const worksGalleryContext = getContext<WorksPageContext>(WORKS_PAGE_CONTEXT_KEY);
</script>

<WorksGalleryEntryButton
    {work}
    onClick={onWorkClick(worksGalleryContext, work)}
/>