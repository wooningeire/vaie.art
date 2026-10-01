import { GalleryEntry } from "$/gallery/GalleryEntry";
import { galleryTags } from "$/gallery/GalleryTag";

import BookwyrmDgcCrossoverDescription from "$/gallery/entries-data/bookwyrm-dgc-crossover/Description.svx";
import { generatedMediaAssets } from "./generatedMediaAssets";
import { generatedGalleryImages } from "./generatedGalleryImages";

const pudle = new GalleryEntry({
    id: "pudle",
    label: "Pudle",
    href: "/pudle",
    image: {
        full: generatedMediaAssets["pudle/pudle-cover"],
        preview: generatedMediaAssets["pudle/pudle-cover"],
        thumb: generatedMediaAssets["pudle/pudle-cover"],
    },
    tags: [
        galleryTags.medium.web,
    ],
    external: true,
});

const vaiezzellRef = new GalleryEntry({
    id: "vaiezzell-ref",
    label: "vaiezzell reference sheet",
    image: generatedGalleryImages["gallery/vaiezzell-ref"],
    tags: [
        galleryTags.purpose.refsheet,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const curiRef = new GalleryEntry({
    id: "curi-ref",
    label: "Curi reference sheet",
    image: generatedGalleryImages["gallery/astra-refs/curi"],
    tags: [
        galleryTags.purpose.refsheet,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const staariaRef = new GalleryEntry({
    id: "staaria-ref",
    label: "Staaria reference sheet",
    image: generatedGalleryImages["gallery/astra-refs/staaria"],
    tags: [
        galleryTags.purpose.refsheet,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const pyrinthRef = new GalleryEntry({
    id: "pyrinth-ref",
    label: "Pyrinth reference sheet",
    image: generatedGalleryImages["gallery/astra-refs/pyrinth"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.purpose.refsheet,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const astraRefs = new GalleryEntry({
    id: "astra-refs",
    label: "Astroral Aurora System reference sheets",
    children: [
        curiRef,
        staariaRef,
        pyrinthRef,
    ],
    tags: [
        galleryTags.purpose.refsheet,
    ],
});

const vaiezzellThumb = new GalleryEntry({
    id: "vaiezzell-thumb",
    label: "vaiezzell character thumbnail",
    image: generatedGalleryImages["gallery/art-fight-2026/characters/vaiezzell-2026-thumb"],
    tags: [
        galleryTags.purpose.thumbnail,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const iywralyxThumb = new GalleryEntry({
    id: "iywralyx-thumb",
    label: "Iywralyx character thumbnail",
    image: generatedGalleryImages["gallery/art-fight-2026/characters/iywralyx-2026-thumb"],
    tags: [
        galleryTags.purpose.thumbnail,
        galleryTags.purpose.illustration,
        galleryTags.subject.macro,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const artfight2026Characters = new GalleryEntry({
    id: "artfight-2026-characters",
    label: "Characters",
    children: [
        vaiezzellThumb,
        iywralyxThumb,
    ],
});

const warp = new GalleryEntry({
    id: "warp",
    label: "Galactic noodles",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/warp"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const aheniru = new GalleryEntry({
    id: "aheniru",
    label: "What are you doing in the river...?",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/aheniru"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const amonnonza = new GalleryEntry({
    id: "amonnonza",
    label: "Nightgazer",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/amonnonza"],
    tags: [
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const snowsquall = new GalleryEntry({
    id: "snowsquall",
    label: "Ant problem",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/snowsquall"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.destruction,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const jinsym = new GalleryEntry({
    id: "jinsym",
    label: "Duskflight",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/jinsym"],
    tags: [
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const viscerall = new GalleryEntry({
    id: "viscerall",
    label: "Scrapyard?",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/vviiscerall"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.destruction,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const wwco = new GalleryEntry({
    id: "wwco",
    label: "Through size and space",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/wwco"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.destruction,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const tiffymew = new GalleryEntry({
    id: "tiffymew",
    label: "Midtown reading session",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/tiffymew"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.medium.animated,
        galleryTags.tools.blender,
    ],
});

const captainraven = new GalleryEntry({
    id: "captainraven",
    label: "Cave chase!",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/captainraven"],
    tags: [
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const rhaeloth = new GalleryEntry({
    id: "rhaeloth",
    label: "Who's this little critter?",
    image: generatedGalleryImages["gallery/art-fight-2026/attacks/rhaeloth"],
    tags: [
        galleryTags.medium.animated,
        galleryTags.tools.blender,
    ],
});

const artfight2026Attacks = new GalleryEntry({
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

const artfight2026 = new GalleryEntry({
    id: "artfight-2026",
    label: "Art Fight 2026",
    children: [
        artfight2026Characters,
        artfight2026Attacks,
    ],
});

const bookwyrmDgcCrossover = new GalleryEntry({
    id: "bookwyrm-dgc-crossover",
    label: "Bookwyrm DGC crossover",
    image: generatedGalleryImages["gallery/bookwyrm-dgc-crossover-1"],
    tags: [
        galleryTags.purpose.logo,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
    descriptionComponent: BookwyrmDgcCrossoverDescription,
});

const spaxDragon = new GalleryEntry({
    id: "spax-dragon",
    label: "Spax dragon",
    image: generatedGalleryImages["gallery/spax-dragon"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const dragnbratty = new GalleryEntry({
    id: "dragnbratty",
    label: "dragnbratty",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnbrattynew"],
    tags: [
        galleryTags.medium.vector,
        galleryTags.purpose.emoji,
        galleryTags.tools.inkscape,
    ],
});

const dragnmelting = new GalleryEntry({
    id: "dragnmelting",
    label: "dragnmelting",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnmeltingweak"],
    tags: [
        galleryTags.medium.vector,
        galleryTags.purpose.emoji,
        galleryTags.tools.inkscape,
    ],
});

const dragnskull = new GalleryEntry({
    id: "dragnskull",
    label: "dragnskull",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnskull"],
    tags: [
        galleryTags.medium.vector,
        galleryTags.purpose.emoji,
        galleryTags.tools.inkscape,
    ],
});

const dragnwinghug = new GalleryEntry({
    id: "dragnwinghug",
    label: "dragnwinghug",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/dragnwinghug"],
    tags: [
        galleryTags.medium.vector,
        galleryTags.purpose.emoji,
        galleryTags.tools.inkscape,
    ],
});

const zanayell = new GalleryEntry({
    id: "zanayell",
    label: "zanayell",
    image: generatedGalleryImages["gallery/vaie-dragn-emoji/zanayell"],
    tags: [
        galleryTags.medium.vector,
        galleryTags.purpose.emoji,
        galleryTags.tools.inkscape,
    ],
});

const vaieDragnEmoji = new GalleryEntry({
    id: "vaie-dragn-emoji",
    label: "vaie dragn emoji",
    children: [
        dragnbratty,
        dragnmelting,
        dragnskull,
        dragnwinghug,
        zanayell,
    ],
    tags: [
        galleryTags.purpose.emoji,
    ],
});

const pretBath = new GalleryEntry({
    id: "pret-bath",
    label: "Pret gamer bath",
    image: generatedGalleryImages["gallery/pretbath"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const bigAsha = new GalleryEntry({
    id: "big-asha",
    label: "Big Asha",
    image: generatedGalleryImages["gallery/bigasha"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.destruction,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const mawdelynRef = new GalleryEntry({
    id: "mawdelyn-ref",
    label: "Mawdelyn reference sheet",
    image: generatedGalleryImages["gallery/mawdelyn-ref"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.destruction,
        galleryTags.purpose.refsheet,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const wiresAirport = new GalleryEntry({
    id: "wires-airport",
    label: "wires airport",
    image: generatedGalleryImages["gallery/wires-airport"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.sizediff,
        galleryTags.subject.destruction,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const iywralyxRef = new GalleryEntry({
    id: "iywralyx-ref",
    label: "Iywralyx reference sheet",
    image: generatedGalleryImages["gallery/iywralyx"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.purpose.refsheet,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const anshuSit = new GalleryEntry({
    id: "anshu-sit",
    label: "Anshu sit",
    image: generatedGalleryImages["gallery/anshu-sit"],
    tags: [
        galleryTags.subject.sizediff,
        galleryTags.purpose.sketch,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const terskaylModeling = new GalleryEntry({
    id: "terskayl-modeling",
    label: "Terskayl modeling",
    image: generatedGalleryImages["gallery/terskayl-2"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const vaiezzellPfp2025 = new GalleryEntry({
    id: "vaiezzell-pfp-2025",
    label: "vaiezzell pfp 2025",
    image: generatedGalleryImages["gallery/vaiezzell-pfp-2025"],
    tags: [
        galleryTags.purpose.avatar,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const vaiezzellCircle = new GalleryEntry({
    id: "vaiezzell-circle",
    label: "vaiezzell circle pfp",
    image: generatedGalleryImages["gallery/vaiezzell-circle"],
    tags: [
        galleryTags.purpose.avatar,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.photoshop,
    ],
});

const silverStadium = new GalleryEntry({
    id: "silver-stadium",
    label: "Silver stadium",
    image: generatedGalleryImages["gallery/silver-vaie"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.sizediff,
        galleryTags.subject.destruction,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const jankmanBorzoi = new GalleryEntry({
    id: "jankman-borzoi",
    label: "Jankman with borzoi",
    image: generatedGalleryImages["gallery/jankman-borzoi"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const automaton = new GalleryEntry({
    id: "automaton",
    label: "Automaton dragon",
    image: generatedGalleryImages["gallery/dragonraffle/automaton"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const dragonInRuralMiddleAmerica = new GalleryEntry({
    id: "dragon-in-rural-middle-america",
    label: "Dragon in rural middle america",
    image: generatedGalleryImages["gallery/dragonraffle/dragon-in-rural-middle-america"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const dragonOnLawn = new GalleryEntry({
    id: "dragon-on-lawn",
    label: "Dragon on lawn",
    image: generatedGalleryImages["gallery/dragonraffle/dragon-on-lawn"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const spacefarer = new GalleryEntry({
    id: "spacefarer",
    label: "Spacefarer",
    image: generatedGalleryImages["gallery/dragonraffle/lexi"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const cherryBlossom = new GalleryEntry({
    id: "cherry-blossom",
    label: "Cherry blossom",
    image: generatedGalleryImages["gallery/dragonraffle/milli"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.sizediff,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const tradeOffer = new GalleryEntry({
    id: "trade-offer",
    label: "Trade offer",
    image: generatedGalleryImages["gallery/dragonraffle/nuts"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const unnickDragonKiss = new GalleryEntry({
    id: "unnick-dragon-kiss",
    label: "unnick dragon kiss",
    image: generatedGalleryImages["gallery/dragonraffle/unnick-dragon-kiss"],
    tags: [
        galleryTags.subject.macro,
        galleryTags.subject.sizediff,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const dragonraffle = new GalleryEntry({
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

const whoTheHellIsJankman = new GalleryEntry({
    id: "who-the-hell-is-jankman",
    label: "Who the hell is Jankman?",
    image: generatedGalleryImages["gallery/who-the-hell-is-jankman"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const zanawyrm = new GalleryEntry({
    id: "zanawyrm",
    label: "Zanawyrm",
    image: generatedGalleryImages["gallery/zanawyrm"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.krita,
    ],
});

const trainStation = new GalleryEntry({
    id: "train-station",
    label: "train station",
    image: generatedGalleryImages["gallery/terskayl-train-station-signed-vaiezzell"],
    tags: [
        galleryTags.subject.destruction,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.photoshop,
    ],
});

const coldLight = new GalleryEntry({
    id: "cold-light",
    label: "Cold light",
    image: generatedGalleryImages["gallery/just-gotta-ok-tired-of-ms-paint-now"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.photoshop,
    ],
});

const inSkylight = new GalleryEntry({
    id: "in-skylight",
    label: "In skylight",
    image: generatedGalleryImages["gallery/in-skylight"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const fruitThief = new GalleryEntry({
    id: "fruit-thief",
    label: "Fruit thief",
    image: generatedGalleryImages["gallery/linky-drinkf"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.photoshop,
    ],
});

const lounge = new GalleryEntry({
    id: "lounge",
    label: "Lounge",
    image: generatedGalleryImages["gallery/render-test"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const aquafrust = new GalleryEntry({
    id: "aquafrust",
    label: "Aquafrust",
    image: generatedGalleryImages["gallery/aquafrust"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const graffiti = new GalleryEntry({
    id: "graffiti",
    label: "The most stylish of breath weapons",
    image: generatedGalleryImages["gallery/graffiti"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const colors = new GalleryEntry({
    id: "colors",
    label: "Colors",
    image: generatedGalleryImages["gallery/colors"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
        galleryTags.tools.blender,
    ],
});

const deweyDoughball = new GalleryEntry({
    id: "dewey-doughball",
    label: "Dewey doughball",
    image: generatedGalleryImages["gallery/db"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const fireHydrant = new GalleryEntry({
    id: "fire-hydrant",
    label: "Fire hydran't",
    image: generatedGalleryImages["gallery/fh"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const pond = new GalleryEntry({
    id: "pond",
    label: "Pond",
    image: generatedGalleryImages["gallery/pondy"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const bulb = new GalleryEntry({
    id: "bulb",
    label: "Bulb",
    image: generatedGalleryImages["gallery/bulb/bulb"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const danceyDragon = new GalleryEntry({
    id: "dancey-dragon",
    label: "Dancey dragon",
    image: generatedGalleryImages["gallery/dancey"],
    tags: [
        galleryTags.medium.animated,
        galleryTags.tools.blender,
    ],
});

const nightFlight = new GalleryEntry({
    id: "night-flight",
    label: "Night flight",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/conkyf-alpha"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const studious = new GalleryEntry({
    id: "studious",
    label: "Studious",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/twf2ff"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
        galleryTags.tools.gimp,
    ],
});

const poweruser = new GalleryEntry({
    id: "poweruser",
    label: "Poweruser",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/drawmeadragon-p4rp"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const gust = new GalleryEntry({
    id: "gust",
    label: "Gust",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/gustf"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const hotelPrank = new GalleryEntry({
    id: "hotel-prank",
    label: "Hotel prank",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/poopyf-alpha"],
    tags: [
        galleryTags.subject.sizediff,
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const desktopPet = new GalleryEntry({
    id: "desktop-pet",
    label: "Desktop pet",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/epif"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const mushrooms = new GalleryEntry({
    id: "mushrooms",
    label: "Mushrooms",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/tocky2f-alpha"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const samcluster = new GalleryEntry({
    id: "samcluster",
    label: "Samcluster",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/samclusterf"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
        galleryTags.tools.gimp,
    ],
});

const matsubara = new GalleryEntry({
    id: "matsubara",
    label: "Matsubara",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/matsf"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const squareNoodle = new GalleryEntry({
    id: "square-noodle",
    label: "Square noodle",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/squaresquaref"],
    tags: [
        galleryTags.purpose.sketch,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const vanished = new GalleryEntry({
    id: "vanished",
    label: "Vanished",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/vanv"],
    tags: [
        galleryTags.purpose.sketch,
        galleryTags.medium.raster,
        galleryTags.tools.gimp,
    ],
});

const banana = new GalleryEntry({
    id: "banana",
    label: "banana",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/bananaf"],
    tags: [
        galleryTags.purpose.sketch,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const sampcane = new GalleryEntry({
    id: "sampcane",
    label: "Sampcane",
    image: generatedGalleryImages["gallery/discord-bio-easter-egg/sampcanef"],
    tags: [
        galleryTags.purpose.sketch,
        galleryTags.medium.raster,
        galleryTags.tools.mspaint,
    ],
});

const discordBioEasterEgg = new GalleryEntry({
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

const poolToys = new GalleryEntry({
    id: "pool-toys",
    label: "Pool toys",
    image: generatedGalleryImages["gallery/swimmy"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.firealpaca,
    ],
});

const floatyZane = new GalleryEntry({
    id: "floaty-zane",
    label: "Floaty Zane",
    image: generatedGalleryImages["gallery/zaneb"],
    tags: [
        galleryTags.purpose.illustration,
        galleryTags.medium.raster,
        galleryTags.tools.firealpaca,
    ],
});

export const galleryEntries = {
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

export const entryParents = new Map<GalleryEntry, GalleryEntry | null>(Object.values(galleryEntries).map(work => [work, null]));
for (const entry of Object.values(galleryEntries)) {
    for (const childEntry of entry.children) {
        entryParents.set(childEntry, entry);
    }
}