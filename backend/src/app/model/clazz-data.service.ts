import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './global.service';
import {StaffService} from './staff.service';
import {User} from './user';
import {Clazz} from './clazz';
import {AuthHttp} from 'angular2-jwt';


@Injectable()
export class ClazzDataService {

    constructor(private _globalService:GlobalService,
                private _staffService:StaffService,
                private _authHttp: AuthHttp){
    }

    // POST /v1/clazz
    addClazz(clazz:Clazz):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.post(
            this._globalService.apiHost+'/clazz',
            JSON.stringify(clazz),
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

    // DELETE /v1/clazz/1
    deleteClazzById(id:number):Observable<boolean>{
        let headers = this.getHeaders();

        return this._authHttp.delete(
            this._globalService.apiHost+'/clazz/'+id,
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

    // PUT /v1/clazz/1
    updateClazzById(clazz:Clazz):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.put(
            this._globalService.apiHost+'/clazz/'+clazz.id,
            JSON.stringify(clazz),
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
    // GET /v1/clazz
    getAllClazzes(): Observable<Clazz[]> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/clazz?sort=-id',
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Clazz[]>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/clazz/1
    getClazzById(id:number):Observable<Clazz> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/clazz/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Clazz>response.data;
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
}
