export type GalleryImageAsset = {
    src: string,
    width: number,
    height: number,
};

export type GeneratedGalleryImage = {
    display: GalleryImageAsset,
    thumb: GalleryImageAsset,
};

export type GalleryImage = GeneratedGalleryImage & {
    alt: string,
};
