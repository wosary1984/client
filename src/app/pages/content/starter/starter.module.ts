import {NgModule} from '@angular/core';
import {StarterComponent} from "./starter.component";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [{
  path: '',
  component: StarterComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [StarterComponent]
})
export class StarterModule {

}