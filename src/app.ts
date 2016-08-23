import {Component} from '@angular/core';
import {MdAnchor, MdButton} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {StoreLogMonitorComponent} from '@ngrx/store-log-monitor';

@Component({
  selector: 'app',
  directives: [
    MdAnchor,
    MdButton,
    MdToolbar,
    MD_SIDENAV_DIRECTIVES,
    MdIcon,
    MD_LIST_DIRECTIVES,
    StoreLogMonitorComponent
  ],
  providers: [MdIconRegistry],
  template: `
    
      <router-outlet></router-outlet>


    <ngrx-store-log-monitor toggleCommand="ctrl-t"></ngrx-store-log-monitor>
  `
})
export default class App {
}
