import {Injectable} from '@angular/core';
import * as moment from "moment";
import {environment} from '../../environments/environment';


@Injectable()
export class GlobalService{
    public apiHost:string;
    public baseUrl:string;

    public setting:any = {};

    constructor(){
        if(environment.production == true) {
            this.apiHost = 'http://avengerapp.com/v1';
            this.baseUrl = 'http://avengerapp.com/';
        } else {
            //this.apiHost = 'http://localhost/kidschool/api/web/v1';
            //this.baseUrl = 'http://localhost/kidschool/api/web/';
            this.apiHost = 'http://avengerapp.com/v1';
            this.baseUrl = 'http://avengerapp.com/';
        }
    }

    loadGlobalSettingsFromLocalStorage():void{
        if(localStorage.getItem('backend-setting') != null){
            this.setting = JSON.parse(localStorage.getItem('backend-setting'));
        }

    }
}