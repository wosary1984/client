import { SchedulerService } from "../service/scheduler/scheduler.service";
import { HeaderNavigationComponent } from '../shared/header-navigation/header-navigation.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {PageComponent} from './pages.component';
import { HomeComponent } from './content/home/home.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    //NgbModule.forRoot()
  ],
  declarations: [
    PageComponent,
    HeaderNavigationComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent
  ],
  providers: []
})
export class PagesModule {}
