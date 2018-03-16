import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArticleListComponent} from './article-list.component';
import {ArticleFormComponent} from './article-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Articles'
        },
        children: [
            {
                path: 'list',
                component: ArticleListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: ArticleFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: ':id',
                component: ArticleFormComponent,
                data: {
                    title: 'Update'
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
