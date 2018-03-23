import {Component, ElementRef, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CustomValidators} from 'ng2-validation';
import {ContainsValidators} from "../shared/contains-validator.directive";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {ParentDataService} from "../model/parent-data.service";
import {Parent} from "../model/parent";
import {StaffService} from "../model/staff.service";

import * as moment from "moment";

@Component({
    templateUrl: './parent-form.component.html',
})
export class ParentFormComponent implements OnInit, OnDestroy {
    private _mode:string = '';

    private _id:number;
    private _parameters:any;
    private _parent:Parent;

    private _errorMessage:string;

    private _form:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;

    // Status Types
    private _statusTypes:any = {};

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private _parentDataService:ParentDataService,
                private _staffService:StaffService,
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
            full_name: ['', Validators.compose([
                Validators.required,
            ])],
            kid_name: ['', Validators.compose([
                Validators.required,
            ])],
            password: ['', Validators.compose([
                Validators.minLength(6)
            ])],
            confirmed_at: ['', Validators.compose([])],
            blocked_at: ['', Validators.compose([])],
            status: ['', Validators.compose([
                Validators.required,
                // Custom validator for checking value against list of values
                ContainsValidators.contains('value', ParentDataService.getStatusTypes())
            ])],
            avatar: null,
            kid_avatar: null,
            //class_id: null
        }, {
            validator: validateDateTime(['confirmed_at', 'blocked_at'])
        });

        this._statusTypes = ParentDataService.getStatusTypes();


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
            username: {valid: true, message: ''},
            email: {valid: true, message: ''},
            password: {valid: true, message: ''},
            confirmed_at: {valid: true, message: ''},
            blocked_at: {valid: true, message: ''},
            role: {valid: true, message: ''},
            status: {valid: true, message: ''},
            kid_id: {valid: true, message: ''},
            avatar: {valid: true, message: ''},
            full_name: {valid: true, message: ''},
            kid_name: {valid: true, message: ''},
            kid_avatar: {valid: true, message: ''},
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
        if(!isValid){
            console.log(field);
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

    private _resetParent() {
        this._parent = new Parent();
        this._parent.username = '';
        this._parent.email = '';
        this._parent.password = '';
        this._parent.confirmed_at = '';
        this._parent.blocked_at = '';
        this._parent.status = 10;
        this._parent.kid_id = 0;
        this._parent.avatar = null;
        this._parent.full_name = null;
        this._parent.kid_name = null;
        this._parent.kid_avatar = null;
    }

    public ngOnInit() {
        this._resetFormErrors();
        this._resetParent();


        // _route is activated route service. this._route.params is observable.
        // subscribe is method that takes function to retrieve parameters when it is changed.
        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if (typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._parentDataService.getParentById(this._id)
                    .subscribe(
                        staff => {
                            this._parent = staff;
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
        this._parent = new Parent();
    }

    public onSubmit() {
        this._submitted = true;
        this._resetFormErrors();
        const formModel = this._form.value;
        if (this._mode == 'create') {
            this._parent.avatar = this._form.get('avatar').value;
            this._parent.kid_avatar = this._form.get('kid_avatar').value;
            this._parentDataService.addParent(this._parent)
                .subscribe(
                    result => {
                        if (result.success) {
                            this._router.navigate(['/parent']);
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
            this._parent.avatar = this._form.get('avatar').value;
            this._parent.kid_avatar = this._form.get('kid_avatar').value;
            this._parentDataService.updateParentById(this._parent)
                .subscribe(
                    result => {
                        if (result.success) {
                            this._router.navigate(['/parent']);
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
        if (type == 'confirmed_at') {
            this._parent.confirmed_at = formattedDateTime;
        } else if (type == 'blocked_at') {
            this._parent.blocked_at = formattedDateTime;
        }
    }

    public onFileChangeKidAvatar(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this._form.get('kid_avatar').setValue(reader.result.split(',')[1])
            };
        }
    }

    public clearFileKidAvatar() {
        this._form.get('kid_avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

    public onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this._form.get('avatar').setValue(reader.result.split(',')[1])
            };
        }
    }

    public clearFile() {
        this._form.get('avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
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