import type { Component } from "svelte";
import type { GalleryImage } from "./GalleryImage";
import { galleryMediums, type GalleryMedium } from "./GalleryMedium";
import { galleryImageHrefOf } from "./galleryImageRoute";
import { generatedGalleryImages } from "./generatedGalleryImages";

export type GalleryProjectTree = Record<string, GalleryProject>;

export type GalleryProjectOptions = {
    label: string,
    image?: GalleryImage | null,
    href?: string | null,
    medium?: GalleryMedium | null,
    descriptionComponent?: Component | null,
    infoComponent?: Component | null,
    external?: boolean,
    hasGalleryImagePage?: boolean,
    children?: GalleryProjectTree,
};

export class GalleryProject {
    readonly label: string;
    readonly image: GalleryImage | null;
    readonly href: string | null;
    readonly medium: GalleryMedium | null;
    readonly descriptionComponent: Component | null;
    readonly infoComponent: Component | null;
    readonly external: boolean;
    readonly hasGalleryImagePage: boolean;
    readonly children: GalleryProjectTree;
    readonly hasChildren: boolean;
    readonly hasLink: boolean;

    constructor({
        label,
        image = null,
        href = null,
        medium = null,
        descriptionComponent = null,
        infoComponent = null,
        external = false,
        hasGalleryImagePage = false,
        children = {},
    }: GalleryProjectOptions) {
        this.label = label;
        this.image = image;
        this.href = href;
        this.medium = medium;
        this.descriptionComponent = descriptionComponent;
        this.infoComponent = infoComponent;
        this.external = external;
        this.hasGalleryImagePage = hasGalleryImagePage;
        this.children = children;
        this.hasChildren = Object.keys(children).length > 0;
        this.hasLink = href !== null && image !== null;
    }

    readonly withHref = (href: string) => new GalleryProject({
        label: this.label,
        image: this.image,
        href,
        medium: this.medium,
        descriptionComponent: this.descriptionComponent,
        infoComponent: this.infoComponent,
        external: this.external,
        hasGalleryImagePage: this.hasGalleryImagePage,
        children: this.children,
    });

    readonly withChildren = (children: GalleryProjectTree) => new GalleryProject({
        label: this.label,
        image: this.image,
        href: this.href,
        medium: this.medium,
        descriptionComponent: this.descriptionComponent,
        infoComponent: this.infoComponent,
        external: this.external,
        hasGalleryImagePage: this.hasGalleryImagePage,
        children,
    });

    static ofGalleryImage(
        {
            label,
            key,
        }: {
            label: string,
            key: keyof typeof generatedGalleryImages,
        },
        rest: Partial<GalleryProjectOptions> = {},
    ) {
        const generatedImage = generatedGalleryImages[key];

        return new GalleryProject({
            label,
            href: rest.href ?? generatedImage.full.src,
            image: rest.image ?? {
                ...generatedImage,
                alt: label,
            },
            medium: rest.medium ?? galleryMediums.illustration2d,
            descriptionComponent: rest.descriptionComponent,
            infoComponent: rest.infoComponent,
            external: rest.external,
            hasGalleryImagePage: rest.hasGalleryImagePage ?? true,
            children: rest.children,
        });
    }
}

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

export const galleryProjects = resolveGalleryProjectHrefs({
    pudle: new GalleryProject({
        label: "Pudle",
        href: "/pudle",
        image: {
            ...generatedGalleryImages["misc/pudle-cover"],
            alt: "Pudle",
        },
        medium: galleryMediums.webSpa,
        external: true,
    }),

    vaiezzellRef: GalleryProject.ofGalleryImage({
        label: "vaiezzell reference sheet",
        key: "gallery/vaiezzell-ref",
    }),

    astraRefs: new GalleryProject({
        label: "Astra reference sheets",
        children: {
            curi: GalleryProject.ofGalleryImage({
                label: "Curi reference sheet",
                key: "gallery/astra-refs/curi",
            }),
            staaria: GalleryProject.ofGalleryImage({
                label: "Staaria reference sheet",
                key: "gallery/astra-refs/staaria",
            }),
            pyrinth: GalleryProject.ofGalleryImage({
                label: "Pyrinth reference sheet",
                key: "gallery/astra-refs/pyrinth",
            }),
        },
    }),

    artfight2026: new GalleryProject({
        label: "Art Fight 2026",
        children: {
            vaiezzellThumb: GalleryProject.ofGalleryImage({
                label: "vaiezzell character thumbnail",
                key: "gallery/art-fight-2026/vaiezzell-2026-thumb",
            }),

            iywralyxThumb: GalleryProject.ofGalleryImage({
                label: "Iywralyx character thumbnail",
                key: "gallery/art-fight-2026/iywralyx-2026-thumb",
            }),
        },
    }),

    bookwyrmDgcCrossover: GalleryProject.ofGalleryImage({
        label: "Bookwyrm DGC crossover",
        key: "gallery/bookwyrm-dgc-crossover-1",
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
