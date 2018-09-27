import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { MymessagesComponent } from './mymessages/mymessages.component';
import { SharedModule } from "../../../shared/shared.module";
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
    declarations: [MymessagesComponent]

} )
export class MessageModule {

}