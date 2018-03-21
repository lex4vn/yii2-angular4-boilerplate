import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CustomValidators} from 'ng2-validation';
import {ContainsValidators} from "../shared/contains-validator.directive";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


import {ClazzDataService} from "../model/clazz-data.service";
import {Clazz} from "../model/clazz";
import {User} from "../model/user";
import {StaffService} from "../model/staff.service";

import * as moment from "moment";

@Component({
    templateUrl: './clazz-form.component.html',
})
export class ClazzFormComponent implements OnInit, OnDestroy{
    private _mode:string = '';

    private _id:number;
    private _parameters:any;
    private _clazz:Clazz;

    private _errorMessage:string;

    private _form:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;

    // Status Types
    private _statusTypes:any = {};
    private _teachers:any = {};
    private _schools:any = {};

    constructor(private _clazzDataService:ClazzDataService,
                private _staffService:StaffService,
                private _router:Router,
                private _activatedRoute:ActivatedRoute,
                private _formBuilder:FormBuilder) {

        // Construct form group
        this._form = _formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                //CustomValidators.rangeLength([3, 15]),
                //Validators.pattern('^[A-Za-z0-9_-]{3,15}$'),
            ])],
            description: ['', Validators.compose([
                //Validators.required,
            ])],
            school_id: ['', Validators.compose([
                Validators.required,
            ])],
            teacher_id: ['', Validators.compose([
                Validators.required,
            ])],
            status: ['', Validators.compose([
                Validators.required,
                // Custom validator for checking value against list of values
                ContainsValidators.contains('value', ClazzDataService.getStatusTypes())
            ])],
        });

        this._schools = ClazzDataService.getSchools();
        this._teachers = ClazzDataService.getTeachers();
        this._statusTypes = ClazzDataService.getStatusTypes();


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
            name: {valid: true, message: ''},
            description: {valid: true, message: ''},
            teacher_id: {valid: true, message: ''},
            school_id: {valid: true, message: ''},
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
        console.log(field);
        console.log(isValid);
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

    private _resetClazz(){
        this._clazz = new Clazz();

    }

    public ngOnInit() {
        this._resetFormErrors();
        this._resetClazz();


        // _route is activated route service. this._route.params is observable.
        // subscribe is method that takes function to retrieve parameters when it is changed.
        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if(typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._clazzDataService.getClazzById(this._id)
                    .subscribe(
                        clazz => {
                            this._clazz = clazz;
                            this._mode = 'update';
                        },
                        error => {
                            // unauthorized access
                            if(error.status == 401 || error.status == 403) {
                                this._staffService.unauthorizedAccess(error);
                            } else {
                                this._errorMessage = error.data.message;
                            }
                        }
                    );
            } else {
                this._mode = 'create';
                this._clazzDataService.getAllSchools()
                    .subscribe(
                        result => {
                            let schools = result;
                            this._schools = schools;
                        },
                        error => {
                            // unauthorized access
                            if(error.status == 401 || error.status == 403) {
                                this._staffService.unauthorizedAccess(error);
                            } else {
                                this._errorMessage = error.data.message;
                            }
                        }
                    );

                this._clazzDataService.getAllTeachers()
                    .subscribe(
                        result => {
                            let teachers = result;
                            this._teachers = teachers;
                        },
                        error => {
                            // unauthorized access
                            if(error.status == 401 || error.status == 403) {
                                this._staffService.unauthorizedAccess(error);
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
        this._clazz = new Clazz();
    }

    public onSubmit() {
        this._submitted = true;
        this._resetFormErrors();
        if(this._mode == 'create') {
            this._clazzDataService.addClazz(this._clazz)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/class']);
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
                        else if(error.status == 401 || error.status == 403) {
                            this._staffService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        } else if(this._mode == 'update') {
            this._clazzDataService.updateClazzById(this._clazz)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/class']);
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
                            this._staffService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        }
    }

}
