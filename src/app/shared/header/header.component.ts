import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { Message } from '@stomp/stompjs';
import { CommonService } from "../../service/common/common.service";
import { WebsocketService } from "../../service/ws/websocket.service";
import ActionPath from '../../common/constants/action.path';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [CommonService, WebsocketService]
} )
export class HeaderComponent implements OnInit {

    private username = '';
    private oReceivedMsg;
    private aMessages = [];
    private datasubscription: Subscription;
    private statesubscription: Subscription;

    constructor( @Inject( 'auth' ) private service, private router: Router, private commonService: CommonService, private websocketService: WebsocketService ) {

    }

    ngOnInit() {

        this.username = sessionStorage.getItem( 'username' );
        if ( this.service.userAuth && this.service.userAuth.isLogged && this.service.userAuth.user ) {
            this.username = this.service.userAuth.user.username;
        }

        this.getUserMessages();

        this.websocketService.connectWebSocket();

        this.datasubscription = this.websocketService.getSocketDataObservable().subscribe( this.onData );

        this.statesubscription = this.websocketService.getSocketStateObservable().subscribe( this.onStateChange );

    }

    private onData = ( message: Message ) => {

        this.oReceivedMsg = JSON.parse( message.body );

        //console.log( this.oReceivedMsg );
        
        this.getUserMessages();

        //this.uiData = JSON.parse( message.body );
    }

    private onStateChange = ( state: String ) => {
        console.log( 'WS connection state changed ' + state );
    }

    getUserMessages() {
        let actionUrl = ActionPath.message.get_user_received_message + '/' + this.username;
        let name = 'HeaderComponent-getUserMessages'
        this.commonService.get( actionUrl, name ).then( back => {
            if ( back.code == 200 ) {
                this.aMessages = back.data;
                for ( let i in this.aMessages ) {
                    var a = new Date( this.aMessages[i].createdDate ).getTime();
                    var b = new Date().getTime();
                    var r = ( b - a ) / 1000 / 60;

                    //console.log(parseInt(r.toString())) ;
                    
                    this.aMessages[i].mins = parseInt(r.toString());
                }

            }
        } );
    }

    onClick_logout() {

        this.service
            .logout()
            .then( back => {
                if ( back.success ) {

                } else {
                    console.log( back.message );
                }
            } );
        sessionStorage.removeItem( 'username' );
        this.router.navigate( ['/login'] );
    }
}
