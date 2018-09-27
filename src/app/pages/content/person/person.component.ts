import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from "../../../service/common/common.service";
import ActionPath from '../../../common/constants/action.path';

@Component( {
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css'],
    providers: [CommonService]
} )
export class PersonComponent implements OnInit {

    private sPageName = "Persons";
    private aActions = [
        {
            sAction: 'refresh',
            sIcon: 'fa fa-refresh fa-lg'
        },
        {
            sAction: 'add',
            sIcon: 'fa fa-plus fa-lg'
        }
    ]

    persons;

    constructor( private commonService: CommonService, private router: Router ) { }

    ngOnInit() {
        this.refresh();
    }

    onToorBarAction( value: any ) {

        if ( value.action === 'refresh' ) {
            this.refresh();
        } else if ( value.action === 'add' ) {
            this.addPerson();
        } else if ( value.action === 'search' ) {

        }
        console.log( value );

    }

    addPerson() {
        this.router.navigate( ['/persons/detail'], {
            queryParams: {
                action: 'create',
                comes: '/persons'
            }
        } );
    }

    refresh() {
        let actionUrl = ActionPath.person.get_all_person;
        this.commonService.getAllPerson( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                this.persons = back.data;
            }
        } );
    }

    onPersonClick( personid ) {
        this.router.navigate( ['/persons/detail'], {
            queryParams: {
                action: 'view',
                personid: personid,
                comes: '/persons'
            }
        } );
    }

}
