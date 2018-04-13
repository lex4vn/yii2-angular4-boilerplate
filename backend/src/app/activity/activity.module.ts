import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {ActivityListComponent} from './activity-list.component';
import {ActivityFormComponent} from './activity-form.component';
import {ActivityRoutingModule} from './activity-routing.module';
import { NgUploaderModule } from 'ngx-uploader';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ActivityRoutingModule,
        NgUploaderModule
    ],
    declarations: [
        ActivityListComponent,
        ActivityFormComponent,
    ]
})
export class ActivityModule { }
