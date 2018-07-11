import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "../../../service/auth-guard.service";
import { OrganizationComponent } from "./organization.component";
import { OrgComponent } from "./org/org.component";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        component: OrganizationComponent
    },
    {
        path: 'map',
        canActivate: [AuthGuardService],
        component: OrgComponent
    }
];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
} )
export class OrganizationRoutingModule { }
