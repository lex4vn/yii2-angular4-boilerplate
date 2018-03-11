import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ScheduleListComponent} from './schedule-list.component';
import {ScheduleFormComponent} from './schedule-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Schedules'
        },
        children: [
            {
                path: 'list',
                component: ScheduleListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: ScheduleFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: ':id',
                component: ScheduleFormComponent,
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
export class ScheduleRoutingModule {}
