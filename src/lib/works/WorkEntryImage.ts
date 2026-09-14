export type WorkEntryImageAsset = {
    src: string,
    width: number,
    height: number,
};

export type WorkEntryImageVariants = {
    full: WorkEntryImageAsset,
    preview: WorkEntryImageAsset,
    thumb: WorkEntryImageAsset,
};