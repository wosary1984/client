import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import ActionPath from '../../../../common/constants/action.path';
import { OrgService } from "../../../../service/org/org.service";

@Component( {
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.css'],
    providers: [OrgService]
} )
export class DepartmentComponent implements OnInit {

    comes;
    department = {
        action:'',
        parentid: '',
        parentName: '',
        parentType: '',
        name: '',
        description: '',
        manager: ''
    }

    constructor( private orgService: OrgService,private activatedRoute: ActivatedRoute, private router: Router ) {
        activatedRoute.queryParams.subscribe( queryParams => {
            this.department.action = queryParams.action;
            this.department.parentid = queryParams.parentid;
            this.department.parentName = queryParams.parentName;
            this.department.parentType = queryParams.type;
            this.comes = queryParams.comes;

            if ( this.department.action === undefined){
                this.router.navigate( ['/'] );
            } 
        } );
    }

    ngOnInit() {
    }

    cancel() {
        this.navBack();
    }
    navBack(){
        if ( this.comes ) {
            this.router.navigate( [this.comes] );
        }
    }

    save() {
        let actionUrl;
        if(this.department.action ==='edit'){
            //actionUrl = ActionPath.org.department + '/' + this.user.userid;
        }
        else if(this.department.action ==='create'){
            actionUrl = ActionPath.org.department;
        }
        this.orgService.createDepartment( actionUrl, this.department ).then( back => {
            if ( back.code == 200 ) {
               
                console.log( back );
                this.navBack();
            }
        } );
    }

}
