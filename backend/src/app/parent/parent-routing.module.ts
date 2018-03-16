import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ParentListComponent} from './parent-list.component';
import {ParentFormComponent} from './parent-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Parents'
        },
        children: [
            {
                path: 'list',
                component: ParentListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: ParentFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: ':id',
                component: ParentFormComponent,
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
export class ParentRoutingModule {}
