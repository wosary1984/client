import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HeaderNavigationComponent } from '../shared/header-navigation/header-navigation.component';
import { SearchComponent } from "./search/search.component";

@NgModule( {
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        HeaderNavigationComponent,
        SearchComponent

    ],
    exports: [HeaderNavigationComponent, SearchComponent],
    providers: []
} )
export class SharedModule { } 
