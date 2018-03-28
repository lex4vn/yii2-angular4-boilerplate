import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {StageListComponent} from './stage-list.component';
import {StageFormComponent} from './stage-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tình trạng học sinh'
        },
        children: [
            {
                path: 'list',
                component: StageListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: StageFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: StageFormComponent,
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
export class StageRoutingModule {}
