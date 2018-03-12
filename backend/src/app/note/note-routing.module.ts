import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { NoteListComponent } from './note-list/note-list.component';
import { NoteFormComponent } from './note-form/note-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Notes'
        },
        children: [
            {
                path: 'list',
                component: NoteListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: NoteFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: ':id',
                component: NoteFormComponent,
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
export class NoteRoutingModule {}
