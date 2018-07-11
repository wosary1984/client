import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { OrganizationRoutingModule } from "./organization-routing.module";
import { OrganizationComponent } from "./organization.component";
import { OrgComponent } from './org/org.component';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        OrganizationRoutingModule
    ],
    declarations: [OrganizationComponent, OrgComponent]
} )
export class OrganizationModule {

}