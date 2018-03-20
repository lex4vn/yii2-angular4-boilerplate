import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {TeacherDataService} from "../model/teacher-data.service";
import {Teacher} from "../model/teacher";
import {StaffService} from "../model/staff.service";

@Component({
    templateUrl: './teacher-list.component.html',
})
export class TeacherListComponent implements OnInit{
    private _teachers:Teacher[];
    private _errorMessage:string;

    constructor(private _teacherDataService:TeacherDataService,
                private _staffService:StaffService,
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
                        this._staffService.unauthorizedAccess(error);
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
            title: 'Bạn có chắc chắn?',
            text: "Sau khi xóa bạn không thể lấy lại!",
            type: 'question',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chắc, xóa nó!',cancelButtonText: 'Hủy bỏ!',
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
                                    parent._staffService.unauthorizedAccess(error);
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