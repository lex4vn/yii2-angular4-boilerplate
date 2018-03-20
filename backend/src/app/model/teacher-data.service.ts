import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './global.service';
import {StaffService} from "../model/staff.service";
import {Teacher} from './teacher';
import {AuthHttp} from 'angular2-jwt';


@Injectable()
export class TeacherDataService {

    constructor(private _globalService:GlobalService,
                private _staffService:StaffService,
                private _authHttp: AuthHttp){
    }

    // POST /v1/teacher
    addTeacher(teacher:Teacher):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.post(
            this._globalService.apiHost+'/teacher',
            JSON.stringify(teacher),
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

    // DELETE /v1/teacher/1
    deleteTeacherById(id:number):Observable<boolean>{
        let headers = this.getHeaders();

        return this._authHttp.delete(
            this._globalService.apiHost+'/teacher/'+id,
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

    // PUT /v1/teacher/1
    updateTeacherById(teacher:Teacher):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.put(
            this._globalService.apiHost+'/teacher/'+teacher.id,
            JSON.stringify(teacher),
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
    // GET /v1/teacher/list
    getAllTeachers(): Observable<Teacher[]> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/teacher/list?sort=-id',
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Teacher[]>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/teacher/1
    getTeacherById(id:number):Observable<Teacher> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/teacher/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Teacher>response.data;
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
                label: 'Waiting Confirmation',
                value: 1
            },
            {
                label: 'Tắt',
                value: 0
            }
        ];
    }

    public static getRoleTypes():Array<any>{
        return [
            {
                label: 'Giáo viên',
                value: 50
            }
        ];
    }


    public getPermissionTypes():Observable<Array<any>>{
        let headers = this.getHeaders();

        return this._authHttp.get(
           this._globalService.apiHost+'/teacher/get-permissions',
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
