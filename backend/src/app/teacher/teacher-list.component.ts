import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {TeacherDataService} from "../model/teacher-data.service";
import {Teacher} from "../model/teacher";
import {TeacherService} from "../model/teacher.service";

@Component({
    templateUrl: './teacher-list.component.html',
})
export class TeacherListComponent implements OnInit{
    private _teachers:Teacher[];
    private _errorMessage:string;

    constructor(private _teacherDataService:TeacherDataService,
                private _teacherService:TeacherService,
                private _router:Router) {}

    ngOnInit() {
        this.getTeachers();
    }

    public getTeachers() {
        this._teachers = null;
        this._teacherDataService.getAllTeachers()
            .subscribe(
                teachers => {
                    this._teachers = teachers
                },
                error =>  {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._teacherService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                }
            );
    }

    public viewTeacher(teacher:Teacher):void {
        this._router.navigate(['/teacher', teacher.id]);
    }

    public confirmDeleteTeacher(teacher:Teacher):void {
        // Due to sweet alert scope issue, define as function variable and pass to swal

        let parent = this;
        // let getTeachers = this.getTeachers;
        this._errorMessage = '';

        swal({
            title: 'Are you sure?',
            text: "Once delete, you won't be able to revert this!",
            type: 'question',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    parent._teacherDataService.deleteTeacherById(teacher.id)
                        .subscribe(
                            result => {
                                parent.getTeachers();
                                resolve();
                            },
                            error =>  {
                                // unauthorized access
                                if(error.status == 401 || error.status == 403) {
                                    parent._teacherService.unauthorizedAccess(error);
                                } else {
                                    parent._errorMessage = error.data.message;
                                }
                                resolve();

                            }
                        );
                })
            }
        }).then(function(result) {
            // handle confirm, result is needed for modals with input

        }, function(dismiss) {
            // dismiss can be "cancel" | "close" | "outside"
        });
    }
}