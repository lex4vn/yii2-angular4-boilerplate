import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {ParentDataService} from "../model/parent-data.service";
import {Parent} from "../model/parent";
import {StaffService} from "../model/staff.service";

@Component({
    templateUrl: './parent-list.component.html',
})
export class ParentListComponent implements OnInit{
    private _parents:Parent[];
    private _errorMessage:string;

    constructor(private _parentDataService:ParentDataService,
                private _staffService:StaffService,
                private _router:Router) {}

    ngOnInit() {
        this.getParents();
    }

    public getParents() {
        this._parents = null;
        this._parentDataService.getAllParents()
            .subscribe(
                parents => {
                    this._parents = parents
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

    public viewParent(parent:Parent):void {
        this._router.navigate(['/parent', parent.id]);
    }

    public confirmDeleteParent(parent:Parent):void {
        // Due to sweet alert scope issue, define as function variable and pass to swal

        let parents = this;
        // let getParents = this.getParents;
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
                    parents._parentDataService.deleteParentById(parent.id)
                        .subscribe(
                            result => {
                                parents.getParents();
                                resolve();
                            },
                            error =>  {
                                // unauthorized access
                                if(error.status == 401 || error.status == 403) {
                                    parents._staffService.unauthorizedAccess(error);
                                } else {
                                    parents._errorMessage = error.data.message;
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