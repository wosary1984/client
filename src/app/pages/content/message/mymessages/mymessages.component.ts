import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from "../../../../service/common/common.service";
import ActionPath from '../../../../common/constants/action.path';

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-mymessages',
    templateUrl: './mymessages.component.html',
    styleUrls: ['./mymessages.component.css'],
    providers: [CommonService]
} )
export class MymessagesComponent implements OnInit {

    private sPageName = "Messaging";
    private aUsers;

    constructor( private commonService: CommonService ) { }

    ngOnInit() {
        this.getUserList();
    }

    getUserList() {
        let actionUrl = ActionPath.message.get_all_users;
        let name = 'MymessagesComponent-getUserList'
        this.commonService.get( actionUrl, name ).then( back => {
            if ( back.code == 200 ) {
                this.aUsers = back.data;
            }
        } );
    }
    /**************************************************************************************************************/
    onSelectUser(user){
        console.log(user);
    }

}
