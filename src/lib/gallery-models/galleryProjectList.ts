import { WorkEntry, type GalleryProjectTree } from "./WorkEntry";
import { workTags } from "./workTags";
import type {GalleryImage, GalleryImageAsset} from "./GalleryImage";

export const galleryImageHrefOf = (galleryImageId: string) => `/works/${encodeURIComponent(galleryImageId)}`;

const resolveGalleryProjectHrefs = (
    projects: GalleryProjectTree,
): GalleryProjectTree => Object.fromEntries(
    Object.entries(projects).map(([id, project]) => {
        const projectWithResolvedChildren = project.withChildren(
            resolveGalleryProjectHrefs(project.children),
        );

        return [
            id,
            projectWithResolvedChildren.hasGalleryImagePage
                ? projectWithResolvedChildren.withHref(galleryImageHrefOf(id))
                : projectWithResolvedChildren,
        ];
    }),
);

import BookwyrmDgcCrossoverDescription from "$/gallery-info/BookwyrmDgcCrossoverDescription.svx";
import { generatedMediaAssets } from "./generatedMediaAssets";

const galleryImageFromMediaAsset = (
    asset: GalleryImageAsset,
    alt: string,
): GalleryImage => ({
    full: asset,
    preview: asset,
    thumb: asset,
    alt,
});


export const galleryWorks = resolveGalleryProjectHrefs({
    pudle: new WorkEntry({
        label: "Pudle",
        href: "/pudle",
        image: galleryImageFromMediaAsset(
            generatedMediaAssets["misc/pudle-cover"],
            "Pudle",
        ),
        tags: [workTags.medium.web],
        external: true,
    }),

    vaiezzellRef: WorkEntry.ofGalleryImage({
        label: "vaiezzell reference sheet",
        key: "gallery/vaiezzell-ref",
    }),

    curiRef: WorkEntry.ofGalleryImage({
        label: "Curi reference sheet",
        key: "gallery/astra-refs/curi",
    }),
    staariaRef: WorkEntry.ofGalleryImage({
        label: "Staaria reference sheet",
        key: "gallery/astra-refs/staaria",
    }),
    pyrinthRef: WorkEntry.ofGalleryImage({
        label: "Pyrinth reference sheet",
        key: "gallery/astra-refs/pyrinth",
    }, {
        tags: [
            workTags.subject.macro,
            workTags.tools.krita,
        ],
    }),

    artfight2026: new WorkEntry({
        label: "Art Fight 2026",
        children: {
            characters: new WorkEntry({
                label: "Characters",
                children: {
                    vaiezzellThumb: WorkEntry.ofGalleryImage({
                        label: "vaiezzell character thumbnail",
                        key: "gallery/art-fight-2026/characters/vaiezzell-2026-thumb",
                    }),

                    iywralyxThumb: WorkEntry.ofGalleryImage({
                        label: "Iywralyx character thumbnail",
                        key: "gallery/art-fight-2026/characters/iywralyx-2026-thumb",
                    }),
                },
            }),
            
            attacks: new WorkEntry({
                label: "Attacks",
                children: {
                    warp: WorkEntry.ofGalleryImage({
                        label: "Galactic noodles",
                        key: "gallery/art-fight-2026/attacks/warp",
                    }),

                    aheniru: WorkEntry.ofGalleryImage({
                        label: "What are you doing in the river...?",
                        key: "gallery/art-fight-2026/attacks/aheniru",
                    }),

                    amonnonza: WorkEntry.ofGalleryImage({
                        label: "Nightgazer",
                        key: "gallery/art-fight-2026/attacks/amonnonza",
                    }),

                    snowsquall: WorkEntry.ofGalleryImage({
                        label: "Ant problem",
                        key: "gallery/art-fight-2026/attacks/snowsquall",
                    }),

                    jinsym: WorkEntry.ofGalleryImage({
                        label: "Duskflight",
                        key: "gallery/art-fight-2026/attacks/jinsym",
                    }),

                    viscerall: WorkEntry.ofGalleryImage({
                        label: "Scrapyard?",
                        key: "gallery/art-fight-2026/attacks/vviiscerall",
                    }),

                    wwco: WorkEntry.ofGalleryImage({
                        label: "Through size and space",
                        key: "gallery/art-fight-2026/attacks/wwco",
                    }),

                    tiffymew: WorkEntry.ofGalleryImage({
                        label: "Midtown reading session",
                        key: "gallery/art-fight-2026/attacks/tiffymew",
                    }),

                    captainraven: WorkEntry.ofGalleryImage({
                        label: "Cave chase!",
                        key: "gallery/art-fight-2026/attacks/captainraven",
                    }),

                    rhaeloth: WorkEntry.ofGalleryImage({
                        label: "Who's this little critter?",
                        key: "gallery/art-fight-2026/attacks/rhaeloth",
                    }),
                },
            }),
        },
    }),

    bookwyrmDgcCrossover: WorkEntry.ofGalleryImage({
        label: "Bookwyrm DGC crossover",
        key: "gallery/bookwyrm-dgc-crossover-1",
    }, {
        descriptionComponent: BookwyrmDgcCrossoverDescription,
    }),

    spaxDragon: WorkEntry.ofGalleryImage({
        label: "Spax dragon",
        key: "gallery/spax-dragon",
    }),

    vaieDragnEmoji: new WorkEntry({
        label: "vaie dragn emoji",
        children: {
            dragnbratty: WorkEntry.ofGalleryImage({
                label: "dragnbratty",
                key: "gallery/vaie-dragn-emoji/dragnbrattynew",
            }),

            dragnmelting: WorkEntry.ofGalleryImage({
                label: "dragnmelting",
                key: "gallery/vaie-dragn-emoji/dragnmeltingweak",
            }),

            dragnskull: WorkEntry.ofGalleryImage({
                label: "dragnskull",
                key: "gallery/vaie-dragn-emoji/dragnskull",
            }),

            dragnwinghug: WorkEntry.ofGalleryImage({
                label: "dragnwinghug",
                key: "gallery/vaie-dragn-emoji/dragnwinghug",
            }),

            zanayell: WorkEntry.ofGalleryImage({
                label: "zanayell",
                key: "gallery/vaie-dragn-emoji/zanayell",
            }),
        },
    }),

    pretBath: WorkEntry.ofGalleryImage({
        label: "Pret gamer bath",
        key: "gallery/pretbath",
    }),

    bigAsha: WorkEntry.ofGalleryImage({
        label: "Big Asha",
        key: "gallery/bigasha",
    }),

    mawdelynRef: WorkEntry.ofGalleryImage({
        label: "Mawdelyn reference sheet",
        key: "gallery/mawdelyn-ref",
    }),

    wiresAirport: WorkEntry.ofGalleryImage({
        label: "wires airport",
        key: "gallery/wires-airport",
    }),

    iywralyxRef: WorkEntry.ofGalleryImage({
        label: "Iywralyx reference sheet",
        key: "gallery/iywralyx",
    }),

    anshuSit: WorkEntry.ofGalleryImage({
        label: "Anshu sit",
        key: "gallery/anshu-sit",
    }),

    terskaylModeling: WorkEntry.ofGalleryImage({
        label: "Terskayl modeling",
        key: "gallery/terskayl-2",
    }),

    vaiezzellPfp2025: WorkEntry.ofGalleryImage({
        label: "vaiezzell pfp 2025",
        key: "gallery/vaiezzell-pfp-2025",
    }),

    vaiezzellCircle: WorkEntry.ofGalleryImage({
        label: "vaiezzell circle pfp",
        key: "gallery/vaiezzell-circle",
    }),

    silverStadium: WorkEntry.ofGalleryImage({
        label: "Silver stadium",
        key: "gallery/silver-vaie",
    }),

    jankmanBorzoi: WorkEntry.ofGalleryImage({
        label: "Jankman with borzoi",
        key: "gallery/jankman-borzoi",
    }),

    dragonraffle: new WorkEntry({
        label: "Dragonraffle",
        children: {
            automaton: WorkEntry.ofGalleryImage({
                label: "Automaton dragon",
                key: "gallery/dragonraffle/automaton",
            }),

            dragonInRuralMiddleAmerica: WorkEntry.ofGalleryImage({
                label: "Dragon in rural middle america",
                key: "gallery/dragonraffle/dragon-in-rural-middle-america",
            }),

            dragonOnLawn: WorkEntry.ofGalleryImage({
                label: "Dragon on lawn",
                key: "gallery/dragonraffle/dragon-on-lawn",
            }),

            spacefarer: WorkEntry.ofGalleryImage({
                label: "Spacefarer",
                key: "gallery/dragonraffle/lexi",
            }),

            cherryBlossom: WorkEntry.ofGalleryImage({
                label: "Cherry blossom",
                key: "gallery/dragonraffle/milli",
            }),

            tradeOffer: WorkEntry.ofGalleryImage({
                label: "Trade offer",
                key: "gallery/dragonraffle/nuts",
            }),

            unnickDragonKiss: WorkEntry.ofGalleryImage({
                label: "unnick dragon kiss",
                key: "gallery/dragonraffle/unnick-dragon-kiss",
            }),
        },
    }),

    whoTheHellIsJankman: WorkEntry.ofGalleryImage({
        label: "Who the hell is Jankman?",
        key: "gallery/who-the-hell-is-jankman",
    }),

    zanawyrm: WorkEntry.ofGalleryImage({
        label: "Zanawyrm",
        key: "gallery/zanawyrm",
    }),

    trainStation: WorkEntry.ofGalleryImage({
        label: "train station",
        key: "gallery/terskayl-train-station-signed-vaiezzell",
    }),

    coldLight: WorkEntry.ofGalleryImage({
        label: "Cold light",
        key: "gallery/just-gotta-ok-tired-of-ms-paint-now",
    }),

    inSkylight: WorkEntry.ofGalleryImage({
        label: "In skylight",
        key: "gallery/in-skylight",
    }),

    fruitThief: WorkEntry.ofGalleryImage({
        label: "Fruit thief",
        key: "gallery/linky-drinkf",
    }),

    lounge: WorkEntry.ofGalleryImage({
        label: "Lounge",
        key: "gallery/render-test",
    }),

    aquafrust: WorkEntry.ofGalleryImage({
        label: "Aquafrust",
        key: "gallery/aquafrust",
    }),

    graffiti: WorkEntry.ofGalleryImage({
        label: "The most stylish of breath weapons",
        key: "gallery/graffiti",
    }),

    colors: WorkEntry.ofGalleryImage({
        label: "Colors",
        key: "gallery/colors",
    }),

    deweyDoughball: WorkEntry.ofGalleryImage({
        label: "Dewey doughball",
        key: "gallery/db",
    }),

    fireHydrant: WorkEntry.ofGalleryImage({
        label: "Fire hydran't",
        key: "gallery/fh",
    }),

    pond: WorkEntry.ofGalleryImage({
        label: "Pond",
        key: "gallery/pondy",
    }),

    bulb: WorkEntry.ofGalleryImage({
        label: "Bulb",
        key: "gallery/bulb/bulb",
    }),

    danceyDragon: WorkEntry.ofGalleryImage({
        label: "Dancey dragon",
        key: "gallery/dancey",
    }),

    discordBioEasterEgg: new WorkEntry({
        label: "Discord bio easter egg",
        children: {
            nightFlight: WorkEntry.ofGalleryImage({
                label: "Night flight",
                key: "gallery/discord-bio-easter-egg/conkyf-alpha",
            }),

            studious: WorkEntry.ofGalleryImage({
                label: "Studious",
                key: "gallery/discord-bio-easter-egg/twf2ff",
            }),

            poweruser: WorkEntry.ofGalleryImage({
                label: "Poweruser",
                key: "gallery/discord-bio-easter-egg/drawmeadragon-p4rp",
            }),

            gust: WorkEntry.ofGalleryImage({
                label: "Gust",
                key: "gallery/discord-bio-easter-egg/gustf",
            }),

            hotelPrank: WorkEntry.ofGalleryImage({
                label: "Hotel prank",
                key: "gallery/discord-bio-easter-egg/poopyf-alpha",
            }),

            desktopPet: WorkEntry.ofGalleryImage({
                label: "Desktop pet",
                key: "gallery/discord-bio-easter-egg/epif",
            }),

            mushrooms: WorkEntry.ofGalleryImage({
                label: "Mushrooms",
                key: "gallery/discord-bio-easter-egg/tocky2f-alpha",
            }),

            samcluster: WorkEntry.ofGalleryImage({
                label: "Samcluster",
                key: "gallery/discord-bio-easter-egg/samclusterf",
            }),

            matsubara: WorkEntry.ofGalleryImage({
                label: "Matsubara",
                key: "gallery/discord-bio-easter-egg/matsf",
            }),

            squareNoodle: WorkEntry.ofGalleryImage({
                label: "Square noodle",
                key: "gallery/discord-bio-easter-egg/squaresquaref",
            }),

            vanished: WorkEntry.ofGalleryImage({
                label: "Vanished",
                key: "gallery/discord-bio-easter-egg/vanv",
            }),

            banana: WorkEntry.ofGalleryImage({
                label: "banana",
                key: "gallery/discord-bio-easter-egg/bananaf",
            }),

            sampcane: WorkEntry.ofGalleryImage({
                label: "Sampcane",
                key: "gallery/discord-bio-easter-egg/sampcanef",
            }),
        },
    }),

    poolToys: WorkEntry.ofGalleryImage({
        label: "Pool toys",
        key: "gallery/swimmy",
    }),

    floatyZane: WorkEntry.ofGalleryImage({
        label: "Floaty Zane",
        key: "gallery/zaneb",
    }),
});

export const galleryCollections = {
    astraRefs: [
        galleryWorks.curiRef,
        galleryWorks.staariaRef,
        galleryWorks.pyrinthRef,
    ],
};