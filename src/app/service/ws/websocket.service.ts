import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from "@stomp/stompjs";
import { StompService, StompState } from "@stomp/ng2-stompjs";
import { map } from "rxjs/operators";
import { WebSocketConfig } from "../../common/config/websocket.config";

@Injectable()
export class WebsocketService {

    public message: Observable<Message>;


    public wsstate: Observable<string>;


    constructor( @Inject( 'auth' ) private authService, private stompService: StompService ) { }

    public connectWebSocket() {

        this.wsstate = this.stompService.state.pipe( map(( state: number ) => StompState[state] ) );

        if ( this.authService.userAuth != undefined && this.authService.userAuth.user != undefined ) {
            this.message = this.stompService.subscribe( WebSocketConfig.subscribPrefix + this.authService.userAuth.user.username );
        }
    }

    public getSocketDataObservable() {

        return this.message;

    }
    public getSocketStateObservable() {

        return this.wsstate;

    }
}
