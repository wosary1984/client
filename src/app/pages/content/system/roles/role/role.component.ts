import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import ActionPath from '../../../../../common/constants/action.path';
import { RoleService } from "../../../../../service/role/role.service";
@Component( {
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css'],
    providers: [RoleService]
} )
export class RoleComponent implements OnInit {

    role = {
        id: '',
        privileges:[]
    };
    action;
    privileges = [];
    privileges2 = [];
    initial = false;

    constructor( private service: RoleService, private activatedRoute: ActivatedRoute, private router: Router ) {
        activatedRoute.queryParams.subscribe( queryParams => {
            this.action = queryParams.action;

            if ( this.action === 'edit' && queryParams.roleid != null ) {
                this.getRolebyRoleId( queryParams.roleid );
                this.getPrivileges();
            }
            else if ( this.action === 'create' ) {
                this.getPrivileges();
            }
        } );
    }

    ngOnInit() {
    }

    getRolebyRoleId( roleid: string ) {
        let actionUrl = ActionPath.admin.role + '/' + roleid;
        this.service.get( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                console.log( back.data );
                this.role = back.data;
            }
        } );
    }

    getPrivileges() {
        let actionUrl = ActionPath.admin.functions
        this.service.get( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                //console.log( back.data );
                this.privileges = back.data;
                this.privileges2 = JSON.parse( JSON.stringify( this.privileges ) );
            }
        } );
    }



    /************************************************************************************************************/
    selectTab( element: any ) {
        
        if(!this.initial){
            let fs =  JSON.parse(JSON.stringify(this.privileges2));
            this.initalPrivilegeTabDataModel(fs,this.role.privileges);
            this.privileges = JSON.parse(JSON.stringify(fs));
            this.initial = true;
        }
        
    }

    /*
     * Initial Privilege View Data Model Function
     * */
    initalPrivilegeTabDataModel( allPrivileges, selectedPrivileges ) {

        for ( let entry of selectedPrivileges ) {
            this.selectFunction( allPrivileges, entry.privilege.fid );
        }

    }
    selectFunction( fs, fid ) {
        for ( let f of fs ) {
            if ( f.fid === fid ) {
                f.selected = true;
            }
            else {
                this.selectFunction( f.childs, fid );
            }
        }
    }
    /************************************************************************************************************/

    /*
     * On check privilege function
     * */
    onClick( $event, fid: any, parentid: any ) {
        let checked = $event.target.checked;
        for ( let f of this.privileges ) {

            this.checkAllChilds( this.find( f, fid ), fid, checked );
            if ( checked ) {
                this.checkParent( f, parentid, checked );
            }
        }
    }
    
    find( f, fid ): any {

        if ( f.fid === fid ) {
            return f;
        }
        else {
            for ( let f1 of f.childs ) {
                return this.find( f1, fid );
            }
        }

    }
    
    checkAllChilds( f, fid, checked ) {
        if ( f !== null && f != undefined ) {
            for ( let c of f.childs ) {
                c.selected = checked;
                this.checkAllChilds( c, fid, checked );
            }
        }

    }
    checkParent( f, parentid, checked ) {
        if ( parentid != null ) {
            if ( parentid != null && f.fid === parentid ) {
                f.selected = checked;
            }

            for ( let c of f.childs ) {
                if ( c.fid == parentid ) {
                    c.selected = checked;
                    this.checkParent( f, c.parentid, checked );
                }
            }
        }
    }
    /************************************************************************************************************/

    cancel() {
        this.router.navigate( ['system/roles'] );
    }

    /************************************************************************************************************/
    save() {
        const selected_privileges = [];
        this.getSelected( this.privileges, selected_privileges );
        
      //console.log( privileges );
        let data = {
            role: this.role,
            privileges: selected_privileges,
            action:this.action
        }
        console.log(data);
        let actionUrl;
        if(this.action ==='edit'){
            actionUrl = ActionPath.admin.role + '/' + this.role.id;
        }
        if(this.action ==='create'){
            actionUrl = ActionPath.admin.role ;
        }
        this.service.updateRole( actionUrl, data ).then( back => {
            if ( back.code == 200 ) {
                this.router.navigate( ['system/roles'] );
                console.log( back );
            }
        } );
    }
    getSelected( fs, privileges ) {
        for ( let f of fs ) {
            if ( f.selected ) {
                privileges.push( f )
            }
            this.getSelected( f.childs, privileges );
        }
    }
    
    /************************************************************************************************************/
    create(){
        
    }
}
