import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SettingGlobalListComponent} from './setting-global-list.component';
import {SettingGlobalFormComponent} from './setting-global-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Global Settings'
        },
        children: [
            {
                path: 'list',
                component: SettingGlobalListComponent,
                data: {
                    title: 'Danh sách',
                }
            },
            {
                path: 'create',
                component: SettingGlobalFormComponent,
                data: {
                    title: 'Tạo mới'
                }
            },
            {
                path: ':id',
                component: SettingGlobalFormComponent,
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
export class SettingGlobalRoutingModule {}
