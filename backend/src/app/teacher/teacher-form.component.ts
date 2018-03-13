import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CustomValidators} from 'ng2-validation';
import {ContainsValidators} from "../shared/contains-validator.directive";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";


import {TeacherDataService} from "../model/teacher-data.service";
import {Teacher} from "../model/teacher";
import {TeacherService} from "../model/teacher.service";

import * as moment from "moment";
import * as _ from "underscore";

@Component({
    templateUrl: './teacher-form.component.html',
})
export class TeacherFormComponent implements OnInit, OnDestroy{
    private _mode = '';

    private _id:number;
    private _parameters:any;
    private _teacher:Teacher;

    private _errorMessage:string;

    private _form:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;

    // Status Types
    private _statusTypes:any = {};

    // Roles
    private _roleTypes:any = {};

    constructor(private _teacherDataService:TeacherDataService,
                private _teacherService:TeacherService,
                private _router:Router,
                private _activatedRoute:ActivatedRoute,
                private _formBuilder:FormBuilder) {

        // Construct form group
        this._form = _formBuilder.group({
            username: ['', Validators.compose([
                Validators.required,
                CustomValidators.rangeLength([3, 15]),
                Validators.pattern('^[A-Za-z0-9_-]{3,15}$'),
            ])],
            email: ['', Validators.compose([
                Validators.required,
                CustomValidators.email,
            ])],
            password: ['', Validators.compose([
                Validators.minLength(6)
            ])],
            confirmed_at: ['', Validators.compose([])],
            blocked_at: ['', Validators.compose([])],
            role: ['', Validators.compose([
                Validators.required,
                ContainsValidators.contains('value', TeacherDataService.getRoleTypes())
            ])],
            // permissions: _formBuilder.array([]),
            permissions: ['', Validators.compose([

            ])],
            status: ['', Validators.compose([
                Validators.required,
                // Custom validator for checking value against list of values
                ContainsValidators.contains('value', TeacherDataService.getStatusTypes())
            ])],
        }, {
            validator: validateDateTime(['confirmed_at', 'blocked_at'])
        });

        this._statusTypes = TeacherDataService.getStatusTypes();
        this._roleTypes = TeacherDataService.getRoleTypes();

        this._form.valueChanges
            .subscribe(data => this.onValueChanged(data));

    }

    private _setFormErrors(errorFields:any):void{
        for (let key in errorFields) {
            let errorField = errorFields[key];
            // skip loop if the property is from prototype
            if (!this._formErrors.hasOwnProperty(key)) continue;

            // let message = errorFields[error.field];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = errorField;
        }
    }

    private _resetFormErrors():void{
        this._formErrors = {
            username: {valid: true, message: ''},
            email: {valid: true, message: ''},
            password: {valid: true, message: ''},
            confirmed_at: {valid: true, message: ''},
            blocked_at: {valid: true, message: ''},
            role: {valid: true, message: ''},
            permissions: {valid: true, message: ''},
            status: {valid: true, message: ''},

        };
    }

    private _isValid(field):boolean {
        let isValid:boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if(this._form.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if(this._form.controls[field].touched == true && this._form.controls[field].valid == true) {
            isValid = true;
        }

        return isValid;
    }

    public onValueChanged(data?: any) {
        if (!this._form) { return; }
        const form = this._form;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }
        }
    }

    private _resetTeacher(){
        this._teacher = new Teacher();
        this._teacher.username = '';
        this._teacher.email = '';
        this._teacher.password = '';
        this._teacher.confirmed_at = '';
        this._teacher.blocked_at = '';
        this._teacher.role = 50;
        this._teacher.permissions = [];
        this._teacher.status = 10;
    }

    public ngOnInit() {
        this._resetFormErrors();
        this._resetTeacher();


        // _route is activated route service. this._route.params is observable.
        // subscribe is method that takes function to retrieve parameters when it is changed.
        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if(typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._teacherDataService.getTeacherById(this._id)
                    .subscribe(
                        staff => {
                            this._teacher = staff;
                            this._mode = 'update';
                        },
                        error => {
                            // unauthorized access
                            if(error.status == 401 || error.status == 403) {
                                this._teacherService.unauthorizedAccess(error);
                            } else {
                                this._errorMessage = error.data.message;
                            }
                        }
                    );
            } else {
                this._mode = 'create';

                this._teacherDataService.getPermissionTypes()
                    .subscribe(
                        result => {
                            let permissions = result;
                            if(permissions.length > 0) {
                                permissions.forEach((permission, index) => {
                                    permissions[index]['checked'] = true;
                                });
                            }

                            this._teacher.permissions = permissions;
                        },
                        error => {
                            // unauthorized access
                            if(error.status == 401 || error.status == 403) {
                                this._teacherService.unauthorizedAccess(error);
                            } else {
                                this._errorMessage = error.data.message;
                            }
                        }
                    );
            }
        });
    }

    public ngOnDestroy() {
        this._parameters.unsubscribe();
        this._teacher = new Teacher();
    }

    public onSubmit() {
        this._submitted = true;
        this._resetFormErrors();
        if(this._mode == 'create') {
            this._teacherDataService.addTeacher(this._teacher)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/staff']);
                        } else {
                            this._submitted = false;
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if(error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            this._setFormErrors(errorFields);
                        }
                        // Unauthorized Access
                        if(error.status == 401 || error.status == 403) {
                            this._teacherService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        } else if(this._mode == 'update') {
            this._teacherDataService.updateTeacherById(this._teacher)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/staff']);
                        } else {
                            this._submitted = false;
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if(error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            this._setFormErrors(errorFields);
                            //this._setFormErrors(error.data);
                        }
                        // Unauthorized Access
                        else if(error.status == 401 || error.status == 403) {
                            this._teacherService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        }
    }

    public onChangeDateTime(type:string, dateTime:string) {
        let formattedDateTime:string = null;
        if(moment(dateTime).isValid()) {
            formattedDateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
        }

        if(type == 'confirmed_at') {
            this._teacher.confirmed_at = formattedDateTime;
        } else if(type == 'blocked_at') {
            this._teacher.blocked_at = formattedDateTime;
        }
    }
}

function validateDateTime(fieldKeys:any){
    return (group: FormGroup) => {
        for(let i = 0; i < fieldKeys.length; i++) {
            let field = group.controls[fieldKeys[i]];
            if(typeof field !== "undefined" && (field.value != "" && field.value != null)) {
                if(moment(field.value, "YYYY-MM-DD HH:mm:ss", true).isValid() == false) {
                    return field.setErrors({validateDateTime: true});
                }
            }
        }
    }
}
