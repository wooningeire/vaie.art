import { error } from "@sveltejs/kit";
import { galleryEntries } from "$/gallery/entries-data/entries";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    if (!Object.hasOwn(galleryEntries, params.entryId)) {
        error(404, "Work doesn't exist");
    }

    return {
        entryId: params.entryId,
    };
};
