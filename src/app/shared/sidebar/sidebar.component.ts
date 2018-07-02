import { MenuService } from "../../service/menu.service";
import { UserService } from "../../service/user/user.service";
import ActionPath from '../../common/constants/action.path';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component( {
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [MenuService, UserService]
} )
export class SidebarComponent implements OnInit {

    isActive = true;
    showMenu = '';
    check: string;


    showSubMenu = '';
    username = '';

    treeMenus;



    constructor( @Inject( 'auth' ) private service, private menuSerive: MenuService, private userService: UserService ) { }

    ngOnInit() {

        this.username = sessionStorage.getItem( 'username' );
        if ( this.service.userAuth && this.service.userAuth.isLogged && this.service.userAuth.user ) {
            this.username = this.service.userAuth.user.username;
        }

        let actionUrl = ActionPath.sidebar.menu;
        this.userService.getAllViews( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                //console.log(back.data);
                this.treeMenus = back.data;
            }
        } );

        //this.treeMenus = this.menuSerive.getTreeMenus();
    }

    addExpandClass( element: any ) {
        if ( element === this.showMenu ) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    addActiveClass( element: any ) {
        if ( element === this.check ) {
            this.check = '0';
        } else {
            this.check = element;
        }
    }
}
