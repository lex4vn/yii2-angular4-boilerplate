import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './global.service';
import {StaffService} from './staff.service';
import {Note} from './note';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class NoteDataService {

  constructor(private _globalService:GlobalService,
              private _staffService:StaffService,
              private _authHttp: AuthHttp){
  }

  // POST /v1/note
  addNote(note:Note):Observable<any>{
    let headers = this.getHeaders();

    return this._authHttp.post(
            this._globalService.apiHost+'/note',
        JSON.stringify(note),
        {
          headers: headers
        }
        )
        .map(response => response.json())
        .map((response) => {
          return response;
        })
        .catch(this.handleError);
  }

  // DELETE /v1/note/1
  deleteNoteById(id:number):Observable<boolean>{
    let headers = this.getHeaders();

    return this._authHttp.delete(
            this._globalService.apiHost+'/note/'+id,
        {
          headers: headers
        }
        )
        .map(response => response.json())
        .map((response) => {
          return response;
        })
        .catch(this.handleError);
  }

  // PUT /v1/note/1
  updateNoteById(note: Note):Observable<any>{
    let headers = this.getHeaders();

    return this._authHttp.put(
            this._globalService.apiHost+'/note/'+note.id,
        JSON.stringify(note),
        {
          headers: headers
        }
        )
        .map(response => response.json())
        .map((response) => {
          return response;
        })
        .catch(this.handleError);
  }

  private getHeaders():Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this._staffService.getToken(),
    });
  }
  // GET /v1/note/notes
  getAllNotes(): Observable<Note[]> {
    let headers = this.getHeaders();

    return this._authHttp.get(
            this._globalService.apiHost+'/note',
        {
          headers: headers
        }
        )
        .map(response => response.json())
        .map((response) => {
          return <Note[]>response.data;
        })
        .catch(this.handleError);
  }

  // GET /v1/note/1
  getNoteById(id:number):Observable<Note> {
    let headers = this.getHeaders();

    return this._authHttp.get(
            this._globalService.apiHost+'/note/'+id,
        {
          headers: headers
        }
        )
        .map(response => response.json())
        .map((response) => {
          return <Note>response.data;
        })
        .catch(this.handleError);
  }


  private handleError (error: Response | any) {

    let errorMessage:any = {};
    // Connection error
    if(error.status == 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: "Sorry, there was a connection error occurred. Please try again.",
      };
    }
    else {
      errorMessage = error.json();
    }
    return Observable.throw(errorMessage);
  }

  public static getStatusTypes():Array<any>{
    return [
      {
        label: 'Hoạt động',
        value: 10
      },
      {
        label: 'Tắt',
        value: 0
      }
    ];
  }
    public static getTeachers():Array<any>{
        return [
            {
                label: 'Cô Trang',
                value: 1
            },
            {
                label: 'Cô Ly',
                value: 2
            }
        ];
    }

    public static getSchedules():Array<any>{
        return [
            {
                label: 'Schedule 1',
                value: 1
            },
            {
                label: 'Schedule 2',
                value: 2
            }
        ];
    }
    public static getKids():Array<any>{
        return [
            {
                label: 'Tuấn Kiệt',
                value: 1
            },
            {
                label: 'Anh Minh',
                value: 2
            }
        ];
    }

    public getAllTeachers():Observable<Array<any>>{
        let headers = this.getHeaders();

        return this._authHttp.get(
                this._globalService.apiHost+'/teacher/list',
            {
                headers: headers
            }
            )
            .map(response => response.json())
            .map((response) => {
                return response.data;
            })
            .catch(this.handleError);
    }

    public getAllSchedules():Observable<Array<any>>{
        let headers = this.getHeaders();

        return this._authHttp.get(
                this._globalService.apiHost+'/schedule/schedules',
            {
                headers: headers
            }
            )
            .map(response => response.json())
            .map((response) => {
                return response.data;
            })
            .catch(this.handleError);
    }
}
