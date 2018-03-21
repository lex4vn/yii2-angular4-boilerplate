import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CustomValidators} from 'ng2-validation';
import {ContainsValidators} from "../shared/contains-validator.directive";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


import {ActivityDataService} from "../model/activity-data.service";
import {Activity} from "../model/activity";
import {StaffService} from "../model/staff.service";

import * as moment from "moment";

@Component({
    templateUrl: './activity-form.component.html',
})
export class ActivityFormComponent implements OnInit, OnDestroy{
    private _mode:string = '';

    private _id:number;
    private _parameters:any;
    private _activity:Activity;

    private _errorMessage:string;

    private _form:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;

    // Status Types
    private _statusTypes:any = {};
    private _teachers:any = {};
    private _clazzes:any = {};
    constructor(private _activityDataService:ActivityDataService,
                private _staffService:StaffService,
                private _router:Router,
                private _activatedRoute:ActivatedRoute,
                private _formBuilder:FormBuilder) {

        // Construct form group
        this._form = _formBuilder.group({
            title: ['', Validators.compose([
                Validators.required,
                //CustomValidators.rangeLength([3, 15]),
                //Validators.pattern('^[A-Za-z0-9_-]{3,15}$'),
            ])],
            teacher_id: ['', Validators.compose([
                Validators.required,
            ])],
            class_id: ['', Validators.compose([
                Validators.required,
            ])],
            created_at: ['', Validators.compose([])],

            status: ['', Validators.compose([
                Validators.required,
                // Custom validator for checking value against list of values
                ContainsValidators.contains('value', ActivityDataService.getStatusTypes())
            ])],
        }, {
            validator: validateDateTime(['created_at'])
        });
        this._teachers = ActivityDataService.getTeachers();
        this._clazzes = ActivityDataService.getClazzes();
        this._statusTypes = ActivityDataService.getStatusTypes();


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
            title: {valid: true, message: ''},
            teacher_id: {valid: true, message: ''},
            class_id: {valid: true, message: ''},
            created_at: {valid: true, message: ''},
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

    private _resetActivity(){
        this._activity = new Activity();
        this._activity.title = '';
        this._activity.class_id = 0;
        this._activity.created_at = '';
        this._activity.teacher_id = 0;
        this._activity.status = 0;
    }

    public ngOnInit() {
        this._resetFormErrors();
        this._resetActivity();


        // _route is activated route service. this._route.params is observable.
        // subscribe is method that takes function to retrieve parameters when it is changed.
        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if(typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._activityDataService.getActivityById(this._id)
                    .subscribe(
                        staff => {
                            this._activity = staff;
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

            }
        });
    }

    public ngOnDestroy() {
        this._parameters.unsubscribe();
        this._activity = new Activity();
    }

    public onSubmit() {
        this._submitted = true;
        this._resetFormErrors();
        if(this._mode == 'create') {
            console.log(this._activity);
            this._activityDataService.addActivity(this._activity)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/activity']);
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
            this._activityDataService.updateActivityById(this._activity)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/activity']);
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

    public onChangeDateTime(dateTime:string) {
        let formattedDateTime:string = null;
        if(moment(dateTime).isValid()) {
            formattedDateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
        }

        this._activity.created_at = formattedDateTime;

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