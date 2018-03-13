import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './event-form/event-form.component';
import {EventRoutingModule} from './event-routing.module';
@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule
  ],
  declarations: [EventFormComponent]
})
export class EventModule { }
