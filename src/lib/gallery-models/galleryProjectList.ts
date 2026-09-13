import { GalleryProject, type GalleryProjectTree } from "./GalleryProject";
import { galleryTagTree } from "./GalleryTags";
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
    pudle: new GalleryProject({
        label: "Pudle",
        href: "/pudle",
        image: galleryImageFromMediaAsset(
            generatedMediaAssets["misc/pudle-cover"],
            "Pudle",
        ),
        tags: [galleryTagTree.medium.webSpa],
        external: true,
    }),

    vaiezzellRef: GalleryProject.ofGalleryImage({
        label: "vaiezzell reference sheet",
        key: "gallery/vaiezzell-ref",
    }),

    curiRef: GalleryProject.ofGalleryImage({
        label: "Curi reference sheet",
        key: "gallery/astra-refs/curi",
    }),
    staariaRef: GalleryProject.ofGalleryImage({
        label: "Staaria reference sheet",
        key: "gallery/astra-refs/staaria",
    }),
    pyrinthRef: GalleryProject.ofGalleryImage({
        label: "Pyrinth reference sheet",
        key: "gallery/astra-refs/pyrinth",
    }, {
        tags: [galleryTagTree.subject.macro],
    }),

    artfight2026: new GalleryProject({
        label: "Art Fight 2026",
        children: {
            characters: new GalleryProject({
                label: "Characters",
                children: {
                    vaiezzellThumb: GalleryProject.ofGalleryImage({
                        label: "vaiezzell character thumbnail",
                        key: "gallery/art-fight-2026/characters/vaiezzell-2026-thumb",
                    }),

                    iywralyxThumb: GalleryProject.ofGalleryImage({
                        label: "Iywralyx character thumbnail",
                        key: "gallery/art-fight-2026/characters/iywralyx-2026-thumb",
                    }),
                },
            }),
            
            attacks: new GalleryProject({
                label: "Attacks",
                children: {
                    warp: GalleryProject.ofGalleryImage({
                        label: "Galactic noodles",
                        key: "gallery/art-fight-2026/attacks/warp",
                    }),

                    aheniru: GalleryProject.ofGalleryImage({
                        label: "What are you doing in the river...?",
                        key: "gallery/art-fight-2026/attacks/aheniru",
                    }),

                    amonnonza: GalleryProject.ofGalleryImage({
                        label: "Nightgazer",
                        key: "gallery/art-fight-2026/attacks/amonnonza",
                    }),

                    snowsquall: GalleryProject.ofGalleryImage({
                        label: "Ant problem",
                        key: "gallery/art-fight-2026/attacks/snowsquall",
                    }),

                    jinsym: GalleryProject.ofGalleryImage({
                        label: "Duskflight",
                        key: "gallery/art-fight-2026/attacks/jinsym",
                    }),

                    viscerall: GalleryProject.ofGalleryImage({
                        label: "Scrapyard?",
                        key: "gallery/art-fight-2026/attacks/vviiscerall",
                    }),

                    wwco: GalleryProject.ofGalleryImage({
                        label: "Through size and space",
                        key: "gallery/art-fight-2026/attacks/wwco",
                    }),

                    tiffymew: GalleryProject.ofGalleryImage({
                        label: "Midtown reading session",
                        key: "gallery/art-fight-2026/attacks/tiffymew",
                    }),

                    captainraven: GalleryProject.ofGalleryImage({
                        label: "Cave chase!",
                        key: "gallery/art-fight-2026/attacks/captainraven",
                    }),

                    rhaeloth: GalleryProject.ofGalleryImage({
                        label: "Who's this little critter?",
                        key: "gallery/art-fight-2026/attacks/rhaeloth",
                    }),
                },
            }),
        },
    }),

    bookwyrmDgcCrossover: GalleryProject.ofGalleryImage({
        label: "Bookwyrm DGC crossover",
        key: "gallery/bookwyrm-dgc-crossover-1",
    }, {
        descriptionComponent: BookwyrmDgcCrossoverDescription,
    }),

    spaxDragon: GalleryProject.ofGalleryImage({
        label: "Spax dragon",
        key: "gallery/spax-dragon",
    }),

    vaieDragnEmoji: new GalleryProject({
        label: "vaie dragn emoji",
        children: {
            dragnbratty: GalleryProject.ofGalleryImage({
                label: "dragnbratty",
                key: "gallery/vaie-dragn-emoji/dragnbrattynew",
            }),

            dragnmelting: GalleryProject.ofGalleryImage({
                label: "dragnmelting",
                key: "gallery/vaie-dragn-emoji/dragnmeltingweak",
            }),

            dragnskull: GalleryProject.ofGalleryImage({
                label: "dragnskull",
                key: "gallery/vaie-dragn-emoji/dragnskull",
            }),

            dragnwinghug: GalleryProject.ofGalleryImage({
                label: "dragnwinghug",
                key: "gallery/vaie-dragn-emoji/dragnwinghug",
            }),

            zanayell: GalleryProject.ofGalleryImage({
                label: "zanayell",
                key: "gallery/vaie-dragn-emoji/zanayell",
            }),
        },
    }),

    pretBath: GalleryProject.ofGalleryImage({
        label: "Pret gamer bath",
        key: "gallery/pretbath",
    }),

    bigAsha: GalleryProject.ofGalleryImage({
        label: "Big Asha",
        key: "gallery/bigasha",
    }),

    mawdelynRef: GalleryProject.ofGalleryImage({
        label: "Mawdelyn reference sheet",
        key: "gallery/mawdelyn-ref",
    }),

    wiresAirport: GalleryProject.ofGalleryImage({
        label: "wires airport",
        key: "gallery/wires-airport",
    }),

    iywralyxRef: GalleryProject.ofGalleryImage({
        label: "Iywralyx reference sheet",
        key: "gallery/iywralyx",
    }),

    anshuSit: GalleryProject.ofGalleryImage({
        label: "Anshu sit",
        key: "gallery/anshu-sit",
    }),

    terskaylModeling: GalleryProject.ofGalleryImage({
        label: "Terskayl modeling",
        key: "gallery/terskayl-2",
    }),

    vaiezzellPfp2025: GalleryProject.ofGalleryImage({
        label: "vaiezzell pfp 2025",
        key: "gallery/vaiezzell-pfp-2025",
    }),

    vaiezzellCircle: GalleryProject.ofGalleryImage({
        label: "vaiezzell circle pfp",
        key: "gallery/vaiezzell-circle",
    }),

    silverStadium: GalleryProject.ofGalleryImage({
        label: "Silver stadium",
        key: "gallery/silver-vaie",
    }),

    jankmanBorzoi: GalleryProject.ofGalleryImage({
        label: "Jankman with borzoi",
        key: "gallery/jankman-borzoi",
    }),

    dragonraffle: new GalleryProject({
        label: "Dragonraffle",
        children: {
            automaton: GalleryProject.ofGalleryImage({
                label: "Automaton dragon",
                key: "gallery/dragonraffle/automaton",
            }),

            dragonInRuralMiddleAmerica: GalleryProject.ofGalleryImage({
                label: "Dragon in rural middle america",
                key: "gallery/dragonraffle/dragon-in-rural-middle-america",
            }),

            dragonOnLawn: GalleryProject.ofGalleryImage({
                label: "Dragon on lawn",
                key: "gallery/dragonraffle/dragon-on-lawn",
            }),

            spacefarer: GalleryProject.ofGalleryImage({
                label: "Spacefarer",
                key: "gallery/dragonraffle/lexi",
            }),

            cherryBlossom: GalleryProject.ofGalleryImage({
                label: "Cherry blossom",
                key: "gallery/dragonraffle/milli",
            }),

            tradeOffer: GalleryProject.ofGalleryImage({
                label: "Trade offer",
                key: "gallery/dragonraffle/nuts",
            }),

            unnickDragonKiss: GalleryProject.ofGalleryImage({
                label: "unnick dragon kiss",
                key: "gallery/dragonraffle/unnick-dragon-kiss",
            }),
        },
    }),

    whoTheHellIsJankman: GalleryProject.ofGalleryImage({
        label: "Who the hell is Jankman?",
        key: "gallery/who-the-hell-is-jankman",
    }),

    zanawyrm: GalleryProject.ofGalleryImage({
        label: "Zanawyrm",
        key: "gallery/zanawyrm",
    }),

    trainStation: GalleryProject.ofGalleryImage({
        label: "train station",
        key: "gallery/terskayl-train-station-signed-vaiezzell",
    }),

    coldLight: GalleryProject.ofGalleryImage({
        label: "Cold light",
        key: "gallery/just-gotta-ok-tired-of-ms-paint-now",
    }),

    inSkylight: GalleryProject.ofGalleryImage({
        label: "In skylight",
        key: "gallery/in-skylight",
    }),

    fruitThief: GalleryProject.ofGalleryImage({
        label: "Fruit thief",
        key: "gallery/linky-drinkf",
    }),

    lounge: GalleryProject.ofGalleryImage({
        label: "Lounge",
        key: "gallery/render-test",
    }),

    aquafrust: GalleryProject.ofGalleryImage({
        label: "Aquafrust",
        key: "gallery/aquafrust",
    }),

    graffiti: GalleryProject.ofGalleryImage({
        label: "The most stylish of breath weapons",
        key: "gallery/graffiti",
    }),

    colors: GalleryProject.ofGalleryImage({
        label: "Colors",
        key: "gallery/colors",
    }),

    deweyDoughball: GalleryProject.ofGalleryImage({
        label: "Dewey doughball",
        key: "gallery/db",
    }),

    fireHydrant: GalleryProject.ofGalleryImage({
        label: "Fire hydran't",
        key: "gallery/fh",
    }),

    pond: GalleryProject.ofGalleryImage({
        label: "Pond",
        key: "gallery/pondy",
    }),

    bulb: GalleryProject.ofGalleryImage({
        label: "Bulb",
        key: "gallery/bulb/bulb",
    }),

    danceyDragon: GalleryProject.ofGalleryImage({
        label: "Dancey dragon",
        key: "gallery/dancey",
    }),

    discordBioEasterEgg: new GalleryProject({
        label: "Discord bio easter egg",
        children: {
            nightFlight: GalleryProject.ofGalleryImage({
                label: "Night flight",
                key: "gallery/discord-bio-easter-egg/conkyf-alpha",
            }),

            studious: GalleryProject.ofGalleryImage({
                label: "Studious",
                key: "gallery/discord-bio-easter-egg/twf2ff",
            }),

            poweruser: GalleryProject.ofGalleryImage({
                label: "Poweruser",
                key: "gallery/discord-bio-easter-egg/drawmeadragon-p4rp",
            }),

            gust: GalleryProject.ofGalleryImage({
                label: "Gust",
                key: "gallery/discord-bio-easter-egg/gustf",
            }),

            hotelPrank: GalleryProject.ofGalleryImage({
                label: "Hotel prank",
                key: "gallery/discord-bio-easter-egg/poopyf-alpha",
            }),

            desktopPet: GalleryProject.ofGalleryImage({
                label: "Desktop pet",
                key: "gallery/discord-bio-easter-egg/epif",
            }),

            mushrooms: GalleryProject.ofGalleryImage({
                label: "Mushrooms",
                key: "gallery/discord-bio-easter-egg/tocky2f-alpha",
            }),

            samcluster: GalleryProject.ofGalleryImage({
                label: "Samcluster",
                key: "gallery/discord-bio-easter-egg/samclusterf",
            }),

            matsubara: GalleryProject.ofGalleryImage({
                label: "Matsubara",
                key: "gallery/discord-bio-easter-egg/matsf",
            }),

            squareNoodle: GalleryProject.ofGalleryImage({
                label: "Square noodle",
                key: "gallery/discord-bio-easter-egg/squaresquaref",
            }),

            vanished: GalleryProject.ofGalleryImage({
                label: "Vanished",
                key: "gallery/discord-bio-easter-egg/vanv",
            }),

            banana: GalleryProject.ofGalleryImage({
                label: "banana",
                key: "gallery/discord-bio-easter-egg/bananaf",
            }),

            sampcane: GalleryProject.ofGalleryImage({
                label: "Sampcane",
                key: "gallery/discord-bio-easter-egg/sampcanef",
            }),
        },
    }),

    poolToys: GalleryProject.ofGalleryImage({
        label: "Pool toys",
        key: "gallery/swimmy",
    }),

    floatyZane: GalleryProject.ofGalleryImage({
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