import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerService } from "../service/scheduler/scheduler.service";
//import { HeaderNavigationComponent } from '../shared/header-navigation/header-navigation.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { PageComponent } from './pages.component';
import { HomeComponent } from './content/home/home.component';
import { AuthGuardService } from "../service/auth-guard.service";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'starter',
                canActivate: [AuthGuardService],
                loadChildren: './content/starter/starter.module#StarterModule'
            },
            {
                path: 'home',
                canActivate: [AuthGuardService],
                component: HomeComponent
            },
            {
                path: 'cookie',
                canActivate: [AuthGuardService],
                loadChildren: './content/cookie/cookie.module#CookieModule'
            },
            {
                path: 'system',
                canActivate: [AuthGuardService],
                loadChildren: './content/system/system.module#SystemModule'
            },
            {
                path: 'org',
                canActivate: [AuthGuardService],
                loadChildren: './content/organization/organization.module#OrganizationModule'
            },
            {
                path: 'persons',
                canActivate: [AuthGuardService],
                loadChildren: './content/person/person.module#PersonModule'
            },
            {
                path: 'message',
                canActivate: [AuthGuardService],
                loadChildren: './content/message/message.module#MessageModule'
            }
        ]
    }
];
@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild( routes )
    ],
    declarations: [
        PageComponent,
        HeaderComponent,
        SidebarComponent,
        HomeComponent
    ],
    exports: [RouterModule],
    providers: []
} )
export class PagesModule { }
