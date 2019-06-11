import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component( {
    selector: 'app-collision-detection',
    templateUrl: './collision-detection.component.html',
    styleUrls: ['./collision-detection.component.css']
} )
export class CollisionDetectionComponent implements OnInit {

    sPageName: string = 'Collision Detection';

    constructor() { }

    ngOnInit() {

        var nodes = d3.range( 200 ).map( function() { return { radius: Math.random() * 12 + 4 }; } ),
            root = nodes[0];
        //color = d3.scale.category10();

        root.radius = 0;
        //root.fixed = true;
        var simulation = d3.forceSimulation()
            .nodes( nodes )
            .force( "charge", d3.forceManyBody() )
            .force( "center", d3.forceCenter() );
        
        //simulation.start();
    }

}
