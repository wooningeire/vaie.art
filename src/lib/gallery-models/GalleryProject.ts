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

    vaiezzellRef: new GalleryProject({
        label: "vaiezzell reference sheet",
        deliverables: {
            vaiezzellRef: GalleryDeliverable.ofGalleryImage({
                label: "vaiezzell reference sheet",
                key: "gallery/vaiezzell-ref",
            }),
        },
    }),

    astraRefs: new GalleryProject({
        label: "Astra reference sheets",
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

    bookwyrmDgcCrossover: new GalleryProject({
        label: "Bookwyrm DGC crossover",
        deliverables: {
            bookwyrmDgcCrossover: GalleryDeliverable.ofGalleryImage({
                label: "Bookwyrm DGC crossover",
                key: "gallery/bookwyrm-dgc-crossover-1",
            }),
        },
    }),

    spaxDragon: new GalleryProject({
        label: "Spax dragon",
        deliverables: {
            spaxDragon: GalleryDeliverable.ofGalleryImage({
                label: "Spax dragon",
                key: "gallery/spax-dragon",
            }),
        },
    }),

    vaieDragnEmoji: new GalleryProject({
        label: "vaie dragn emoji",
        deliverables: {
            dragnbratty: GalleryDeliverable.ofGalleryImage({
                label: "dragnbratty",
                key: "gallery/vaie-dragn-emoji/dragnbrattynew",
            }),
            
            dragnmelting: GalleryDeliverable.ofGalleryImage({
                label: "dragnmelting",
                key: "gallery/vaie-dragn-emoji/dragnmeltingweak",
            }),
            
            dragnskull: GalleryDeliverable.ofGalleryImage({
                label: "dragnskull",
                key: "gallery/vaie-dragn-emoji/dragnskull",
            }),
            
            dragnwinghug: GalleryDeliverable.ofGalleryImage({
                label: "dragnwinghug",
                key: "gallery/vaie-dragn-emoji/dragnwinghug",
            }),
            
            zanayell: GalleryDeliverable.ofGalleryImage({
                label: "zanayell",
                key: "gallery/vaie-dragn-emoji/zanayell",
            }),
        },
    }),

    pretBath: new GalleryProject({
        label: "Pret gamer bath",
        deliverables: {
            pretBath: GalleryDeliverable.ofGalleryImage({
                label: "Pret gamer bath",
                key: "gallery/pretbath",
            }),
        },
    }),

    bigAsha: new GalleryProject({
        label: "Big Asha",
        deliverables: {
            bigAsha: GalleryDeliverable.ofGalleryImage({
                label: "Big Asha",
                key: "gallery/bigasha",
            }),
        },
    }),

    mawdelynRef: new GalleryProject({
        label: "Mawdelyn reference sheet",
        deliverables: {
            mawdelynRef: GalleryDeliverable.ofGalleryImage({
                label: "Mawdelyn reference sheet",
                key: "gallery/mawdelyn-ref",
            }),
        },
    }),

    wiresAirport: new GalleryProject({
        label: "wires airport",
        deliverables: {
            wiresAirport: GalleryDeliverable.ofGalleryImage({
                label: "wires airport",
                key: "gallery/wires-airport",
            }),
        },
    }),

    iywralyxRef: new GalleryProject({
        label: "Iywralyx reference sheet",
        deliverables: {
            iywralyxRef: GalleryDeliverable.ofGalleryImage({
                label: "Iywralyx reference sheet",
                key: "gallery/iywralyx",
            }),
        },
    }),

    anshuSit: new GalleryProject({
        label: "Anshu sit",
        deliverables: {
            anshuSit: GalleryDeliverable.ofGalleryImage({
                label: "Anshu sit",
                key: "gallery/anshu-sit",
            }),
        },
    }),

    terskaylModeling: new GalleryProject({
        label: "Terskayl modeling",
        deliverables: {
            terskaylModeling: GalleryDeliverable.ofGalleryImage({
                label: "Terskayl modeling",
                key: "gallery/terskayl-2",
            }),
        },
    }),

    vaiezzellPfp2025: new GalleryProject({
        label: "vaiezzell pfp 2025",
        deliverables: {
            vaiezzellPfp2025: GalleryDeliverable.ofGalleryImage({
                label: "vaiezzell pfp 2025",
                key: "gallery/vaiezzell-pfp-2025",
            }),
        },
    }),

    vaiezzellCircle: new GalleryProject({
        label: "vaiezzell circle pfp",
        deliverables: {
            vaiezzellCircle: GalleryDeliverable.ofGalleryImage({
                label: "vaiezzell circle pfp",
                key: "gallery/vaiezzell-circle",
            }),
        },
    }),

    silverStadium: new GalleryProject({
        label: "Silver stadium",
        deliverables: {
            silverStadium: GalleryDeliverable.ofGalleryImage({
                label: "Silver stadium",
                key: "gallery/silver-vaie",
            }),
        },
    }),

    jankmanBorzoi: new GalleryProject({
        label: "Jankman with borzoi",
        deliverables: {
            jankmanBorzoi: GalleryDeliverable.ofGalleryImage({
                label: "Jankman with borzoi",
                key: "gallery/jankman-borzoi",
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

    whoTheHellIsJankman: new GalleryProject({
        label: "Who the hell is Jankman?",
        deliverables: {
            whoTheHellIsJankman: GalleryDeliverable.ofGalleryImage({
                label: "Who the hell is Jankman?",
                key: "gallery/who-the-hell-is-jankman",
            }),
        },
    }),

    zanawyrm: new GalleryProject({
        label: "Zanawyrm",
        deliverables: {
            zanawyrm: GalleryDeliverable.ofGalleryImage({
                label: "Zanawyrm",
                key: "gallery/zanawyrm",
            }),
        },
    }),

    trainStation: new GalleryProject({
        label: "Train station",
        deliverables: {
            trainStation: GalleryDeliverable.ofGalleryImage({
                label: "train station",
                key: "gallery/terskayl-train-station-signed-vaiezzell",
            }),
        },
    }),

    coldLight: new GalleryProject({
        label: "Cold light",
        deliverables: {
            coldLight: GalleryDeliverable.ofGalleryImage({
                label: "Cold light",
                key: "gallery/just-gotta-ok-tired-of-ms-paint-now",
            }),
        },
    }),

    inSkylight: new GalleryProject({
        label: "In skylight",
        deliverables: {
            inSkylight: GalleryDeliverable.ofGalleryImage({
                label: "In skylight",
                key: "gallery/in-skylight",
            }),
        },
    }),

    fruitThief: new GalleryProject({
        label: "Fruit thief",
        deliverables: {
            fruitThief: GalleryDeliverable.ofGalleryImage({
                label: "Fruit thief",
                key: "gallery/linky-drinkf",
            }),
        },
    }),

    lounge: new GalleryProject({
        label: "Lounge",
        deliverables: {
            lounge: GalleryDeliverable.ofGalleryImage({
                label: "Lounge",
                key: "gallery/render-test",
            }),
        },
    }),

    aquafrust: new GalleryProject({
        label: "Aquafrust",
        deliverables: {
            aquafrust: GalleryDeliverable.ofGalleryImage({
                label: "Aquafrust",
                key: "gallery/aquafrust",
            }),
        },
    }),

    graffiti: new GalleryProject({
        label: "The most stylish of breath weapons",
        deliverables: {
            graffiti: GalleryDeliverable.ofGalleryImage({
                label: "The most stylish of breath weapons",
                key: "gallery/graffiti",
            }),
        },
    }),

    colors: new GalleryProject({
        label: "Colors",
        deliverables: {
            colors: GalleryDeliverable.ofGalleryImage({
                label: "Colors",
                key: "gallery/colors",
            }),
        },
    }),

    deweyDoughball: new GalleryProject({
        label: "Dewey doughball",
        deliverables: {
            deweyDoughball: GalleryDeliverable.ofGalleryImage({
                label: "Dewey doughball",
                key: "gallery/db",
            }),
        },
    }),

    fireHydrant: new GalleryProject({
        label: "Fire hydran't",
        deliverables: {
            fireHydrant: GalleryDeliverable.ofGalleryImage({
                label: "Fire hydran't",
                key: "gallery/fh",
            }),
        },
    }),

    pond: new GalleryProject({
        label: "Pond",
        deliverables: {
            pond: GalleryDeliverable.ofGalleryImage({
                label: "Pond",
                key: "gallery/pondy",
            }),
        },
    }),

    bulb: new GalleryProject({
        label: "Bulb",
        deliverables: {
            bulb: GalleryDeliverable.ofGalleryImage({
                label: "Bulb",
                key: "gallery/bulb/bulb",
            }),
        },
    }),

    danceyDragon: new GalleryProject({
        label: "Dancey dragon",
        deliverables: {
            danceyDragon: GalleryDeliverable.ofGalleryImage({
                label: "Dancey dragon",
                key: "gallery/dancey",
            }),
        },
    }),

    discordBioEasterEgg: new GalleryProject({
        label: "Discord bio easter egg",
        deliverables: {
            nightFlight: GalleryDeliverable.ofGalleryImage({
                label: "Night flight",
                key: "gallery/discord-bio-easter-egg/conkyf-alpha",
            }),
            
            studious: GalleryDeliverable.ofGalleryImage({
                label: "Studious",
                key: "gallery/discord-bio-easter-egg/twf2ff",
            }),
            
            poweruser: GalleryDeliverable.ofGalleryImage({
                label: "Poweruser",
                key: "gallery/discord-bio-easter-egg/drawmeadragon-p4rp",
            }),
            
            gust: GalleryDeliverable.ofGalleryImage({
                label: "Gust",
                key: "gallery/discord-bio-easter-egg/gustf",
            }),
            
            hotelPrank: GalleryDeliverable.ofGalleryImage({
                label: "Hotel prank",
                key: "gallery/discord-bio-easter-egg/poopyf-alpha",
            }),
            
            desktopPet: GalleryDeliverable.ofGalleryImage({
                label: "Desktop pet",
                key: "gallery/discord-bio-easter-egg/epif",
            }),
            
            mushrooms: GalleryDeliverable.ofGalleryImage({
                label: "Mushrooms",
                key: "gallery/discord-bio-easter-egg/tocky2f-alpha",
            }),
            
            samcluster: GalleryDeliverable.ofGalleryImage({
                label: "Samcluster",
                key: "gallery/discord-bio-easter-egg/samclusterf",
            }),
            
            matsubara: GalleryDeliverable.ofGalleryImage({
                label: "Matsubara",
                key: "gallery/discord-bio-easter-egg/matsf",
            }),

            squareNoodle: GalleryDeliverable.ofGalleryImage({
                label: "Square noodle",
                key: "gallery/discord-bio-easter-egg/squaresquaref",
            }),

            vanished: GalleryDeliverable.ofGalleryImage({
                label: "Vanished",
                key: "gallery/discord-bio-easter-egg/vanv",
            }),
            
            banana: GalleryDeliverable.ofGalleryImage({
                label: "banana",
                key: "gallery/discord-bio-easter-egg/bananaf",
            }),
            
            sampcane: GalleryDeliverable.ofGalleryImage({
                label: "Sampcane",
                key: "gallery/discord-bio-easter-egg/sampcanef",
            }),
        },
    }),

    poolToys: new GalleryProject({
        label: "Pool toys",
        deliverables: {
            poolToys: GalleryDeliverable.ofGalleryImage({
                label: "Pool toys",
                key: "gallery/swimmy",
            }),
        },
    }),

    floatyZane: new GalleryProject({
        label: "Floaty Zane",
        deliverables: {
            floatyZane: GalleryDeliverable.ofGalleryImage({
                label: "Floaty Zane",
                key: "gallery/zaneb",
            }),
        },
    }),
};
