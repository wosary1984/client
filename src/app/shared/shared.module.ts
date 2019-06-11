import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HeaderNavigationComponent } from '../shared/header-navigation/header-navigation.component';
import { SearchComponent } from "./search/search.component";
import { GraphComponent } from "../d3/visuals/graph/graph.component";
import { D3_DIRECTIVES, D3Service } from "../d3";
import { SHARED_VISUALS } from '../d3/visuals/shared';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        HeaderNavigationComponent,
        SearchComponent,
        GraphComponent,
        ...SHARED_VISUALS,
        ...D3_DIRECTIVES

    ],
    exports: [HeaderNavigationComponent, SearchComponent,GraphComponent],
    providers: [D3Service]
} )
export class SharedModule { }  
