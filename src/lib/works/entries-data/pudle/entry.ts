import { WorkEntry } from "$/works/WorkEntry";
import { workTags } from "$/works/workTags";
import { image } from "./image.generated";

export const pudle = new WorkEntry({
    id: "pudle",
    label: "Pudle",
    href: "/pudle",
    image,
    tags: [workTags.medium.web],
    external: true,
});