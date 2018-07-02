import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../../../service/user/user.service";
import ActionPath from '../../../../../common/constants/action.path';
declare var $: any;
@Component( {
    selector: 'app-userdetail',
    templateUrl: './userdetail.component.html',
    styleUrls: ['./userdetail.component.css'],
    providers: [UserService]
} )
export class UserdetailComponent implements OnInit, AfterViewInit {

    action = '';
    user = {
        userid: '',
        username: '',
        granttype:'',
        roles: [],
        privileges: []
    };
    initializeRole = false;
    roles = [];

    privileges = [];
    privileges2=[];
    
    ngAfterViewInit(): void {
        $( document ).ready(() => {
            return $( '.selectpicker' ).selectpicker();
        } );
    }

    constructor( private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router ) {
        activatedRoute.queryParams.subscribe( queryParams => {
            this.action = queryParams.action;
            
            if ( this.action ==='edit'&& queryParams.userid != null ) {
                this.getUserbyUserId( queryParams.userid );
                this.getRoles();
                this.getPrivileges();
            }
            else if(this.action ==='create'){
                this.getRoles();
                this.getPrivileges();
            }
        } );

    }

    ngOnInit() {

    }

    selectTab( element: any ) {
        if (!this.initializeRole ) {
            this.initializeRole = true;
            for ( let role of this.roles ) {
                for ( let entry of this.user.roles ) {
                    if ( role.id === entry.role.id ) {
                        role.selected = true;
                    }
                }
            }

            this.initalRoleTabDataModel();

        }
        if ( element === 'privilege') {

            //let fs = this.privileges;
            let fs =  JSON.parse(JSON.stringify(this.privileges2));
            if(this.user.granttype==='ROLE'){
                let ps = [];
                for ( let role of this.roles ) {
                    if(role.selected){
                        for(let p of role.privileges){
                            ps.push(p);
                        }
                    }
                }
                this.initalPrivilegeTabDataModel(fs,ps);
                this.privileges = JSON.parse(JSON.stringify(fs));
            }
            else if(this.user.granttype==='PRIVILEGE'){
                this.initalPrivilegeTabDataModel(fs,this.user.privileges);
                this.privileges = JSON.parse(JSON.stringify(fs));
            }
           

        }

    }

    /*
     * Inital Role View Data Model Function
     * */
    initalRoleTabDataModel() {
        for ( let r of this.roles ) {
            this.recursion( r.top, r.privileges );
            //console.log( r );
        }
    }
    recursion( top, target ) {
        for ( let p of top ) {
            p.childs = [];
            for ( let x of target ) {
                if ( p.fid == x.privilege.parentid ) {
                    p.childs.push( x.privilege );
                }
            }
            this.recursion( p.childs, target );
        }
    }
    /************************************************************************************************************/

    /*
     * Initial Privilege View Data Model Function
     * */
    initalPrivilegeTabDataModel(allPrivileges,selectedPrivileges){

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


    getUserbyUserId( userid: string ) {
        let actionUrl = ActionPath.admin.user +'/'+ userid;
        this.userService.get( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                //console.log( back.data );
                this.user = back.data;
            }
        } );
    }

    getRoles() {
        let actionUrl = ActionPath.admin.roles;
        this.userService.get( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                //console.log( back.data );
                this.roles = back.data;

                for ( let r of this.roles ) {
                    let top = [];
                    for ( let p of r.privileges ) {
                        if ( p.privilege.parentid == null ) {
                            top.push( p.privilege );
                        }
                    }
                    r.top = top;
                }
            }
        } );
    }


    getPrivileges() {
        let actionUrl = ActionPath.admin.functions
        this.userService.get( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                //console.log( back.data );
                this.privileges = back.data;
                this.privileges2 = JSON.parse(JSON.stringify(this.privileges));
            }
        } );
    }

    cancel() {
        this.router.navigate( ['system/users'] );
    }

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

    save() {

        const privileges = [];
        const roles=[];

        this.getSelected( this.privileges, privileges );
        this.getSelectedRoles(this.roles,roles);

        //console.log( privileges );
        let data = {
            user: this.user,
            privileges: privileges,
            roles:roles,
            action:this.action,
            initializeRole:this.initializeRole
        }
        console.log( data );
        let actionUrl;
        if(this.action ==='edit'){
            actionUrl = ActionPath.admin.user + '/' + this.user.userid;
        }
        else if(this.action ==='create'){
            actionUrl = ActionPath.admin.user ;
        }
        this.userService.updateUser( actionUrl, data ).then( back => {
            if ( back.code == 200 ) {
                this.router.navigate( ['system/users'] );
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
    
    getSelectedRoles(rs,roles){
        for(let r of rs){
            if(r.selected){
                roles.push(r);
            }
        }
    }
    /************************************************************************************************************/
}
