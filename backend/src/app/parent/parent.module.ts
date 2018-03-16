import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {ParentListComponent} from './parent-list.component';
import {ParentFormComponent} from './parent-form.component';
import {ParentRoutingModule} from './parent-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ParentRoutingModule,
    ],
    declarations: [
        ParentListComponent,
        ParentFormComponent
    ]
})
export class ParentModule { }
