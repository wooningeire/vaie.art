<script lang="ts">
import type { PageData } from "./$types";
import { workEntries } from "$/gallery-models/galleryProjectList";
import { SITENAME } from "$/constants";
import WorkEntryDetail from "$/works/WorkEntryDetail.svelte";

let {
    data,
}: {
    data: PageData,
} = $props();

const entry = $derived(workEntries[data.entryId]);

const canonicalUrl = $derived(`https://vaie.art/works/${entry.id}`);
</script>

<svelte:head>
    <title>{entry.label} • {SITENAME}</title>
    <link rel="canonical" href={canonicalUrl} />

    <meta name="description" content={entry.descShort} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={entry.label} />
    <meta name="twitter:description" content={entry.descShort} />
    {#if entry.image !== null}
        <meta name="twitter:image" content={entry.image.full.src} />
        <meta name="twitter:image:alt" content={entry.label} />
    {/if}

    <meta property="og:title" content={entry.label} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITENAME} />
    <meta property="og:description" content={entry.descShort} />
    <meta property="og:url" content={canonicalUrl} />
    {#if entry.image !== null}
        <meta property="og:image" content={entry.image.full.src} />
        <meta property="og:image:alt" content={entry.label} />
        <meta property="og:image:width" content={entry.image.full.width.toString()} />
        <meta property="og:image:height" content={entry.image.full.height.toString()} />
    {/if}
</svelte:head>

<WorkEntryDetail {entry} />