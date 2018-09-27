import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import { PersonComponent } from "./person.component";
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from "../../../shared/shared.module";
const routes: Routes = [
    {
        path: '',
        component: PersonComponent
    },
    {
        path: 'detail',
        component: DetailComponent
    }
    ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [PersonComponent, DetailComponent]
})
export class PersonModule {
 
}