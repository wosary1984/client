import { NgModule } from '@angular/core';
import { StarterComponent } from "./starter.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";

const routes: Routes = [{
    path: '',
    component: StarterComponent
}];

@NgModule( {
    imports: [
        RouterModule.forChild( routes ),
        SharedModule
    ],
    providers: [],
    declarations: [StarterComponent]
} )
export class StarterModule {

}