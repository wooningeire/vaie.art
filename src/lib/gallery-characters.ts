import type { CharacterDefinition } from "$/gallery-tags";

export const galleryCharacters = {
    curi: {
        id: "curi",
        name: "Curi",
    },
    iywralyx: {
        id: "iywralyx",
        name: "Iywralyx",
    },
    pret: {
        id: "pret",
        name: "Pret",
    },
    pyrinth: {
        id: "pyrinth",
        name: "Pyrinth",
    },
    spax: {
        id: "spax",
        name: "Spax",
    },
    staaria: {
        id: "staaria",
        name: "Staaria",
    },
    vaiezzell: {
        id: "vaiezzell",
        name: "vaiezzell",
        aliases: ["vaie"],
        owner: "vaiezzell",
    },
} satisfies Record<string, CharacterDefinition>;

export type GalleryCharacterId = keyof typeof galleryCharacters;
