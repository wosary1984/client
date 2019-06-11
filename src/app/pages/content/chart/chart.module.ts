import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ForceDirectedComponent } from './force-directed/force-directed.component';
import { SharedModule } from "../../../shared/shared.module";
import { CollisionDetectionComponent } from './collision-detection/collision-detection.component';

const routes: Routes = [
    {
        path: 'force-directed',
        component: ForceDirectedComponent
    },
    {
        path: 'collision-detection',
        component: CollisionDetectionComponent
    }
];

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild( routes ),
        SharedModule
    ],
    declarations: [ForceDirectedComponent, CollisionDetectionComponent],
    providers: [],

} )
export class ChartModule {

}