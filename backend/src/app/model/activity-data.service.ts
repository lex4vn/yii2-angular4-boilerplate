import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './global.service';
import {StaffService} from './staff.service';
import {Activity} from './activity';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ActivityDataService {

    constructor(private _globalService:GlobalService,
                private _staffService:StaffService,
                private _authHttp: AuthHttp){
    }

    // POST /v1/activity
    addActivity(activity:Activity):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.post(
            this._globalService.apiHost+'/activity',
            JSON.stringify(activity),
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

    // DELETE /v1/activity/1
    deleteActivityById(id:number):Observable<boolean>{
        let headers = this.getHeaders();

        return this._authHttp.delete(
            this._globalService.apiHost+'/activity/'+id,
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

    // PUT /v1/activity/1
    updateActivityById(activity: Activity):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.put(
            this._globalService.apiHost+'/activity/'+activity.id,
            JSON.stringify(activity),
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
    // GET /v1/activity/activities
    getAllActivities(): Observable<Activity[]> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/activity/activities',
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Activity[]>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/activity/1
    getActivityById(id:number):Observable<Activity> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/activity/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Activity>response.data;
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
                value: 10
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
