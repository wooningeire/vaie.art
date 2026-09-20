<script lang="ts">
import type { WorkEntry } from "$/works/WorkEntry";
import Button from "@/generic/Button.svelte";
import GalleryButton from "./WorksGalleryEntryButton.svelte";
import { getContext } from "svelte";
import { WORKS_PAGE_CONTEXT_KEY, WorksPageContext } from "$/works/WorksPageContext.svelte";

let {
    work,
}: {
    work: WorkEntry,
} = $props();

const worksGalleryContext = getContext<WorksPageContext>(WORKS_PAGE_CONTEXT_KEY);
</script>

{#if work.image !== null}
    <GalleryButton
        href={work.href}
        imageVariants={work.image}
        label={work.label}
        external={work.external}
        onClick={event => {
            if (event.button !== 0) return;
            
            event.preventDefault();
            worksGalleryContext.selectedEntry = work;
        }}
    />
{:else}
    <Button>{work.label}</Button>
{/if}