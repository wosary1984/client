import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Link, Node } from '../../../d3';
import APP_CONFIG from '../../../common/config/app.config'

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-starter',
    templateUrl: './starter.component.html',
    styleUrls: ['./starter.component.css']
} )
export class StarterComponent implements OnInit, AfterViewInit {

    sPageName: string = 'start';
    nodes: Node[] = [];
    links: Link[] = [];

    ngAfterViewInit(): void {

    }
 
    constructor() {
        const N = APP_CONFIG.N,
            getIndex = number => number - 1;

        /** constructing the nodes array */
        for ( let i = 1; i <= N; i++ ) {
            this.nodes.push( new Node( i ) );
        }

        for ( let i = 1; i <= N; i++ ) {
            for ( let m = 2; i * m <= N; m++ ) {
                /** increasing connections toll on connecting nodes */
                this.nodes[getIndex( i )].linkCount++;
                this.nodes[getIndex( i * m )].linkCount++;

                /** connecting the nodes before starting the simulation */
                this.links.push( new Link( i, i * m ) );
            }
        }
    }

    ngOnInit() {

    }



}
