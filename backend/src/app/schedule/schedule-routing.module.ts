import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ScheduleListComponent} from './schedule-list.component';
import {ScheduleFormComponent} from './schedule-form.component';
import {ScheduleViewComponent} from './schedule-view.component';

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
                component: ScheduleViewComponent,
                data: {
                    title: 'Xem thời khoá biểu'
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
