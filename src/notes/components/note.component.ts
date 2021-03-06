import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Draggable } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-note',
  template: require('./note.component.html'),
  styles: [ require('./note.component.css')],
  directives: [Draggable, NgClass]
})
export class NoteComponent {
  @Input() text: string;
  @Input() top: number;
  @Input() left: number;
  @Input() colour: string;
  @Input() disabled: boolean;

  @Output() changeNoteText = new EventEmitter(false);
  @Output() changeNotePosition = new EventEmitter(false);

  constructor() {}

  handleChangeNotePosition(newPosition){
    if(newPosition.left != this.left || newPosition.top != this.top){
      this.changeNotePosition.emit(newPosition)
    }
  }
  handleChangeNoteText(text){
    if(text != this.text){
      this.changeNoteText.emit(text)
    }
  }
}
