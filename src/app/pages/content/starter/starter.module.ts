import { NgModule } from '@angular/core';
import { StarterComponent } from "./starter.component";
import { Routes, RouterModule } from "@angular/router";
import { StompService ,StompConfig} from "@stomp/ng2-stompjs";
import { stompConfig } from "../../../common/config/stomp.config";

const routes: Routes = [{
    path: '',
    component: StarterComponent
}];

@NgModule( {
    imports: [
        RouterModule.forChild( routes )
    ],
    providers: [
        StompService,
        { provide: StompConfig, useValue: stompConfig }
    ],
    declarations: [StarterComponent]
} )
export class StarterModule {

}