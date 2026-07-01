# https://vaie.art/ landing page!

Standard SvelteKit project shenanigans:

```bash
deno task dev  # for local development
```

```bash
deno task build  # to generate a Deno/Node.js bundle
```

But before you do that:

## Media hosting
Host original images in `/media`. The following command produces WebPs at preview and thumbnail resolutions (requires Rust):
```bash
deno task convert-media  # to generate full, preview, and thumbnail variants
```

Metadata is hardcoded in the SvelteKit project.

## Gallery metadata

Gallery entries in `src/lib/gallery-entries.ts` use structured `tags`, `characters`, and `relationships`.

Use `relationships` for metadata that links entries together rather than describing a single entry:

```ts
relationships: [
    { kind: "series", id: "character-reference-sheets", label: "Character Refs", order: 2 },
    { kind: "progress", of: "finished-piece-id", stage: "sketch", order: 1 },
    { kind: "version", of: "current-piece-id", status: "older", version: "2024" },
]
```

Series show up as a `Series` filter. Progress shots and older/alternate/current versions show up under `Process`, with search-only relationship IDs available for future detail views.

## Gallery info cards

Each gallery entry has an `id` in `src/lib/gallery-entries.ts`. To add an info card, create `src/lib/gallery-info/{id}.svx` or `src/lib/gallery-info/{id}.svelte`.

Use `info: "<id>"` to share another card, `info: false` to opt out of the automatic filename match, or pass a component directly for custom content.
