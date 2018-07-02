import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../../service/user/user.service";
import ActionPath from '../../../../common/constants/action.path';

@Component( {
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [UserService]
} )
export class UsersComponent implements OnInit {


    users;

    constructor( private userService: UserService, private router: Router ) { }


    ngOnInit() {
        this.refresh();
    }

    editUser( userid: string ) {
        this.router.navigate( ['/system/user/edituser'], {
            queryParams: {
                userid: userid,
                action:'edit'
            }
        } );
    }
    
    createUser( userid: string ) {
        this.router.navigate( ['/system/user/edituser'], {
            queryParams: {
                action:'create'
            }
        } );
    }
    
    refresh(){
        let actionUrl = ActionPath.admin.users;
        this.userService.getAllUsers( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                this.users = back.data;
            }
        } );
    }

}
