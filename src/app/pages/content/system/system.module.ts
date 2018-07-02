import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { UserdetailComponent } from "./users/userdetail/userdetail.component";
import { SystemRoutingModule } from "./system-routing.module";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from './roles/roles.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { RoleComponent } from './roles/role/role.component';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        SystemRoutingModule
    ],
    declarations: [UsersComponent, UserdetailComponent, RolesComponent, PrivilegesComponent, RoleComponent]
} )
export class SystemModule {

}