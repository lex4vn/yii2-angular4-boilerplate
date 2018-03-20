import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {ClazzDataService} from "../model/clazz-data.service";
import {Clazz} from "../model/clazz";
import {User} from "../model/user";
import {StaffService} from "../model/staff.service";

@Component({
    templateUrl: './clazz-list.component.html',
})
export class ClazzListComponent implements OnInit{
    private _clazzes:Clazz[];
    private _errorMessage:string;

    constructor(private _clazzDataService:ClazzDataService,
                private _staffService:StaffService,
                private _router:Router) {}

    ngOnInit() {
        this.getClazzes();
    }

    public getClazzes() {
        this._clazzes = null;
        this._clazzDataService.getAllClazzes()
            .subscribe(
                clazzes => {
                    this._clazzes = clazzes
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

    public viewClazz(clazz:Clazz):void {
        this._router.navigate(['/class', clazz.id]);
    }

    public confirmDeleteClazz(clazz:Clazz):void {
        // Due to sweet alert scope issue, define as function variable and pass to swal

        let parent = this;
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
                    parent._clazzDataService.deleteClazzById(clazz.id)
                        .subscribe(
                            result => {
                                parent.getClazzes()
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