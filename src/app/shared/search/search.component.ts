import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component( {
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
} )
export class SearchComponent implements OnInit {

    @Input() bVisibleSearch: boolean;

    private sSearchText: string;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() {

        //this.visible = false;
        //this.sSearchText = 'test';
    }

    /**************************************************************************************************************/
    onClick( value: any ) {
        this.onSubmit.emit(
            {
                action:'search',
                value: value
            } );
    }
    /**************************************************************************************************************/

}
