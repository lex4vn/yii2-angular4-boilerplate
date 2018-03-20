import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {ActivityDataService} from "../model/activity-data.service";
import {Activity} from "../model/activity";
import {StaffService} from "../model/staff.service";

@Component({
    templateUrl: './activity-list.component.html',
})
export class ActivityListComponent implements OnInit{
    private _activities:Activity[];
    private _errorMessage:string;

    constructor(private _activityDataService:ActivityDataService,
                private _staffService:StaffService,
                private _router:Router) {}

    ngOnInit() {
        this.getActivities();
    }

    public getActivities() {
        this._activities = null;
        this._activityDataService.getAllActivities()
            .subscribe(
                activitys => {
                    this._activities = activitys
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

    public viewActivity(activity:Activity):void {
        this._router.navigate(['/activity', activity.id]);
    }

    public confirmDeleteActivity(activity:Activity):void {
        // Due to sweet alert scope issue, define as function variable and pass to swal

        let parent = this;
        // let getActivities = this.getActivities;
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
                    parent._activityDataService.deleteActivityById(activity.id)
                        .subscribe(
                            result => {
                                parent.getActivities();
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