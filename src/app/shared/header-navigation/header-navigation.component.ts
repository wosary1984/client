import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component( {
    selector: 'app-header-navigation',
    templateUrl: './header-navigation.component.html',
    styleUrls: ['./header-navigation.component.css']
} )
export class HeaderNavigationComponent implements OnInit {

    @Input() sName: string;
    @Input() bVisibleSearch: boolean;

    @Input() aAction = [];

    @Output() onAction: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {


    }

    onClick( value: any ) {
        this.onAction.emit(
            {
                action: value
            } );
    }

    onSubmit( value: any ) {
        this.onAction.emit( value );
    }

}
