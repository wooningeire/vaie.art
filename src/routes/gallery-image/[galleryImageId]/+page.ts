import { error } from "@sveltejs/kit";
import {
    getGalleryImagePage,
    getGalleryImagePageIds,
} from "$/gallery-models/GalleryImagePage";
import { galleryImageHrefOf } from "$/gallery-models/GalleryImageRoute";
import type { EntryGenerator, PageLoad } from "./$types";

const siteOrigin = "https://vaie.art";

const toAbsoluteUrl = (path: string) => new URL(path, siteOrigin).href;

export const entries: EntryGenerator = () => getGalleryImagePageIds()
    .map(galleryImageId => ({ galleryImageId }));

export const load: PageLoad = ({ params }) => {
    const page = getGalleryImagePage(params.galleryImageId);

    if (page === null) {
        error(404, "Gallery image not found");
    }

    const title = page.label;
    const description = `${title} by vaiezzell`;

    return {
        title,
        description,
        canonicalUrl: toAbsoluteUrl(galleryImageHrefOf(params.galleryImageId)),
        image: page.image,
        imageUrl: toAbsoluteUrl(page.image.display.src),
    };
};
