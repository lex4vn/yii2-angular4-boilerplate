import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './global.service';
import {StaffService} from './staff.service';
import {Event} from './event';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class EventDataService {

  constructor(private _globalService:GlobalService,
              private _staffService:StaffService,
              private _authHttp: AuthHttp){
  }

  // POST /v1/event
  addEvent(event:Event):Observable<any>{
    let headers = this.getHeaders();

    return this._authHttp.post(
            this._globalService.apiHost+'/event',
        JSON.stringify(event),
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

  // DELETE /v1/event/1
  deleteEventById(id:number):Observable<boolean>{
    let headers = this.getHeaders();

    return this._authHttp.delete(
            this._globalService.apiHost+'/event/'+id,
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

  // PUT /v1/event/1
  updateEventById(event: Event):Observable<any>{
    let headers = this.getHeaders();

    return this._authHttp.put(
            this._globalService.apiHost+'/event/'+event.id,
        JSON.stringify(event),
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
  // GET /v1/event/events
  getAllEvents(): Observable<Event[]> {
    let headers = this.getHeaders();

    return this._authHttp.get(
            this._globalService.apiHost+'/event/events',
        {
          headers: headers
        }
        )
        .map(response => response.json())
        .map((response) => {
          return <Event[]>response.data;
        })
        .catch(this.handleError);
  }

  // GET /v1/event/1
  getEventById(id:number):Observable<Event> {
    let headers = this.getHeaders();

    return this._authHttp.get(
            this._globalService.apiHost+'/event/'+id,
        {
          headers: headers
        }
        )
        .map(response => response.json())
        .map((response) => {
          return <Event>response.data;
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
        label: 'Active',
        value: 1
      },
      {
        label: 'Disabled',
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

    public static getSchools():Array<any>{
        return [
            {
                label: 'Kid smart',
                value: 1
            },
            {
                label: 'FPT',
                value: 2
            }
        ];
    }

    public static getClazzes():Array<any>{
        return [
            {
                label: 'Donal1',
                value: 1
            },
            {
                label: 'Donal2',
                value: 2
            }
        ];
    }
}
