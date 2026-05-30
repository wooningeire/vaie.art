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
Host original images in `/media`.

```bash
deno task convert-media  # to generate display WebPs and thumbnail variants
```

Metadata is hardcoded in the SvelteKit project.

## Gallery info cards

Each gallery entry has an `id` in `src/lib/gallery-entries.ts`. To add an info card, create `src/lib/gallery-info/{id}.svx` or `src/lib/gallery-info/{id}.svelte`.

Use `info: "<id>"` to share another card, `info: false` to opt out of the automatic filename match, or pass a component directly for custom content.
