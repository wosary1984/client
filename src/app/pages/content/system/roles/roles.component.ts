import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import ActionPath from '../../../../common/constants/action.path';
import { RoleService } from "../../../../service/role/role.service";

@Component( {
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css'],
    providers: [RoleService]
} )
export class RolesComponent implements OnInit {

    roles;

    constructor( private userService: RoleService, private router: Router ) { }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        let actionUrl = ActionPath.admin.roles;
        this.userService.getAllRoles( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                this.roles = back.data;
            }
        } );
    }
    
    editRole( roleid: string ) {
        this.router.navigate( ['/system/roles/editrole'], {
            queryParams: {
                roleid: roleid,
                action:'edit'
            }
        } );
    }
    
    createRole( ) {
        this.router.navigate( ['/system/roles/editrole'], {
            queryParams: {
                action:'create'
            }
        } );
    }
}
