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
          title: 'List',
        }
      },
      {
        path: 'create',
        component: EventFormComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: ':id',
        component: EventFormComponent,
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
export class EventRoutingModule {}
