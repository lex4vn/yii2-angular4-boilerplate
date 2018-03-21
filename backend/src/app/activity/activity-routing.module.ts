import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ActivityListComponent} from './activity-list.component';
import {ActivityFormComponent} from './activity-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Hoạt động'
        },
        children: [
            {
                path: 'list',
                component: ActivityListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: ActivityFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: ActivityFormComponent,
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
export class ActivityRoutingModule {}
