export type GalleryImageAsset = {
    src: string,
    width: number,
    height: number,
};

export type GeneratedGalleryImage = {
    full: GalleryImageAsset,
    preview: GalleryImageAsset,
    thumb: GalleryImageAsset,
};

export type GalleryImage = GeneratedGalleryImage & {
    alt: string,
};
