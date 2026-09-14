import { error } from "@sveltejs/kit";
import { workEntries } from "$/gallery-models/galleryProjectList";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    if (!Object.hasOwn(workEntries, params.entryId)) {
        error(404, "Work doesn't exist");
    }

    return {
        entryId: params.entryId,
    };
};
