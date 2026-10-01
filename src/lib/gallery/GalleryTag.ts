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
    medium: {
        web: new GalleryTag({id: "medium.web", label: "web"}),
        illustration: new GalleryTag({id: "medium.illustration", label: "illustration"}),
        animated: new GalleryTag({id: "medium.animated", label: "animated"}),
    },

    subject: {
        macro: new GalleryTag({id: "subject.macro", label: "macro"}),
        destruction: new GalleryTag({id: "subject.destruction", label: "destruction"}),
    },

    tools: {
        blender: new GalleryTag({id: "tools.blender", label: "Blender"}),
        krita: new GalleryTag({id: "tools.krita", label: "Krita"}),
        photoshop: new GalleryTag({id: "tools.photoshop", label: "Photoshop"}),
        mspaint: new GalleryTag({id: "tools.mspaint", label: "MS Paint"}),
        drawception: new GalleryTag({id: "tools.drawception", label: "Drawception"}),
        inkscape: new GalleryTag({id: "tools.inkscape", label: "Inkscape"}),
    },
};
