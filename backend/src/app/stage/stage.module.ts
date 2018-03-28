import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {StageListComponent} from './stage-list.component';
import {StageFormComponent} from './stage-form.component';
import {StageRoutingModule} from './stage-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StageRoutingModule,
    ],
    declarations: [
        StageListComponent,
        StageFormComponent,
    ]
})
export class StageModule { }
