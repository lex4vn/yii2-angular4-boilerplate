import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ParentListComponent} from './parent-list.component';
import {ParentFormComponent} from './parent-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Phụ huynh'
        },
        children: [
            {
                path: 'list',
                component: ParentListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: ParentFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: ParentFormComponent,
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
export class ParentRoutingModule {}
