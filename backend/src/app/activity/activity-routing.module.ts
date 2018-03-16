import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ActivityListComponent} from './activity-list.component';
import {ActivityFormComponent} from './activity-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Activities'
        },
        children: [
            {
                path: 'list',
                component: ActivityListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: ActivityFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: ':id',
                component: ActivityFormComponent,
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
export class ActivityRoutingModule {}
