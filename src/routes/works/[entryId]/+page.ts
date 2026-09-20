import { error } from "@sveltejs/kit";
import { workEntries } from "$/works/entries-data/entries";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    if (!Object.hasOwn(workEntries, params.entryId)) {
        error(404, "Work doesn't exist");
    }

    return {
        entryId: params.entryId,
    };
};
