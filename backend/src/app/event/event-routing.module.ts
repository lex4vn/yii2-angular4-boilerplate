import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EventListComponent} from './event-list.component';
import {EventFormComponent} from './event-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Events'
    },
    children: [
      {
        path: 'list',
        component: EventListComponent,
        data: {
          title: 'Danh sách',
        }
      },
      {
        path: 'create',
        component: EventFormComponent,
        data: {
          title: 'Tạo mới'
        }
      },
      {
        path: ':id',
        component: EventFormComponent,
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
export class EventRoutingModule {}
