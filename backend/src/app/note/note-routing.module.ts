import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { NoteListComponent } from './note-list.component';
import { NoteFormComponent } from './note-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Nhận xét'
        },
        children: [
            {
                path: 'list',
                component: NoteListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: NoteFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: NoteFormComponent,
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
export class NoteRoutingModule {}
