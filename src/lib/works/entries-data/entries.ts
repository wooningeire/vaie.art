import { WorkEntry } from "$/works/WorkEntry";
import { workTags } from "$/works/workTags";

import BookwyrmDgcCrossoverDescription from "$/works/entries-data/bookwyrm-dgc-crossover/Description.svx";
import { generatedMediaAssets } from "./generatedMediaAssets";
import { generatedGalleryImages } from "./generatedGalleryImages";

const pudle = new WorkEntry({
    id: "pudle",
    label: "Pudle",
    href: "/pudle",
    image: {
        full: generatedMediaAssets["misc/pudle-cover"],
        preview: generatedMediaAssets["misc/pudle-cover"],
        thumb: generatedMediaAssets["misc/pudle-cover"],
    },
    tags: [workTags.medium.web],
    external: true,
});

const vaiezzellRef = new WorkEntry({
    id: "vaiezzell-ref",
    label: "vaiezzell reference sheet",
    image: generatedGalleryImages["gallery/vaiezzell-ref"],
    tags: [
        workTags.medium.illustration,
        workTags.tools.krita,
    ],
});

const curiRef = new WorkEntry({
    id: "curi-ref",
    label: "Curi reference sheet",
    image: generatedGalleryImages["gallery/astra-refs/curi"],
    tags: [
        workTags.medium.illustration,
        workTags.tools.krita,
    ],
});

const staariaRef = new WorkEntry({
    id: "staaria-ref",
    label: "Staaria reference sheet",
    image: generatedGalleryImages["gallery/astra-refs/staaria"],
    tags: [
        workTags.medium.illustration,
        workTags.tools.krita,
    ],
});

const pyrinthRef = new WorkEntry({
    id: "pyrinth-ref",
    label: "Pyrinth reference sheet",
    image: generatedGalleryImages["gallery/astra-refs/pyrinth"],
    tags: [
        workTags.medium.illustration,
        workTags.subject.macro,
        workTags.tools.krita,
    ],
});

const astraRefs = new WorkEntry({
    id: "astra-refs",
    label: "Astroral Aurora System reference sheets",
    children: [
        curiRef,
        staariaRef,
        pyrinthRef,
    ],
});

const vaiezzellThumb = new WorkEntry({
    id: "vaiezzell-thumb",
    label: "vaiezzell character thumbnail",
    image: generatedGalleryImages["gallery/art-fight-2026/characters/vaiezzell-2026-thumb"],
    tags: [workTags.medium.illustration],
});

const iywralyxThumb = new WorkEntry({
    id: "iywralyx-thumb",
    label: "Iywralyx character thumbnail",
    image: generatedGalleryImages["gallery/art-fight-2026/characters/iywralyx-2026-thumb"],
    tags: [workTags.medium.illustration],
});

const artfight2026Characters = new WorkEntry({
    id: "artfight-2026-characters",
    label: "Characters",
    children: [
        vaiezzellThumb,
        iywralyxThumb,
    ],
});

const warp = new WorkEntry({
    id: "warp",
    label: "Galactic noodles",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/warp"],
    tags: [workTags.medium.illustration],
});

const aheniru = new WorkEntry({
    id: "aheniru",
    label: "What are you doing in the river...?",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/aheniru"],
    tags: [workTags.medium.illustration],
});

const amonnonza = new WorkEntry({
    id: "amonnonza",
    label: "Nightgazer",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/amonnonza"],
    tags: [workTags.medium.illustration],
});

const snowsquall = new WorkEntry({
    id: "snowsquall",
    label: "Ant problem",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/snowsquall"],
    tags: [workTags.medium.illustration],
});

const jinsym = new WorkEntry({
    id: "jinsym",
    label: "Duskflight",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/jinsym"],
    tags: [workTags.medium.illustration],
});

const viscerall = new WorkEntry({
    id: "viscerall",
    label: "Scrapyard?",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/vviiscerall"],
    tags: [workTags.medium.illustration],
});

const wwco = new WorkEntry({
    id: "wwco",
    label: "Through size and space",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/wwco"],
    tags: [workTags.medium.illustration],
});

const tiffymew = new WorkEntry({
    id: "tiffymew",
    label: "Midtown reading session",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/tiffymew"],
    tags: [workTags.medium.illustration],
});

const captainraven = new WorkEntry({
    id: "captainraven",
    label: "Cave chase!",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/captainraven"],
    tags: [workTags.medium.illustration],
});

const rhaeloth = new WorkEntry({
    id: "rhaeloth",
    label: "Who's this little critter?",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/rhaeloth"],
    tags: [workTags.medium.illustration],
});

const artfight2026Attacks = new WorkEntry({
    id: "artfight-2026-attacks",
    label: "Attacks",
    children: [
        warp,
        aheniru,
        amonnonza,
        snowsquall,
        jinsym,
        viscerall,
        wwco,
        tiffymew,
        captainraven,
        rhaeloth,
    ],
});

const artfight2026 = new WorkEntry({
    id: "artfight-2026",
    label: "Art Fight 2026",
    children: [
        artfight2026Characters,
        artfight2026Attacks,
    ],
});

const bookwyrmDgcCrossover = new WorkEntry({
    id: "bookwyrm-dgc-crossover",
    label: "Bookwyrm DGC crossover",
    image: generatedGalleryImages["gallery/bookwyrm-dgc-crossover-1"],
    tags: [workTags.medium.illustration],
    descriptionComponent: BookwyrmDgcCrossoverDescription,
});

const spaxDragon = new WorkEntry({
    id: "spax-dragon",
    label: "Spax dragon",
    image: generatedGalleryImages["gallery/spax-dragon"],
    tags: [workTags.medium.illustration],
});

const dragnbratty = new WorkEntry({
    id: "dragnbratty",
    label: "dragnbratty",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnbrattynew"],
    tags: [workTags.medium.illustration],
});

const dragnmelting = new WorkEntry({
    id: "dragnmelting",
    label: "dragnmelting",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnmeltingweak"],
    tags: [workTags.medium.illustration],
});

const dragnskull = new WorkEntry({
    id: "dragnskull",
    label: "dragnskull",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnskull"],
    tags: [workTags.medium.illustration],
});

const dragnwinghug = new WorkEntry({
    id: "dragnwinghug",
    label: "dragnwinghug",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnwinghug"],
    tags: [workTags.medium.illustration],
});

const zanayell = new WorkEntry({
    id: "zanayell",
    label: "zanayell",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/zanayell"],
    tags: [workTags.medium.illustration],
});

const vaieDragnEmoji = new WorkEntry({
    id: "vaie-dragn-emoji",
    label: "vaie dragn emoji",
    children: [
        dragnbratty,
        dragnmelting,
        dragnskull,
        dragnwinghug,
        zanayell,
    ],
});

const pretBath = new WorkEntry({
    id: "pret-bath",
    label: "Pret gamer bath",
    image: generatedGalleryImages["gallery/pretbath"],
    tags: [workTags.medium.illustration],
});

const bigAsha = new WorkEntry({
    id: "big-asha",
    label: "Big Asha",
    image: generatedGalleryImages["gallery/bigasha"],
    tags: [workTags.medium.illustration],
});

const mawdelynRef = new WorkEntry({
    id: "mawdelyn-ref",
    label: "Mawdelyn reference sheet",
    image: generatedGalleryImages["gallery/mawdelyn-ref"],
    tags: [workTags.medium.illustration],
});

const wiresAirport = new WorkEntry({
    id: "wires-airport",
    label: "wires airport",
    image: generatedGalleryImages["gallery/wires-airport"],
    tags: [workTags.medium.illustration],
});

const iywralyxRef = new WorkEntry({
    id: "iywralyx-ref",
    label: "Iywralyx reference sheet",
    image: generatedGalleryImages["gallery/iywralyx"],
    tags: [workTags.medium.illustration],
});

const anshuSit = new WorkEntry({
    id: "anshu-sit",
    label: "Anshu sit",
    image: generatedGalleryImages["gallery/anshu-sit"],
    tags: [workTags.medium.illustration],
});

const terskaylModeling = new WorkEntry({
    id: "terskayl-modeling",
    label: "Terskayl modeling",
    image: generatedGalleryImages["gallery/terskayl-2"],
    tags: [workTags.medium.illustration],
});

const vaiezzellPfp2025 = new WorkEntry({
    id: "vaiezzell-pfp-2025",
    label: "vaiezzell pfp 2025",
    image: generatedGalleryImages["gallery/vaiezzell-pfp-2025"],
    tags: [workTags.medium.illustration],
});

const vaiezzellCircle = new WorkEntry({
    id: "vaiezzell-circle",
    label: "vaiezzell circle pfp",
    image: generatedGalleryImages["gallery/vaiezzell-circle"],
    tags: [workTags.medium.illustration],
});

const silverStadium = new WorkEntry({
    id: "silver-stadium",
    label: "Silver stadium",
    image: generatedGalleryImages["gallery/silver-vaie"],
    tags: [workTags.medium.illustration],
});

const jankmanBorzoi = new WorkEntry({
    id: "jankman-borzoi",
    label: "Jankman with borzoi",
    image: generatedGalleryImages["gallery/jankman-borzoi"],
    tags: [workTags.medium.illustration],
});

const automaton = new WorkEntry({
    id: "automaton",
    label: "Automaton dragon",
    image: generatedGalleryImages["gallery/dragonraffle/automaton"],
    tags: [workTags.medium.illustration],
});

const dragonInRuralMiddleAmerica = new WorkEntry({
    id: "dragon-in-rural-middle-america",
    label: "Dragon in rural middle america",
    image: generatedGalleryImages["gallery/dragonraffle/dragon-in-rural-middle-america"],
    tags: [workTags.medium.illustration],
});

const dragonOnLawn = new WorkEntry({
    id: "dragon-on-lawn",
    label: "Dragon on lawn",
    image: generatedGalleryImages["gallery/dragonraffle/dragon-on-lawn"],
    tags: [workTags.medium.illustration],
});

const spacefarer = new WorkEntry({
    id: "spacefarer",
    label: "Spacefarer",
    image: generatedGalleryImages["gallery/dragonraffle/lexi"],
    tags: [workTags.medium.illustration],
});

const cherryBlossom = new WorkEntry({
    id: "cherry-blossom",
    label: "Cherry blossom",
    image: generatedGalleryImages["gallery/dragonraffle/milli"],
    tags: [workTags.medium.illustration],
});

const tradeOffer = new WorkEntry({
    id: "trade-offer",
    label: "Trade offer",
    image: generatedGalleryImages["gallery/dragonraffle/nuts"],
    tags: [workTags.medium.illustration],
});

const unnickDragonKiss = new WorkEntry({
    id: "unnick-dragon-kiss",
    label: "unnick dragon kiss",
    image: generatedGalleryImages["gallery/dragonraffle/unnick-dragon-kiss"],
    tags: [workTags.medium.illustration],
});

const dragonraffle = new WorkEntry({
    id: "dragonraffle",
    label: "Dragonraffle",
    children: [
        automaton,
        dragonInRuralMiddleAmerica,
        dragonOnLawn,
        spacefarer,
        cherryBlossom,
        tradeOffer,
        unnickDragonKiss,
    ],
});

const whoTheHellIsJankman = new WorkEntry({
    id: "who-the-hell-is-jankman",
    label: "Who the hell is Jankman?",
    image: generatedGalleryImages["gallery/who-the-hell-is-jankman"],
    tags: [workTags.medium.illustration],
});

const zanawyrm = new WorkEntry({
    id: "zanawyrm",
    label: "Zanawyrm",
    image: generatedGalleryImages["gallery/zanawyrm"],
    tags: [workTags.medium.illustration],
});

const trainStation = new WorkEntry({
    id: "train-station",
    label: "train station",
    image: generatedGalleryImages["gallery/terskayl-train-station-signed-vaiezzell"],
    tags: [workTags.medium.illustration],
});

const coldLight = new WorkEntry({
    id: "cold-light",
    label: "Cold light",
    image: generatedGalleryImages["gallery/just-gotta-ok-tired-of-ms-paint-now"],
    tags: [workTags.medium.illustration],
});

const inSkylight = new WorkEntry({
    id: "in-skylight",
    label: "In skylight",
    image: generatedGalleryImages["gallery/in-skylight"],
    tags: [workTags.medium.illustration],
});

const fruitThief = new WorkEntry({
    id: "fruit-thief",
    label: "Fruit thief",
    image: generatedGalleryImages["gallery/linky-drinkf"],
    tags: [workTags.medium.illustration],
});

const lounge = new WorkEntry({
    id: "lounge",
    label: "Lounge",
    image: generatedGalleryImages["gallery/render-test"],
    tags: [workTags.medium.illustration],
});

const aquafrust = new WorkEntry({
    id: "aquafrust",
    label: "Aquafrust",
    image: generatedGalleryImages["gallery/aquafrust"],
    tags: [workTags.medium.illustration],
});

const graffiti = new WorkEntry({
    id: "graffiti",
    label: "The most stylish of breath weapons",
    image: generatedGalleryImages["gallery/graffiti"],
    tags: [workTags.medium.illustration],
});

const colors = new WorkEntry({
    id: "colors",
    label: "Colors",
    image: generatedGalleryImages["gallery/colors"],
    tags: [workTags.medium.illustration],
});

const deweyDoughball = new WorkEntry({
    id: "dewey-doughball",
    label: "Dewey doughball",
    image: generatedGalleryImages["gallery/db"],
    tags: [workTags.medium.illustration],
});

const fireHydrant = new WorkEntry({
    id: "fire-hydrant",
    label: "Fire hydran't",
    image: generatedGalleryImages["gallery/fh"],
    tags: [workTags.medium.illustration],
});

const pond = new WorkEntry({
    id: "pond",
    label: "Pond",
    image: generatedGalleryImages["gallery/pondy"],
    tags: [workTags.medium.illustration],
});

const bulb = new WorkEntry({
    id: "bulb",
    label: "Bulb",
    image: generatedGalleryImages["gallery/bulb/bulb"],
    tags: [workTags.medium.illustration],
});

const danceyDragon = new WorkEntry({
    id: "dancey-dragon",
    label: "Dancey dragon",
    image: generatedGalleryImages["gallery/dancey"],
    tags: [workTags.medium.illustration],
});

const nightFlight = new WorkEntry({
    id: "night-flight",
    label: "Night flight",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/conkyf-alpha"],
    tags: [workTags.medium.illustration],
});

const studious = new WorkEntry({
    id: "studious",
    label: "Studious",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/twf2ff"],
    tags: [workTags.medium.illustration],
});

const poweruser = new WorkEntry({
    id: "poweruser",
    label: "Poweruser",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/drawmeadragon-p4rp"],
    tags: [workTags.medium.illustration],
});

const gust = new WorkEntry({
    id: "gust",
    label: "Gust",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/gustf"],
    tags: [workTags.medium.illustration],
});

const hotelPrank = new WorkEntry({
    id: "hotel-prank",
    label: "Hotel prank",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/poopyf-alpha"],
    tags: [workTags.medium.illustration],
});

const desktopPet = new WorkEntry({
    id: "desktop-pet",
    label: "Desktop pet",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/epif"],
    tags: [workTags.medium.illustration],
});

const mushrooms = new WorkEntry({
    id: "mushrooms",
    label: "Mushrooms",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/tocky2f-alpha"],
    tags: [workTags.medium.illustration],
});

const samcluster = new WorkEntry({
    id: "samcluster",
    label: "Samcluster",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/samclusterf"],
    tags: [workTags.medium.illustration],
});

const matsubara = new WorkEntry({
    id: "matsubara",
    label: "Matsubara",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/matsf"],
    tags: [workTags.medium.illustration],
});

const squareNoodle = new WorkEntry({
    id: "square-noodle",
    label: "Square noodle",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/squaresquaref"],
    tags: [workTags.medium.illustration],
});

const vanished = new WorkEntry({
    id: "vanished",
    label: "Vanished",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/vanv"],
    tags: [workTags.medium.illustration],
});

const banana = new WorkEntry({
    id: "banana",
    label: "banana",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/bananaf"],
    tags: [workTags.medium.illustration],
});

const sampcane = new WorkEntry({
    id: "sampcane",
    label: "Sampcane",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/sampcanef"],
    tags: [workTags.medium.illustration],
});

const discordBioEasterEgg = new WorkEntry({
    id: "discord-bio-easter-egg",
    label: "Discord bio easter egg",
    children: [
        nightFlight,
        studious,
        poweruser,
        gust,
        hotelPrank,
        desktopPet,
        mushrooms,
        samcluster,
        matsubara,
        squareNoodle,
        vanished,
        banana,
        sampcane,
    ],
});

const poolToys = new WorkEntry({
    id: "pool-toys",
    label: "Pool toys",
    image: generatedGalleryImages["gallery/swimmy"],
    tags: [workTags.medium.illustration],
});

const floatyZane = new WorkEntry({
    id: "floaty-zane",
    label: "Floaty Zane",
    image: generatedGalleryImages["gallery/zaneb"],
    tags: [workTags.medium.illustration],
});

export const workEntries = {
    [pudle.id]: pudle,
    [vaiezzellRef.id]: vaiezzellRef,
    [curiRef.id]: curiRef,
    [staariaRef.id]: staariaRef,
    [pyrinthRef.id]: pyrinthRef,
    [astraRefs.id]: astraRefs,
    [artfight2026.id]: artfight2026,
    [artfight2026Characters.id]: artfight2026Characters,
    [vaiezzellThumb.id]: vaiezzellThumb,
    [iywralyxThumb.id]: iywralyxThumb,
    [artfight2026Attacks.id]: artfight2026Attacks,
    [warp.id]: warp,
    [aheniru.id]: aheniru,
    [amonnonza.id]: amonnonza,
    [snowsquall.id]: snowsquall,
    [jinsym.id]: jinsym,
    [viscerall.id]: viscerall,
    [wwco.id]: wwco,
    [tiffymew.id]: tiffymew,
    [captainraven.id]: captainraven,
    [rhaeloth.id]: rhaeloth,
    [bookwyrmDgcCrossover.id]: bookwyrmDgcCrossover,
    [spaxDragon.id]: spaxDragon,
    [vaieDragnEmoji.id]: vaieDragnEmoji,
    [dragnbratty.id]: dragnbratty,
    [dragnmelting.id]: dragnmelting,
    [dragnskull.id]: dragnskull,
    [dragnwinghug.id]: dragnwinghug,
    [zanayell.id]: zanayell,
    [pretBath.id]: pretBath,
    [bigAsha.id]: bigAsha,
    [mawdelynRef.id]: mawdelynRef,
    [wiresAirport.id]: wiresAirport,
    [iywralyxRef.id]: iywralyxRef,
    [anshuSit.id]: anshuSit,
    [terskaylModeling.id]: terskaylModeling,
    [vaiezzellPfp2025.id]: vaiezzellPfp2025,
    [vaiezzellCircle.id]: vaiezzellCircle,
    [silverStadium.id]: silverStadium,
    [jankmanBorzoi.id]: jankmanBorzoi,
    [dragonraffle.id]: dragonraffle,
    [automaton.id]: automaton,
    [dragonInRuralMiddleAmerica.id]: dragonInRuralMiddleAmerica,
    [dragonOnLawn.id]: dragonOnLawn,
    [spacefarer.id]: spacefarer,
    [cherryBlossom.id]: cherryBlossom,
    [tradeOffer.id]: tradeOffer,
    [unnickDragonKiss.id]: unnickDragonKiss,
    [whoTheHellIsJankman.id]: whoTheHellIsJankman,
    [zanawyrm.id]: zanawyrm,
    [trainStation.id]: trainStation,
    [coldLight.id]: coldLight,
    [inSkylight.id]: inSkylight,
    [fruitThief.id]: fruitThief,
    [lounge.id]: lounge,
    [aquafrust.id]: aquafrust,
    [graffiti.id]: graffiti,
    [colors.id]: colors,
    [deweyDoughball.id]: deweyDoughball,
    [fireHydrant.id]: fireHydrant,
    [pond.id]: pond,
    [bulb.id]: bulb,
    [danceyDragon.id]: danceyDragon,
    [discordBioEasterEgg.id]: discordBioEasterEgg,
    [nightFlight.id]: nightFlight,
    [studious.id]: studious,
    [poweruser.id]: poweruser,
    [gust.id]: gust,
    [hotelPrank.id]: hotelPrank,
    [desktopPet.id]: desktopPet,
    [mushrooms.id]: mushrooms,
    [samcluster.id]: samcluster,
    [matsubara.id]: matsubara,
    [squareNoodle.id]: squareNoodle,
    [vanished.id]: vanished,
    [banana.id]: banana,
    [sampcane.id]: sampcane,
    [poolToys.id]: poolToys,
    [floatyZane.id]: floatyZane,
};

export const workEntryParents = new Map<WorkEntry, WorkEntry | null>(Object.values(workEntries).map(work => [work, null]));
for (const work of Object.values(workEntries)) {
    for (const childWork of work.children) {
        workEntryParents.set(childWork, work);
    }
}