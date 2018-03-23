import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {ArticleDataService} from "../model/article-data.service";
import {Article} from "../model/article";
import {StaffService} from "../model/staff.service";

@Component({
    templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit{
    private _articles:Article[];
    private _errorMessage:string;
    private _base_url : string = '';
    constructor(private _articleDataService:ArticleDataService,
                private _staffService:StaffService,
                private _router:Router) {
        this._base_url = this._articleDataService.getBaseUrl();
    }

    ngOnInit() {
        this.getArticles();
    }

    public getArticles() {
        this._articles = null;
        this._articleDataService.getAllArticles()
            .subscribe(
                articles => {
                    this._articles = articles
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

    public viewArticle(article:Article):void {
        this._router.navigate(['/article', article.id]);
    }

    public confirmDeleteArticle(article:Article):void {
        // Due to sweet alert scope issue, define as function variable and pass to swal

        let parent = this;
        // let getArticles = this.getArticles;
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
                    parent._articleDataService.deleteArticleById(article.id)
                        .subscribe(
                            result => {
                                parent.getArticles();
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