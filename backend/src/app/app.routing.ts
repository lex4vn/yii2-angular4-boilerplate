import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {SimpleLayoutComponent}  from './layouts/simple-layout.component';
import {P404Component} from './pages/404.component';

import {AuthGuard} from './model/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Trang chủ'
        },
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'class',
                loadChildren: 'app/clazz/clazz.module#ClazzModule'
            },
            {
                path: 'schedule',
                loadChildren: 'app/schedule/schedule.module#ScheduleModule'
            },
            {
                path: 'activity',
                loadChildren: 'app/activity/activity.module#ActivityModule'
            },
            {
                path: 'teacher',
                loadChildren: 'app/teacher/teacher.module#TeacherModule'
            },
             {
                path: 'staff',
                loadChildren: 'app/staff/staff.module#StaffModule'
            },
            {
                path: 'user',
                loadChildren: 'app/user/user.module#UserModule'
            },
            {
                path: 'parent',
                loadChildren: 'app/parent/parent.module#ParentModule'
            },
            {
                path: 'setting',
                loadChildren: 'app/setting/setting.module#SettingModule'
            },
            {
                path: 'event',
                loadChildren: 'app/event/event.module#EventModule'
            },
            {
                path: 'note',
                loadChildren: 'app/note/note.module#NoteModule'
            },
            {
                path: 'article',
                loadChildren: 'app/article/article.module#ArticleModule'
            },
            {
                path: 'stage',
                loadChildren: 'app/stage/stage.module#StageModule'
            }
        ]
    },
    {
        path: '',
        component:SimpleLayoutComponent,
        children: [
            {
                path: 'login',
                loadChildren: 'app/login/login.module#LoginModule'
            },
            {
                path: 'logout',
                loadChildren: 'app/logout/logout.module#LogoutModule'
            }
        ],
    },
    // otherwise redirect to home
    { path: '**', component: P404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
