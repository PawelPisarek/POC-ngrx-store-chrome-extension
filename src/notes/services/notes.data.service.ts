import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

import {Note, NoteModel} from '../../app.model';

@Injectable()
export class NotesDataService {
    private API_ROOT: String = "http://localhost:3000";
    private JSON_HEADER = {headers: new Headers({'Content-Type': 'application/json'})};

    constructor(public http: Http, @Inject(Window) private _window: Window) {
    }

    dataSource = new Subject<Note[]>();
    langMobile$ = this.dataSource.asObservable();

    getNotes(): Observable<Array<Note>> {

        this.dataSource.next(this.getNotes2());
        return this.langMobile$

            .map((response) => response);
    }

    addOrUpdateNote(note: Note): Observable<Note> {
        console.log("tutaj jest ta notatka", note);

        return this.http.post(`${this.API_ROOT}/notes`, JSON.stringify(note), this.JSON_HEADER)
            .map((response: Response) => response.json())
    }

    list = [];

    getNotes2() {
        Visualforce.remoting.Manager.invokeAction(getNotes,
            (result, event) => {
                if (event.status) {
                    var parsedJson = JSON.parse(result);
                    console.log(parsedJson);
                    parsedJson.forEach(data=> {

                        let exp = new NoteModel();
                        this.list.push(exp);

                    });
                    console.log(this.list, 'asdsd');
                } else if (event.type === 'exception') {
                    console.log('exception');
                } else {

                }
            }, {escape: false})
        return this.list;
    }


}
