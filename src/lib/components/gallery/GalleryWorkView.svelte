<script lang="ts">
import type { WorkEntry } from "$/works/WorkEntry";
import Button from "@/generic/Button.svelte";
import GalleryButton from "./GalleryButton.svelte";
import { getContext } from "svelte";
import { WORKS_GALLERY_CONTEXT, WorksGalleryContext } from "#/routes/works/+page.svelte";

let {
    work,
}: {
    work: WorkEntry,
} = $props();

const worksGalleryContext = getContext<WorksGalleryContext>(WORKS_GALLERY_CONTEXT);
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