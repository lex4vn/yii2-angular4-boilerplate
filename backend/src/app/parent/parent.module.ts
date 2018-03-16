import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {ParentListComponent} from './parent-list.component';
import {ParentFormComponent} from './parent-form.component';
import {ParentRoutingModule} from './parent-routing.module';
import { Base64UploadComponent } from '../base64-upload/base64-upload.component';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ParentRoutingModule,
    ],
    declarations: [
        ParentListComponent,
        ParentFormComponent,
        Base64UploadComponent
    ]
})
export class ParentModule { }
