export interface Note {
    text: string,
    colour: string,
    left: number,
    top: number,
    id: string,
    dirty: boolean
}

export interface AppState {
    notes: Note[];
}

export class NoteModel {
    constructor(public text: string,
                public colour: string,
                public left: number,
                public top: number,
                public id: string,
                public dirty: boolean) {
    }
}