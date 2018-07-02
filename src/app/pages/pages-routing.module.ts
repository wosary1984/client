import { AuthGuardService } from "../service/auth-guard.service";
import { HomeComponent } from "./content/home/home.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './pages.component';

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
            }
        ]
    }
];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
} )
export class PagesRoutingModule { }
