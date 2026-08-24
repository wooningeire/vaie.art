export class GalleryTag {
    readonly path: string[];
    readonly label: string;

    constructor({
        path,
        label,
    }: {
        path: string[],
        label: string,
    }) {
        this.path = path;
        this.label = label;
    }
}

export const galleryMediums = {
    webSpa: new GalleryTag({label: "Web SPA"}),
    illustration2d: new GalleryTag({label: "2D illustration"}),
};

type GalleryTagTree<Leaf, Structure extends GalleryTagTree<Leaf, any> | Leaf> = Structure extends Leaf ? Leaf : {
    [key in keyof Structure]: GalleryTagTree<Leaf, Structure[key]>
};


const currentPath: string[] = [];
const processTags = <Structure extends GalleryTagTree<Leaf, any>>(tagTree: GalleryTagTree<string, Structure>): GalleryTagTree<GalleryTag, Structure> => {
    const tags: GalleryTagTree<GalleryTag, any> = {};

    for (const [key, value] of Object.entries(tagTree)) {
        if (typeof value === "string") {
            tags[key] = new GalleryTag({
                path: [...currentPath, key],
                label: value,
            });
        } else {
            currentPath.push(key);
            tags[key] = processTags(value);
            currentPath.pop();
        }
    }

    return tags as GalleryTagTree<GalleryTag, Structure>;
};

export const galleryTagTree = processTags({
    medium: {
        webSpa: "Web SPA",
        illustration: "Illustration",
    },
});