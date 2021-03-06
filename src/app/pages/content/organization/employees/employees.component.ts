import { Component, OnInit } from '@angular/core';
import ActionPath from '../../../../common/constants/action.path';
import { Router } from "@angular/router";
import { OrgService } from "../../../../service/org/org.service";
@Component( {
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    providers: [OrgService]
} )
export class EmployeesComponent implements OnInit {

    employees;

    constructor( private orgService: OrgService, private router: Router ) { }

    ngOnInit() {
        this.onRefresh();
    }

    onRefresh() {
        let actionUrl = ActionPath.org.employees;
        this.orgService.getEmployees( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                this.employees = back.data;
            }
        } );
    }

    onCreateEmployee() {
        this.router.navigate( ['/org/employee'], {
            queryParams: {
                action: 'create',
                comes: 'org/employees'
            }
        } );
    }

    onView( employeeid ) {

        this.router.navigate( ['/org/employee'], {
            queryParams: {
                action: 'view',
                employeeid: employeeid,
                comes: 'org/employees'
            }
        } );
    }
    onEditEmployee( employeeid ) {
        this.router.navigate( ['/org/employee'], {
            queryParams: {
                action: 'edit',
                employeeid: employeeid,
                comes: 'org/employees'
            }
        } );
    }

}
