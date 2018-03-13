import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {ClazzListComponent} from './clazz-list.component';
import {ClazzFormComponent} from './clazz-form.component';
import {ClazzRoutingModule} from './clazz-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ClazzRoutingModule,
    ],
    declarations: [
        ClazzListComponent,
        ClazzFormComponent,
    ]
})
export class ClazzModule { }
