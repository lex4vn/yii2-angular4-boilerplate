import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CustomValidators} from 'ng2-validation';
import {ContainsValidators} from "../shared/contains-validator.directive";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


import {NoteDataService} from "../model/note-data.service";
import {Note} from "../model/note";
import {StaffService} from "../model/staff.service";

import * as moment from "moment";

@Component({
    templateUrl: './note-form.component.html',
})
export class NoteFormComponent implements OnInit, OnDestroy {
    private _mode:string = '';

    private _id:number;
    private _parameters:any;
    private _note:Note;

    private _errorMessage:string;

    private _form:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;

    // Status Types
    private _statusTypes:any = {};
    private _kids:any = {};
    private _schedules:any = {};

    constructor(private _noteDataService:NoteDataService,
                private _staffService:StaffService,
                private _router:Router,
                private _activatedRoute:ActivatedRoute,
                private _formBuilder:FormBuilder) {

        // Construct form group
        this._form = _formBuilder.group({
            note: ['', Validators.compose([
                Validators.required,
                //CustomValidators.rangeLength([3, 15]),
                //Validators.pattern('^[A-Za-z0-9_-]{3,15}$'),
            ])],
            schedule_id: ['', Validators.compose([
                Validators.required,
            ])],
            kid_id: ['', Validators.compose([
                Validators.required,
            ])],
            created_at: ['', Validators.compose([])],
            status: ['', Validators.compose([
                Validators.required,
                // Custom validator for checking value against list of values
                ContainsValidators.contains('value', NoteDataService.getStatusTypes())
            ])],
        }, {
            validator: validateDateTime(['created_at'])
        });

        this._statusTypes = NoteDataService.getStatusTypes();

        this._kids = NoteDataService.getKids();
        this._schedules = NoteDataService.getSchedules();

        this._form.valueChanges
            .subscribe(data => this.onValueChanged(data));

    }

    private _setFormErrors(errorFields:any):void {
        for (let key in errorFields) {
            let errorField = errorFields[key];
            // skip loop if the property is from prototype
            if (!this._formErrors.hasOwnProperty(key)) continue;

            // let message = errorFields[error.field];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = errorField;
        }
    }

    private _resetFormErrors():void {
        this._formErrors = {
            note: {valid: true, message: ''},
            schedule_id: {valid: true, message: ''},
            kid_id: {valid: true, message: ''},
            created_at: {valid: true, message: ''},
            status: {valid: true, message: ''},
        };
    }

    private _isValid(field):boolean {
        let isValid:boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if (this._form.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if (this._form.controls[field].touched == true && this._form.controls[field].valid == true) {
            isValid = true;
        }

        return isValid;
    }

    public onValueChanged(data?:any) {
        if (!this._form) {
            return;
        }
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

    private _resetNote() {
        this._note = new Note();
        this._note.note = '';
        this._note.schedule_id = 0;
        this._note.kid_id = 0;
        this._note.created_at = '';
        this._note.status = 10;
    }

    public ngOnInit() {
        this._resetFormErrors();
        this._resetNote();



        this._noteDataService.getAllSchedules()
            .subscribe(
                result => {
                    let schedules = result;
                    this._schedules = schedules;
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

        // _route is activated route service. this._route.params is observable.
        // subscribe is method that takes function to retrieve parameters when it is changed.
        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if (typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._noteDataService.getNoteById(this._id)
                    .subscribe(
                        staff => {
                            this._note = staff;
                            this._mode = 'update';
                        },
                        error => {
                            // unauthorized access
                            if (error.status == 401 || error.status == 403) {
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
        this._note = new Note();
    }

    public onSubmit() {
        this._submitted = true;
        this._resetFormErrors();
        if (this._mode == 'create') {
            this._noteDataService.addNote(this._note)
                .subscribe(
                    result => {
                        if (result.success) {
                            this._router.navigate(['/note']);
                        } else {
                            this._submitted = false;
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if (error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            this._setFormErrors(errorFields);
                        }
                        // Unauthorized Access
                        else if (error.status == 401 || error.status == 403) {
                            this._staffService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        } else if (this._mode == 'update') {
            this._noteDataService.updateNoteById(this._note)
                .subscribe(
                    result => {
                        if (result.success) {
                            this._router.navigate(['/note']);
                        } else {
                            this._submitted = false;
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if (error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            this._setFormErrors(errorFields);
                            //this._setFormErrors(error.data);
                        }
                        // Unauthorized Access
                        else if (error.status == 401 || error.status == 403) {
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

    public onChangeDateTime(type:string, dateTime:string) {
        let formattedDateTime:string = null;
        if (moment(dateTime).isValid()) {
            formattedDateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
        }
        this._note.created_at = formattedDateTime;
    }
}

function validateDateTime(fieldKeys:any) {
    return (group:FormGroup) => {
        for (let i = 0; i < fieldKeys.length; i++) {
            let field = group.controls[fieldKeys[i]];
            if (typeof field !== "undefined" && (field.value != "" && field.value != null)) {
                if (moment(field.value, "YYYY-MM-DD HH:mm:ss", true).isValid() == false) {
                    return field.setErrors({validateDateTime: true});
                }
            }
        }
    }
}