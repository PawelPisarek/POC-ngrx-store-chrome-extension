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

    list;

    doNext() {

        this.getNotes2().then(notes=> {
            this.list = notes;
        });
    }

    getNotes(): Observable<Array<Note>> {
        this.dataSource.next(this.list); //stworzenie observable z rpc
        return this.langMobile$

            .map((response) => response);
    }

    addOrUpdateNote(note: Note): Observable<Note> {
        console.log("tutaj jest ta notatka", JSON.stringify(note));

        if (note.id == '123123') {
            this.postNotes2(note);
        } else {
            console.log("ta funkca powinna wykonać sie raz ale się nie wykonuje");
            this.editNote(note);
        }
        let dataSource = new Subject<Note>();
        let langMobile$ = dataSource.asObservable();
        return langMobile$;
        // return this.http.post(`${this.API_ROOT}/notes`, JSON.stringify(note), this.JSON_HEADER)
        //     .map((response: Response) => response.json())
    }


    postNotes2(data) {
        let newMessage = this._window.createNote;
        var jsonString = JSON.stringify(data);
        Visualforce.remoting.Manager.invokeAction(newMessage, jsonString,
            (result, event) => {
                if (event.status) {
                    // this.expensesAdded.emit(0);
                } else if (event.type === 'exception') {

                    console.log('Exception in Submitting Data');

                } else {
                    console.log('General Exception');

                }
            })
    }

    editNote(data) {
        let newMessage = this._window.editNote;
        var jsonString = JSON.stringify(data);
        Visualforce.remoting.Manager.invokeAction(newMessage, jsonString,
            (result, event) => {
                if (event.status) {
                    // this.expensesAdded.emit(0);
                } else if (event.type === 'exception') {

                    console.log('Exception in Submitting Data');

                } else {
                    console.log('General Exception');

                }
            })
    }

    getNotes2() {
        return new Promise((res, rej)=> {
            let list = []
            Visualforce.remoting.Manager.invokeAction(getNotes,
                (result, event) => {
                    if (event.status) {
                        let parsedJson = JSON.parse(result);
                        parsedJson.forEach(data => {


                            let exp = new NoteModel(data.tekst__c, data.colour__c, data.left__c, data.top__c, data.Id, false);
                            list.push(exp);

                        });
                        res(list);
                    } else if (event.type === 'exception') {
                        console.log('exception');
                    } else {

                    }
                }, {escape: false})
            return list;
        });


    }


}
