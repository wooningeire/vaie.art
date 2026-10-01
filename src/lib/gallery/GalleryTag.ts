export class GalleryTag {
    readonly id: string;
    readonly label: string;
    
    constructor({
        id,
        label,
    }: {
        id: string,
        label: string,
    }) {
        this.id = id;
        this.label = label;
    }
}

export const galleryTags = {
    subject: {
        macro: new GalleryTag({id: "subject.macro", label: "macro"}),
        sizediff: new GalleryTag({id: "subject.sizediff", label: "sizediff"}),
        destruction: new GalleryTag({id: "subject.destruction", label: "destruction"}),
    },

    purpose: {
        emoji: new GalleryTag({id: "purpose.emoji", label: "emoji"}),
        refsheet: new GalleryTag({id: "purpose.refsheet", label: "refsheet"}),
        logo: new GalleryTag({id: "purpose.logo", label: "logo"}),
        avatar: new GalleryTag({id: "purpose.avatar", label: "avatar"}),
        illustration: new GalleryTag({id: "purpose.illustration", label: "illustration"}),
        sketch: new GalleryTag({id: "purpose.sketch", label: "sketch"}),
        thumbnail: new GalleryTag({id: "purpose.thumbnail", label: "thumbnail"}),
    },

    medium: {
        web: new GalleryTag({id: "medium.web", label: "web"}),
        raster: new GalleryTag({id: "medium.raster", label: "raster"}),
        animated: new GalleryTag({id: "medium.animated", label: "animated"}),
        vector: new GalleryTag({id: "medium.vector", label: "vector"}),
    },

    tools: {
        blender: new GalleryTag({id: "tools.blender", label: "Blender"}),
        krita: new GalleryTag({id: "tools.krita", label: "Krita"}),
        gimp: new GalleryTag({id: "tools.gimp", label: "GIMP"}),
        photoshop: new GalleryTag({id: "tools.photoshop", label: "Photoshop"}),
        mspaint: new GalleryTag({id: "tools.mspaint", label: "MS Paint"}),
        drawception: new GalleryTag({id: "tools.drawception", label: "Drawception"}),
        inkscape: new GalleryTag({id: "tools.inkscape", label: "Inkscape"}),
        firealpaca: new GalleryTag({id: "tools.firealpaca", label: "FireAlpaca"})
    },
};
