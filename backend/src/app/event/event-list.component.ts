import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import swal, {SweetAlertOptions} from 'sweetalert2';

import {EventDataService} from "../model/event-data.service";
import {Event} from "../model/event";
import {StaffService} from "../model/staff.service";

@Component({
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit{
  private _events:Event[];
  private _errorMessage:string;

  constructor(private _eventDataService:EventDataService,
              private _staffService:StaffService,
              private _router:Router) {}

  ngOnInit() {
    this.getEvents();
  }

  public getEvents() {
    this._events = null;
    this._eventDataService.getAllEvents()
        .subscribe(
            events => {
              this._events = events
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

  public viewEvent(event:Event):void {
    this._router.navigate(['/event', event.id]);
  }

  public confirmDeleteEvent(event:Event):void {
    // Due to sweet alert scope issue, define as function variable and pass to swal

    let parent = this;
    // let getEvents = this.getEvents;
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
          parent._eventDataService.deleteEventById(event.id)
              .subscribe(
                  result => {
                    parent.getEvents();
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