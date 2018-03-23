import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {TeacherService} from './teacher.service';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

    constructor(private _teacherService:TeacherService, private _router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        let url:string = state.url;
        //const expectedRole = route.data.expectedRole;
        //console.log(expectedRole);
        return this.checkLogin(url);
    }

    canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url:string):boolean {


        //console.log(tokenPayload.data.roleLabel);
       // if (this._teacherService.isLoggedIn()) {
            const tokenPayload = this._teacherService.getJWTValue();
            console.log(tokenPayload);
            if('Administrator' == tokenPayload.data.roleLabel){
                //this._router.navigate(['/giao-vien'], {queryParams: {r: url}});
                return false;
            }
            //if (expectedRole == tokenPayload.data.roleLabel) {
            //    return true;
            //}
       // }

        // Store the attempted URL for redirecting
        //this._teacherService.redirectURL = url;

        // Navigate to the login page with extras
        //this._router.navigate(['/login'], {queryParams: {r: url}});
        return true;
    }
}