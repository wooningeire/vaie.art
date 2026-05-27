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