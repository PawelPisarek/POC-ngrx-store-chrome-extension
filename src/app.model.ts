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
    text: string;
    colour: string;
    left: number;
    top: number;
    id: string;
    dirty: boolean;
}