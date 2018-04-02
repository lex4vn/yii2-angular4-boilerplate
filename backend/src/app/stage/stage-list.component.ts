import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {StageDataService} from "../model/stage-data.service";
import {Stage} from "../model/stage";
import {StaffService} from "../model/staff.service";

@Component({
    templateUrl: './stage-list.component.html',
})
export class StageListComponent implements OnInit{
    private _stages:Stage[];
    private _errorMessage:string;

    constructor(private _stageDataService:StageDataService,
                private _staffService:StaffService,
                private _router:Router) {}

    ngOnInit() {
        this.getStages();
    }

    public getStages() {
        this._stages = null;
        this._stageDataService.getAllStages()
            .subscribe(
                stages => {
                    this._stages = stages
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
    public changeStage(status,stage:Stage):void {
        stage.status = status;
        this._stageDataService.updateStageById(stage)
            .subscribe(
                result => {
                    this.getStages();
                },
                error =>  {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._staffService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                    //resolve();

                }
            );
    }

    public viewStage(stage:Stage):void {
        this._router.navigate(['/stage', stage.id]);
    }

    public confirmDeleteStage(stage:Stage):void {
        // Due to sweet alert scope issue, define as function variable and pass to swal

        let parent = this;
        // let getStages = this.getStages;
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
                    parent._stageDataService.deleteStageById(stage.id)
                        .subscribe(
                            result => {
                                parent.getStages();
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