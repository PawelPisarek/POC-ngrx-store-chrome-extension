"use strict";
var NoteModel = (function () {
    function NoteModel(text, colour, left, top, id, dirty) {
        this.text = text;
        this.colour = colour;
        this.left = left;
        this.top = top;
        this.id = id;
        this.dirty = dirty;
    }
    return NoteModel;
}());
exports.NoteModel = NoteModel;
//# sourceMappingURL=app.model.js.map