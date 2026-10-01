import { GalleryEntry } from "$/gallery/GalleryEntry";
import { galleryTags } from "$/gallery/galleryTags";
import { image } from "./image.generated";

export const pudle = new GalleryEntry({
    id: "pudle",
    label: "Pudle",
    href: "/pudle",
    image,
    tags: [galleryTags.medium.web],
    external: true,
});