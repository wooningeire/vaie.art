export type GalleryEntryImageAsset = {
    src: string,
    width: number,
    height: number,
};

export type GalleryEntryImageVariants = {
    full: GalleryEntryImageAsset,
    preview: GalleryEntryImageAsset,
    thumb: GalleryEntryImageAsset,
};