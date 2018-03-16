import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import { EventFormComponent } from './event-form.component';
import { EventListComponent } from './event-list.component';
import {EventRoutingModule} from './event-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventRoutingModule
  ],
  declarations: [
    EventFormComponent,
    EventListComponent,
  ]
})
export class EventModule { }
