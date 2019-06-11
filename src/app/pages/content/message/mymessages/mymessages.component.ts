import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs";
import { Message } from '@stomp/stompjs';
import { CommonService } from "../../../../service/common/common.service";
import ActionPath from '../../../../common/constants/action.path';
import { WebsocketService } from "../../../../service/ws/websocket.service";

declare var $: any;

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-mymessages',
    templateUrl: './mymessages.component.html',
    styleUrls: ['./mymessages.component.css'],
    providers: [CommonService, WebsocketService]
} )
export class MymessagesComponent implements OnInit {

    private sPageName = "Messaging";
    private aUsers = [];
    private aMessages = [];
    private oSendMsg;
    private oReceivedMsg
    private sMessage;
    private oSelectedUser = {
        username: ''
    };
    private datasubscription: Subscription;
    private statesubscription: Subscription;


    constructor( private commonService: CommonService, private websocketService: WebsocketService ) { }

    ngOnInit() {
        this.getUserList();

        this.websocketService.connectWebSocket();

        this.datasubscription = this.websocketService.getSocketDataObservable().subscribe( this.onData );

        this.statesubscription = this.websocketService.getSocketStateObservable().subscribe( this.onStateChange );
    }
    private onData = ( message: Message ) => {

        this.oReceivedMsg = JSON.parse( message.body );

        if ( this.oSelectedUser.username === this.oReceivedMsg.sender ) {

            //TODO: tell server the message is read
            this.updateMessagesState( [this.oReceivedMsg] );
            this.oReceivedMsg.read = true;
            this.aMessages.push( this.oReceivedMsg );
            setTimeout(() => { this.scrollBottom(); }, 100 );

        }
        else {
            for ( let i in this.aUsers ) {
                if ( this.aUsers[i].username === this.oReceivedMsg.sender && this.oReceivedMsg.read == false ) {
                    this.aUsers[i].unreadMsg = this.aUsers[i].unreadMsg + 1;
                    break;
                }
            }
        }
        //this.uiData = JSON.parse( message.body );
    }

    private onStateChange = ( state: String ) => {
        console.log( 'WS connection state changed ' + state );
    }

    ngOnDestroy() {
        this.datasubscription.unsubscribe();
        this.statesubscription.unsubscribe();
    }

    getUserList() {
        let actionUrl = ActionPath.message.get_all_users_except_me;
        let name = 'MymessagesComponent-getUserList'
        this.commonService.get( actionUrl, name ).then( back => {
            if ( back.code == 200 ) {
                this.aUsers = back.data;
            }
        } );
    }

    getUserMessages( user ) {
        let actionUrl = ActionPath.message.get_user_message + '/' + user.username;
        let name = 'MymessagesComponent-getUserMessages'
        this.commonService.get( actionUrl, name ).then( back => {
            if ( back.code == 200 ) {
                this.aMessages = back.data;

                setTimeout(() => { this.scrollBottom(); }, 500 );
            }
        } );
    }

    sendMessage( data ) {
        let actionUrl = ActionPath.message.send_message;
        let name = 'MymessagesComponent-sendMessage'
        this.commonService.post( actionUrl, data, name ).then( back => {
            if ( back.code == 200 ) {
                this.oSendMsg = back.data;
                this.aMessages.push( this.oSendMsg );
                setTimeout(() => { this.scrollBottom(); }, 500 );
            }
        } );
    }

    updateMessagesState( data ) {
        let actionUrl = ActionPath.message.update_message;
        let name = 'MymessagesComponent-updateMessagesState'
        this.commonService.post( actionUrl, data, name ).then( back => {
            if ( back.code == 200 ) {
                //this.oSendMsg = back.data;
                //this.aMessages.push( this.oSendMsg );
            }
        } );
    }
    /**************************************************************************************************************/
    onSelectUser( user ) {

        user.unreadMsg = 0;

        this.oSelectedUser = user;

        this.getUserMessages( user );

    }

    scrollBottom() {
        var x = $( '#idMessageHistory' );
        x.scrollTop( 10000 );
    }

    onSendMsg( msg ) {
        if ( this.oSelectedUser.username !== '' && msg !== '' ) {
            var data = {
                messageid: this.commonService.generateUUID( 'msg' ),
                content: msg,
                receiver: this.oSelectedUser.username
            }
            this.sendMessage( data );
            this.sMessage = '';
        }

    }

    onKeydown( event ) {
        if ( event.key === "Enter" ) {
            this.onSendMsg( this.sMessage );
        }
    }

}
