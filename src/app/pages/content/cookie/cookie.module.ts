import {NgModule} from '@angular/core';
import {JobComponent} from "./job/job.component";
import {JobdetailComponent} from "./jobdetail/jobdetail.component";
import {CommonModule} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
const routes: Routes = [
    {
        path: '',
        component: JobComponent
    },
    {
        path: 'jobs',
        component: JobComponent
    },
    {
        path: 'detail',
        component: JobdetailComponent
    }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JobComponent, JobdetailComponent]
})
export class CookieModule {
 
}