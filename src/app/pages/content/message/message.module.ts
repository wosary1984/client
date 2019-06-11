import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { StompService ,StompConfig} from "@stomp/ng2-stompjs";

import { MymessagesComponent } from './mymessages/mymessages.component';
import { SharedModule } from "../../../shared/shared.module";
import { stompConfig } from "../../../common/config/stomp.config";
const routes: Routes = [
    {
        path: 'my',
        component: MymessagesComponent 
    }
];

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild( routes ),
        SharedModule
    ],
    declarations: [MymessagesComponent],
    providers: [
        StompService,
        { provide: StompConfig, useValue: stompConfig }
    ],

} )
export class MessageModule {

}