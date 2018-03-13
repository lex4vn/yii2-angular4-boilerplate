import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {TeacherListComponent} from './teacher-list.component';
import {TeacherFormComponent} from './teacher-form.component';
import {TeacherRoutingModule} from './teacher-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TeacherRoutingModule,
    ],
    declarations: [
        TeacherListComponent,
        TeacherFormComponent,
    ]
})
export class TeacherModule {
}
