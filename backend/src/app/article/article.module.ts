import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {ArticleListComponent} from './article-list.component';
import {ArticleFormComponent} from './article-form.component';
import {ArticleRoutingModule} from './article-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ArticleRoutingModule,
    ],
    declarations: [
        ArticleListComponent,
        ArticleFormComponent,
    ]
})
export class ArticleModule { }
