import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TeacherListComponent} from './teacher-list.component';
import {TeacherFormComponent} from './teacher-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Teachers'
        },
        children: [
            {
                path: 'list',
                component: TeacherListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: TeacherFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: ':id',
                component: TeacherFormComponent,
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
export class TeacherRoutingModule {}
