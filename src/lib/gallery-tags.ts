export type GalleryTag = {
    kind: string,
    path: readonly string[],
    label?: string,
    searchOnly?: boolean,
};

export type GalleryEntryRelationship =
    | {
        kind: "series",
        id: string,
        label?: string,
        order?: number,
        searchOnly?: boolean,
    }
    | {
        kind: "progress",
        of: string,
        stage?: string,
        order?: number,
        label?: string,
        searchOnly?: boolean,
    }
    | {
        kind: "version",
        of: string,
        status?: "older" | "current" | "alternate",
        version?: string,
        label?: string,
        searchOnly?: boolean,
    };

export type CharacterDefinition = {
    id: string,
    name: string,
    aliases?: readonly string[],
    owner?: string,
    url?: string,
    tags?: readonly GalleryTag[],
};

export type CharacterRegistry = Record<string, CharacterDefinition>;

export type NormalizedTagSource = "tag" | "character" | "relationship";

export type NormalizedTag = {
    id: string,
    facet: string,
    label: string,
    path: readonly string[],
    source: NormalizedTagSource,
    searchOnly?: boolean,
};

export type GalleryQuery = {
    include: string[],
    exclude: string[],
};

export type GalleryTaggableEntry = {
    tags?: readonly GalleryTag[],
    characters?: readonly string[],
    relationships?: readonly GalleryEntryRelationship[],
    displayTags?: readonly GalleryTag[],
};

export type GalleryIndexedEntry<TEntry extends GalleryTaggableEntry> = {
    entry: TEntry,
    tags: readonly NormalizedTag[],
    displayTags: readonly NormalizedTag[],
    tagIds: ReadonlySet<string>,
};

export type GalleryFacetValue = NormalizedTag & {
    count: number,
};

export type GalleryFacetGroup = {
    facet: string,
    tags: readonly GalleryFacetValue[],
};

export const galleryQueryParameters = {
    include: "tag",
    exclude: "not",
} as const;

const facetLabels: Record<string, string> = {
    character: "Character",
    medium: "Medium",
    process: "Process",
    purpose: "Purpose",
    series: "Series",
    style: "Style",
    subject: "Subject",
    tool: "Tool",
};

const facetOrder = [
    "Series",
    "Process",
    "Purpose",
    "Medium",
    "Character",
    "Tool",
    "Style",
    "Subject",
];

const specialLabels: Record<string, string> = {
    "2d": "2D",
    "3d": "3D",
    api: "API",
    oc: "OC",
    rpg: "RPG",
    spa: "SPA",
    ui: "UI",
    ux: "UX",
    webgl: "WebGL",
};

export function createEmptyGalleryQuery(): GalleryQuery {
    return {
        include: [],
        exclude: [],
    };
}

export function createGalleryIndex<TEntry extends GalleryTaggableEntry>(
    entries: readonly TEntry[],
    characters: CharacterRegistry,
): GalleryIndexedEntry<TEntry>[] {
    return entries.map((entry) => {
        const tags = normalizeEntryTags(entry, characters);

        return {
            entry,
            tags,
            displayTags: normalizeEntryDisplayTags(entry, tags),
            tagIds: new Set(tags.map((tag) => tag.id)),
        };
    });
}

export function filterGalleryEntries<TEntry extends GalleryTaggableEntry>(
    entries: readonly GalleryIndexedEntry<TEntry>[],
    query: GalleryQuery,
): GalleryIndexedEntry<TEntry>[] {
    const normalizedQuery = normalizeGalleryQuery(query);

    if (normalizedQuery.include.length === 0 && normalizedQuery.exclude.length === 0) {
        return [...entries];
    }

    return entries.filter((entry) => {
        for (const includedTag of normalizedQuery.include) {
            if (!entry.tagIds.has(includedTag)) {
                return false;
            }
        }

        for (const excludedTag of normalizedQuery.exclude) {
            if (entry.tagIds.has(excludedTag)) {
                return false;
            }
        }

        return true;
    });
}

export function createGalleryFacetGroups<TEntry extends GalleryTaggableEntry>(
    entries: readonly GalleryIndexedEntry<TEntry>[],
): GalleryFacetGroup[] {
    const valuesByFacet = new Map<string, Map<string, GalleryFacetValue>>();

    for (const entry of entries) {
        for (const tag of entry.tags) {
            if (tag.searchOnly) {
                continue;
            }

            const values = getOrInsert(valuesByFacet, tag.facet, () => new Map());
            const existingValue = values.get(tag.id);

            if (existingValue) {
                existingValue.count += 1;
                continue;
            }

            values.set(tag.id, {
                ...tag,
                count: 1,
            });
        }
    }

    return Array.from(valuesByFacet, ([facet, values]) => ({
        facet,
        tags: Array.from(values.values()).sort(compareFacetValues),
    })).sort(compareFacetGroups);
}

export function toggleGalleryQueryInclude(query: GalleryQuery, tagId: string): GalleryQuery {
    const normalizedQuery = normalizeGalleryQuery(query);

    if (normalizedQuery.include.includes(tagId)) {
        return {
            include: normalizedQuery.include.filter((id) => id !== tagId),
            exclude: normalizedQuery.exclude,
        };
    }

    return {
        include: [...normalizedQuery.include, tagId],
        exclude: normalizedQuery.exclude.filter((id) => id !== tagId),
    };
}

export function clearGalleryQuery(): GalleryQuery {
    return createEmptyGalleryQuery();
}

export function normalizeGalleryQuery(query: GalleryQuery): GalleryQuery {
    const include = uniqueQueryIds(query.include);
    const includeIds = new Set(include);
    const exclude = uniqueQueryIds(query.exclude)
        .filter((tagId) => !includeIds.has(tagId));

    return {
        include,
        exclude,
    };
}

export function parseGalleryQuerySearchParams(searchParams: URLSearchParams): GalleryQuery {
    return normalizeGalleryQuery({
        include: searchParams.getAll(galleryQueryParameters.include),
        exclude: searchParams.getAll(galleryQueryParameters.exclude),
    });
}

export function applyGalleryQueryToSearchParams(
    searchParams: URLSearchParams,
    query: GalleryQuery,
): void {
    const normalizedQuery = normalizeGalleryQuery(query);

    searchParams.delete(galleryQueryParameters.include);
    searchParams.delete(galleryQueryParameters.exclude);

    for (const includedTag of normalizedQuery.include) {
        searchParams.append(galleryQueryParameters.include, includedTag);
    }

    for (const excludedTag of normalizedQuery.exclude) {
        searchParams.append(galleryQueryParameters.exclude, excludedTag);
    }
}

function normalizeEntryTags(
    entry: GalleryTaggableEntry,
    characters: CharacterRegistry,
): NormalizedTag[] {
    const tags: NormalizedTag[] = [];

    for (const tag of entry.tags ?? []) {
        const normalizedTag = normalizeGalleryTag(tag);

        if (normalizedTag) {
            tags.push(normalizedTag);
        }
    }

    for (const characterId of entry.characters ?? []) {
        tags.push(normalizeCharacterTag(characterId, characters));

        for (const characterTag of characters[characterId]?.tags ?? []) {
            const normalizedTag = normalizeGalleryTag(characterTag);

            if (normalizedTag) {
                tags.push(normalizedTag);
            }
        }
    }

    for (const relationship of entry.relationships ?? []) {
        tags.push(...normalizeRelationshipTags(relationship));
    }

    return dedupeNormalizedTags(tags);
}

function normalizeEntryDisplayTags(
    entry: GalleryTaggableEntry,
    normalizedEntryTags: readonly NormalizedTag[],
): NormalizedTag[] {
    if (!entry.displayTags) {
        return normalizedEntryTags.filter((tag) => !tag.searchOnly);
    }

    return dedupeNormalizedTags(
        entry.displayTags
            .map(normalizeGalleryTag)
            .filter((tag): tag is NormalizedTag => Boolean(tag)),
    ).filter((tag) => !tag.searchOnly);
}

function normalizeGalleryTag(tag: GalleryTag): NormalizedTag | undefined {
    const kind = tag.kind.trim();
    const path = tag.path
        .map((part) => part.trim())
        .filter(Boolean);

    if (!kind || path.length === 0) {
        return undefined;
    }

    return {
        id: `${slugTagPart(kind)}:${path.map(slugTagPart).join("/")}`,
        facet: createFacetLabel(kind),
        label: tag.label ?? createPathLabel(path),
        path,
        source: "tag",
        searchOnly: tag.searchOnly,
    };
}

function normalizeCharacterTag(
    characterId: string,
    characters: CharacterRegistry,
): NormalizedTag {
    const character = characters[characterId];
    const id = character?.id ?? characterId;

    return {
        id: `character:${slugTagPart(id)}`,
        facet: facetLabels.character,
        label: character?.name ?? createPathLabel([id]),
        path: [id],
        source: "character",
    };
}

function normalizeRelationshipTags(relationship: GalleryEntryRelationship): NormalizedTag[] {
    switch (relationship.kind) {
        case "series":
            return [
                {
                    id: `series:${slugTagPart(relationship.id)}`,
                    facet: facetLabels.series,
                    label: relationship.label ?? createPathLabel([relationship.id]),
                    path: [relationship.id],
                    source: "relationship",
                    searchOnly: relationship.searchOnly,
                },
            ];

        case "progress":
            return [
                {
                    id: "process:progress-shot",
                    facet: facetLabels.process,
                    label: relationship.label ?? "Progress Shot",
                    path: ["progress-shot"],
                    source: "relationship",
                    searchOnly: relationship.searchOnly,
                },
                {
                    id: createRelatedEntryTagId("progress", relationship.of, relationship.stage ?? relationship.order),
                    facet: "Progress Of",
                    label: relationship.label ?? createRelatedEntryLabel("Progress", relationship.of),
                    path: createRelationshipPath(relationship.of, relationship.stage ?? relationship.order),
                    source: "relationship",
                    searchOnly: true,
                },
            ];

        case "version": {
            const status = relationship.status ?? "older";

            return [
                {
                    id: `process:${slugTagPart(status)}-version`,
                    facet: facetLabels.process,
                    label: relationship.label ?? createVersionLabel(status),
                    path: [status, "version"],
                    source: "relationship",
                    searchOnly: relationship.searchOnly,
                },
                {
                    id: createRelatedEntryTagId("version", relationship.of, relationship.version ?? status),
                    facet: "Version Of",
                    label: relationship.label ?? createRelatedEntryLabel("Version", relationship.of),
                    path: createRelationshipPath(relationship.of, relationship.version ?? status),
                    source: "relationship",
                    searchOnly: true,
                },
            ];
        }
    }
}

function dedupeNormalizedTags(tags: readonly NormalizedTag[]): NormalizedTag[] {
    const tagsById = new Map<string, NormalizedTag>();

    for (const tag of tags) {
        const existingTag = tagsById.get(tag.id);

        if (!existingTag || existingTag.searchOnly && !tag.searchOnly) {
            tagsById.set(tag.id, tag);
        }
    }

    return Array.from(tagsById.values());
}

function createFacetLabel(kind: string): string {
    const slug = slugTagPart(kind);

    return facetLabels[slug] ?? createPathLabel([kind]);
}

function createPathLabel(path: readonly string[]): string {
    const [lastPart, previousPart] = path.slice().reverse();

    if (!lastPart) {
        return "";
    }

    if (previousPart && isDimensionPart(previousPart)) {
        return `${createPartLabel(lastPart)} ${createPartLabel(previousPart)}`;
    }

    if (previousPart && slugTagPart(lastPart) === "spa") {
        return `${createPartLabel(previousPart)} ${createPartLabel(lastPart)}`;
    }

    return createPartLabel(lastPart);
}

function createPartLabel(part: string): string {
    const slug = slugTagPart(part);

    if (specialLabels[slug]) {
        return specialLabels[slug];
    }

    return part
        .trim()
        .split(/[-_\s]+/g)
        .filter(Boolean)
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
        .join(" ");
}

function createVersionLabel(status: "older" | "current" | "alternate"): string {
    switch (status) {
        case "alternate":
            return "Alternate Version";

        case "current":
            return "Current Version";

        case "older":
            return "Older Version";
    }
}

function createRelatedEntryLabel(prefix: string, entryId: string): string {
    return `${prefix}: ${createPartLabel(entryId)}`;
}

function createRelatedEntryTagId(
    kind: "progress" | "version",
    entryId: string,
    detail?: string | number,
): string {
    const detailSuffix = detail === undefined ? "" : `/${slugTagPart(String(detail))}`;

    return `${kind}:${slugTagPart(entryId)}${detailSuffix}`;
}

function createRelationshipPath(
    entryId: string,
    detail?: string | number,
): readonly string[] {
    return detail === undefined
        ? [entryId]
        : [entryId, String(detail)];
}

function slugTagPart(value: string): string {
    const slug = value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return slug || "tag";
}

function isDimensionPart(value: string): boolean {
    const slug = slugTagPart(value);

    return slug === "2d" || slug === "3d";
}

function uniqueQueryIds(tagIds: readonly string[]): string[] {
    const uniqueIds: string[] = [];
    const seenIds = new Set<string>();

    for (const tagId of tagIds) {
        const normalizedTagId = tagId.trim();

        if (!normalizedTagId || seenIds.has(normalizedTagId)) {
            continue;
        }

        seenIds.add(normalizedTagId);
        uniqueIds.push(normalizedTagId);
    }

    return uniqueIds;
}

function compareFacetGroups(
    first: GalleryFacetGroup,
    second: GalleryFacetGroup,
): number {
    const firstOrder = facetOrder.indexOf(first.facet);
    const secondOrder = facetOrder.indexOf(second.facet);

    if (firstOrder !== -1 || secondOrder !== -1) {
        return normalizeFacetOrder(firstOrder) - normalizeFacetOrder(secondOrder);
    }

    return first.facet.localeCompare(second.facet);
}

function compareFacetValues(
    first: GalleryFacetValue,
    second: GalleryFacetValue,
): number {
    return first.label.localeCompare(second.label)
        || first.id.localeCompare(second.id);
}

function normalizeFacetOrder(order: number): number {
    return order === -1 ? Number.MAX_SAFE_INTEGER : order;
}

function getOrInsert<TKey, TValue>(
    map: Map<TKey, TValue>,
    key: TKey,
    createValue: () => TValue,
): TValue {
    const existingValue = map.get(key);

    if (existingValue) {
        return existingValue;
    }

    const value = createValue();
    map.set(key, value);

    return value;
}
