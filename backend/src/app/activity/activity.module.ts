import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {ActivityListComponent} from './activity-list.component';
import {ActivityFormComponent} from './activity-form.component';
import {ActivityRoutingModule} from './activity-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ActivityRoutingModule,
    ],
    declarations: [
        ActivityListComponent,
        ActivityFormComponent,
    ]
})
export class ActivityModule { }
