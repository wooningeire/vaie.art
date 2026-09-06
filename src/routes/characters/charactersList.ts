export class Character {
    label: string;

    constructor({
        label,
    }: {
        label: string,
    }) {
        this.label = label;
    }
}

export const characters = {
    vaiezzell: new Character({
        label: "vaiezzell",
    }),

    iywralyx: new Character({
        label: "Iywralyx",
    }),
};