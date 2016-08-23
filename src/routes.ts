import { RouterConfig } from '@angular/router';


import {NotesComponent} from "./notes/components/notes.component";

const routes: RouterConfig = [
  {
    path: '',
    component: NotesComponent
  }
];

export default routes;
