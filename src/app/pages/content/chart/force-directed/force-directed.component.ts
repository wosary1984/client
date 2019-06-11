import { Component, OnInit } from '@angular/core';
import { Link, Node } from "../../../../d3/index";

declare var $: any;

@Component( {
    selector: 'app-force-directed',
    templateUrl: './force-directed.component.html',
    styleUrls: ['./force-directed.component.css']
} )
export class ForceDirectedComponent implements OnInit {

    sPageName: string = 'Force Directed';
    nodes: Node[] = [];
    links: Link[] = [];

    constructor() {
        $.ajaxSettings.async = false;
        var that = this;
        $.getJSON( "/assets/miserables.json", function( data ) {
            //console.log( data );
            that.links = data.links;
            for ( let i = 0; i < data.nodes.length; i++ ) {
                that.nodes.push( new Node( data.nodes[i].id ) );
            }
        } )
    }

    ngOnInit() {





    }
}
