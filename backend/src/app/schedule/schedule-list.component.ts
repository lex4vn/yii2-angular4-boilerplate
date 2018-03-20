import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {ScheduleDataService} from "../model/schedule-data.service";
import {Schedule} from "../model/schedule";
import {StaffService} from "../model/staff.service";

@Component({
    templateUrl: './schedule-list.component.html',
})
export class ScheduleListComponent implements OnInit{
    private _schedules:Schedule[];
    private _errorMessage:string;

    constructor(private _scheduleDataService:ScheduleDataService,
                private _staffService:StaffService,
                private _router:Router) {}

    ngOnInit() {
        this.getSchedules();
    }

    public getSchedules() {
        this._schedules = null;
        this._scheduleDataService.getAllSchedules()
            .subscribe(
                schedules => {
                    this._schedules = schedules
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

    public viewSchedule(schedule:Schedule):void {
        this._router.navigate(['/schedule', schedule.id]);
    }

    public confirmDeleteSchedule(schedule:Schedule):void {
        // Due to sweet alert scope issue, define as function variable and pass to swal

        let parent = this;
        // let getSchedules = this.getSchedules;
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
                    parent._scheduleDataService.deleteScheduleById(schedule.id)
                        .subscribe(
                            result => {
                                parent.getSchedules();
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