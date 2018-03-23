import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArticleListComponent} from './article-list.component';
import {ArticleFormComponent} from './article-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tin tức'
        },
        children: [
            {
                path: 'list',
                component: ArticleListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: ArticleFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: ArticleFormComponent,
                data: {
                    title: 'Cập nhật'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule {}
