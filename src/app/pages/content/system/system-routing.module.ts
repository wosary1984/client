import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdetailComponent } from "./users/userdetail/userdetail.component";
import { UsersComponent } from "./users/users.component";
import { AuthGuardService } from "../../../service/auth-guard.service";
import { RolesComponent } from "./roles/roles.component";
import { RoleComponent } from "./roles/role/role.component";
import { PrivilegesComponent } from "./privileges/privileges.component";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        component: UsersComponent
    },
    {
        path: 'users',
        canActivate: [AuthGuardService],
        component: UsersComponent
    },
    {
        path: 'user/edituser',
        canActivate: [AuthGuardService],
        component: UserdetailComponent
    },
    {
        path: 'user/createuser',
        canActivate: [AuthGuardService],
        component: UserdetailComponent
    },
    {
        path: 'roles',
        canActivate: [AuthGuardService], 
        component: RolesComponent
    },
    {
        path: 'roles/editrole',
        canActivate: [AuthGuardService],
        component: RoleComponent
    },
    {
        path: 'roles/createrole',
        canActivate: [AuthGuardService],
        component: RoleComponent
    },
    {
        path: 'privileges',
        canActivate: [AuthGuardService],
        component: PrivilegesComponent
    }
];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
} )
export class SystemRoutingModule { }
