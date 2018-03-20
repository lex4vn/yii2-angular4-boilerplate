import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ClazzListComponent} from './clazz-list.component';
import {ClazzFormComponent} from './clazz-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Lớp học'
        },
        children: [
            {
                path: 'list',
                component: ClazzListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: ClazzFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: ClazzFormComponent,
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
export class ClazzRoutingModule {}
