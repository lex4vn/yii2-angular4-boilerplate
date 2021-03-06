import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {AsideToggleDirective} from './shared/aside.directive';
import {BreadcrumbsComponent} from './shared/breadcrumb.component';
import {SmartResizeDirective} from './shared/smart-resize.directive';

// Routing Module
import {AppRoutingModule} from './app.routing';

// Layouts
import {TeacherLayoutComponent} from './layouts/teacher-layout.component';
import {FullLayoutComponent} from './layouts/full-layout.component';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';
import {P404Component} from './pages/404.component';

// Shared
import {AuthGuard} from './model/auth.guard';
import {RoleGuard} from './model/role.guard';
import {SharedModule} from './shared/shared.module';

// Model & Services
import {GlobalService} from './model/global.service';
import {StaffService} from './model/staff.service';
import {TeacherService} from './model/teacher.service';
import {StaffDataService} from './model/staff-data.service';
import {TeacherDataService} from './model/teacher-data.service';
import {ScheduleDataService} from './model/schedule-data.service';
import {UserDataService} from './model/user-data.service';
import {ParentDataService} from './model/parent-data.service';
import {ClazzDataService} from './model/clazz-data.service';
import {SettingDataService} from './model/setting-data.service';
import {EventDataService} from './model/event-data.service';
import {NoteDataService} from './model/note-data.service';
import {ArticleDataService} from './model/article-data.service';
import {ActivityDataService} from './model/activity-data.service';
import {StageDataService} from './model/stage-data.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        HttpModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        TeacherLayoutComponent,
        FullLayoutComponent,
        SimpleLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        SmartResizeDirective,
        P404Component
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        AuthGuard,
        RoleGuard,
        TeacherService,
        StaffService,
        GlobalService,
        SettingDataService,
        StaffDataService,
        TeacherDataService,
        UserDataService,
        ParentDataService,
        ClazzDataService,
        ScheduleDataService,
        ActivityDataService,
        NoteDataService,
        ArticleDataService,
        EventDataService,
        StageDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
