import type { Component } from "svelte";
import { GalleryDeliverable } from "./GalleryDeliverable";
import { generatedGalleryImages } from "./generatedGalleryImages";
import type { GalleryImage } from "./GalleryImage";
import { galleryMediums } from "./GalleryMedium";

export class GalleryProject {
    readonly label: string;
    readonly deliverables: Record<string, GalleryDeliverable>;

    readonly href: string | null;
    readonly image: GalleryImage | null;
    readonly infoComponent: Component | null;

    constructor({
        label,
        deliverables,
        href = null,
        image = null,
        infoComponent = null,
    }: {
        label: string,
        deliverables: Record<string, GalleryDeliverable>,
        href?: string | null,
        image?: GalleryImage | null,
        infoComponent?: Component | null,
    }) {
        this.label = label;
        this.deliverables = deliverables;
        this.href = href;
        this.image = image;
        this.infoComponent = infoComponent;
    }
}

export const galleryProjects = {
    pudle: new GalleryProject({
        label: "Pudle",
        deliverables: {
            pudle: new GalleryDeliverable({
                label: "Pudle",
                href: "/pudle",
                image: {
                    ...generatedGalleryImages["misc/pudle-cover"],
                    alt: "Pudle",
                },
                medium: galleryMediums.webSpa,
            }),
        },
    }),

    astraRefs: new GalleryProject({
        label: "Astra refs",
        deliverables: {
            curi: GalleryDeliverable.ofGalleryImage({
                label: "Curi reference sheet",
                key: "gallery/astra-refs/curi",
            }),
            staaria: GalleryDeliverable.ofGalleryImage({
                label: "Staaria reference sheet",
                key: "gallery/astra-refs/staaria",
            }),
            pyrinth: GalleryDeliverable.ofGalleryImage({
                label: "Pyrinth reference sheet",
                key: "gallery/astra-refs/pyrinth",
            }),
        },
    }),

    artfight2026: new GalleryProject({
        label: "Art Fight 2026",
        deliverables: {
            vaiezzellThumb: GalleryDeliverable.ofGalleryImage({
                label: "vaiezzell character thumbnail",
                key: "gallery/art-fight-2026/vaiezzell-2026-thumb",
            }),

            iywralyxThumb: GalleryDeliverable.ofGalleryImage({
                label: "Iywralyx character thumbnail",
                key: "gallery/art-fight-2026/iywralyx-2026-thumb",
            }),
        },
    }),

    dragonraffle: new GalleryProject({
        label: "Dragonraffle",
        deliverables: {
            automaton: GalleryDeliverable.ofGalleryImage({
                label: "Automaton dragon",
                key: "gallery/dragonraffle/automaton",
            }),

            dragonInRuralMiddleAmerica: GalleryDeliverable.ofGalleryImage({
                label: "Dragon in rural middle america",
                key: "gallery/dragonraffle/dragon-in-rural-middle-america",
            }),

            dragonOnLawn: GalleryDeliverable.ofGalleryImage({
                label: "Dragon on lawn",
                key: "gallery/dragonraffle/dragon-on-lawn",
            }),

            spacefarer: GalleryDeliverable.ofGalleryImage({
                label: "Spacefarer",
                key: "gallery/dragonraffle/lexi",
            }),

            cherryBlossom: GalleryDeliverable.ofGalleryImage({
                label: "Cherry blossom",
                key: "gallery/dragonraffle/milli",
            }),

            tradeOffer: GalleryDeliverable.ofGalleryImage({
                label: "Trade offer",
                key: "gallery/dragonraffle/nuts",
            }),

            unnickDragonKiss: GalleryDeliverable.ofGalleryImage({
                label: "unnick dragon kiss",
                key: "gallery/dragonraffle/unnick-dragon-kiss",
            }),
        },
    }),

    discordBioEasterEgg: new GalleryProject({
        label: "Discord bio easter egg",
        deliverables: {},
    }),
};
