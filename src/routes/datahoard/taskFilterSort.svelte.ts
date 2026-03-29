import type { Task } from "$lib/pb";

export class TaskFilterSort {
    filterArchive = $state("active");
    sortBy = $state("created");
    sortDesc = $state(true);

    isVisible = (t: Task) => {
        if (this.filterArchive === "active") return !t.archive;
        if (this.filterArchive === "archived") return t.archive;
        return true;
    };

    processTasks = (tasks: Task[]) => {
        let result = tasks.filter(this.isVisible);

        result.sort((a, b) => {
            let valA: any;
            let valB: any;

            if (this.sortBy === "priority") {
                valA = a.expand?.priority?.value ?? Number.MAX_SAFE_INTEGER;
                valB = b.expand?.priority?.value ?? Number.MAX_SAFE_INTEGER;
            } else if (this.sortBy === "target_due") {
                valA = a.target_due ? new Date(a.target_due).getTime() : Number.MAX_SAFE_INTEGER;
                valB = b.target_due ? new Date(b.target_due).getTime() : Number.MAX_SAFE_INTEGER;
            } else if (this.sortBy === "hard_due") {
                valA = a.hard_due ? new Date(a.hard_due).getTime() : Number.MAX_SAFE_INTEGER;
                valB = b.hard_due ? new Date(b.hard_due).getTime() : Number.MAX_SAFE_INTEGER;
            } else {
                valA = new Date(a.created).getTime();
                valB = new Date(b.created).getTime();
            }

            if (valA < valB) return this.sortDesc ? 1 : -1;
            if (valA > valB) return this.sortDesc ? -1 : 1;
            
            const createA = new Date(a.created).getTime();
            const createB = new Date(b.created).getTime();
            return this.sortDesc ? (createB - createA) : (createA - createB);
        });

        return result;
    };
}
