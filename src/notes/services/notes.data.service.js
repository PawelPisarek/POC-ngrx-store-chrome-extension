"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var rxjs_1 = require('rxjs');
require('rxjs/add/operator/map');
require('rxjs/add/observable/from');
var app_model_1 = require('../../app.model');
var NotesDataService = (function () {
    function NotesDataService(http, _window) {
        this.http = http;
        this._window = _window;
        this.API_ROOT = "http://localhost:3000";
        this.JSON_HEADER = { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) };
        this.dataSource = new rxjs_1.Subject();
        this.langMobile$ = this.dataSource.asObservable();
        this.list = [];
    }
    NotesDataService.prototype.doNext = function () {
        var _this = this;
        this.getNotes2().then(function (cos) {
            _this.list = cos;
            console.log(_this.list, 'to jest puste');
        });
    };
    NotesDataService.prototype.getNotes = function () {
        console.log(this.list, 'to jest to czego szukam');
        this.dataSource.next(this.list);
        return this.langMobile$
            .map(function (response) { return response; });
    };
    NotesDataService.prototype.addOrUpdateNote = function (note) {
        console.log("tutaj jest ta notatka", JSON.stringify(note));
        if (note.id == '123123') {
            this.postNotes2(note);
        }
        var dataSource = new rxjs_1.Subject();
        var langMobile$ = dataSource.asObservable();
        return langMobile$;
        // return this.http.post(`${this.API_ROOT}/notes`, JSON.stringify(note), this.JSON_HEADER)
        //     .map((response: Response) => response.json())
    };
    NotesDataService.prototype.postNotes2 = function (data) {
        var newMessage = this._window.createNote;
        var jsonString = JSON.stringify(data);
        Visualforce.remoting.Manager.invokeAction(newMessage, jsonString, function (result, event) {
            if (event.status) {
            }
            else if (event.type === 'exception') {
                console.log('Exception in Submitting Data');
            }
            else {
                console.log('General Exception');
            }
        });
    };
    NotesDataService.prototype.getNotes2 = function () {
        return new Promise(function (res, rej) {
            var list = [];
            Visualforce.remoting.Manager.invokeAction(getNotes, function (result, event) {
                if (event.status) {
                    var parsedJson = JSON.parse(result);
                    console.log(parsedJson);
                    parsedJson.forEach(function (data) {
                        var exp = new app_model_1.NoteModel(data.colour__c, data.colour__c, data.left__c, data.top__c, data.Id, false);
                        list.push(exp);
                    });
                    console.log(list, 'asdsd');
                    res(list);
                }
                else if (event.type === 'exception') {
                    console.log('exception');
                }
                else {
                }
            }, { escape: false });
            return list;
        });
    };
    NotesDataService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(Window))
    ], NotesDataService);
    return NotesDataService;
}());
exports.NotesDataService = NotesDataService;
//# sourceMappingURL=notes.data.service.js.map