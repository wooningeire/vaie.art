export class GalleryMedium {
    readonly label: string;

    constructor({
        label,
    }: {
        label: string,
    }) {
        this.label = label;
    }
}

export const galleryMediums = {
    webSpa: new GalleryMedium({label: "Web SPA"}),
    illustration2d: new GalleryMedium({label: "2D illustration"}),
};

const galleryTags = {
    medium: {
        webSpa: "Web SPA",
        illustration: "Illustration",
    },
};