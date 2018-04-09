import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {NoteDataService} from "../model/note-data.service";
import {Note} from "../model/note";
import {StaffService} from "../model/staff.service";

@Component({
  templateUrl: './note-list.component.html',
})

export class NoteListComponent implements OnInit{
  public userData:any = {};
  private _notes:Note[];
  private _errorMessage:string;

  constructor(private _noteDataService:NoteDataService,
              private _staffService:StaffService,
              private _router:Router) {}

  ngOnInit() {
    let jwtValue:any = this._staffService.getJWTValue();
    this.userData = jwtValue.data;

    this.getNotes();
  }

  public getNotes() {
    this._notes = null;
    this._noteDataService.getAllNotes()
        .subscribe(
            notes => {
              this._notes = notes
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

  public viewNote(note:Note):void {
    this._router.navigate(['/note', note.id]);
  }

  public confirmDeleteNote(note:Note):void {
    // Due to sweet alert scope issue, define as function variable and pass to swal

    let parent = this;
    // let getNotes = this.getNotes;
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
          parent._noteDataService.deleteNoteById(note.id)
              .subscribe(
                  result => {
                    parent.getNotes();
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
