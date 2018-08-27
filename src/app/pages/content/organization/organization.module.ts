import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { OrganizationRoutingModule } from "./organization-routing.module";
import { OrganizationComponent } from "./organization.component";
import { CompanylistComponent } from './companylist/companylist.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentlistComponent } from './departmentlist/departmentlist.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        OrganizationRoutingModule
    ],
    declarations: [OrganizationComponent, CompanylistComponent, CompanyComponent, DepartmentComponent, DepartmentlistComponent, EmployeesComponent, EmployeeComponent]
} )
export class OrganizationModule {

}