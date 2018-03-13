import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ClazzListComponent} from './clazz-list.component';
import {ClazzFormComponent} from './clazz-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Classes'
        },
        children: [
            {
                path: 'list',
                component: ClazzListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: ClazzFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: ':id',
                component: ClazzFormComponent,
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
export class ClazzRoutingModule {}
