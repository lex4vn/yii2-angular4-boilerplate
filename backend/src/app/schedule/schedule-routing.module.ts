import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ScheduleListComponent} from './schedule-list.component';
import {ScheduleFormComponent} from './schedule-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Thời khóa biểu'
        },
        children: [
            {
                path: 'list',
                component: ScheduleListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: ScheduleFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: 'view/:id',
                component: ScheduleFormComponent,
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
export class ScheduleRoutingModule {}
