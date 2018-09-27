import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { Subscription } from "rxjs";

import { Message } from '@stomp/stompjs';

import { WebsocketService } from '../../../service/ws/websocket.service';

declare var $: any;

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-starter',
    templateUrl: './starter.component.html',
    styleUrls: ['./starter.component.css'],
    viewProviders: [WebsocketService]
} )
export class StarterComponent implements OnInit, AfterViewInit {

    private datasubscription: Subscription;


    private statesubscription: Subscription;


    public uiData: {

    };

    ngAfterViewInit(): void {

    }

    constructor( private websocketService: WebsocketService ) {
        //this.initializeWebSocketConnection();
    }

    ngOnInit() {
        this.websocketService.connectWebSocket();

        this.datasubscription = this.websocketService.getSocketDataObservable().subscribe( this.onData );

        this.statesubscription = this.websocketService.getSocketStateObservable().subscribe( this.onStateChange );
    }

    private onData = ( message: Message ) => {

        this.uiData = JSON.parse( message.body );

    }

    private onStateChange = ( state: String ) => {

        console.log( 'WS connection state changed ' + state );

    }

    ngOnDestroy() {
        this.datasubscription.unsubscribe();


        this.statesubscription.unsubscribe();

    }

}
