import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "../../../service/auth-guard.service";
import { OrganizationComponent } from "./organization.component";
import { CompanylistComponent } from "./companylist/companylist.component";
import { DepartmentComponent } from "./department/department.component";
import { CompanyComponent } from "./company/company.component";
import { EmployeesComponent } from "./employees/employees.component";
import { DetailComponent } from "./employees/detail/detail.component";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        component: OrganizationComponent
    },
    {
        path: 'companylist',
        canActivate: [AuthGuardService],
        component: CompanylistComponent
    },
    {
        path: 'department',
        canActivate: [AuthGuardService],
        component: DepartmentComponent
    },
    {
        path: 'company',
        canActivate: [AuthGuardService],
        component: CompanyComponent
    },
    {
        path: 'employees',
        canActivate: [AuthGuardService],
        component: EmployeesComponent
    },
    {
        path: 'employee',
        canActivate: [AuthGuardService],
        component: DetailComponent
    }
];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
} )
export class OrganizationRoutingModule { } 
