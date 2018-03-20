import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TeacherListComponent} from './teacher-list.component';
import {TeacherFormComponent} from './teacher-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Giáo viên'
        },
        children: [
            {
                path: 'list',
                component: TeacherListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: TeacherFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: TeacherFormComponent,
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
export class TeacherRoutingModule {}
