import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit,AfterViewInit {
    ngAfterViewInit(): void {
        var testData = [
                        { id: 1, name: 'My Organization', parent: 0 },
                        { id: 2, name: 'CEO Office', parent: 1 },
                        { id: 3, name: 'Division 1', parent: 1 },
                        { id: 4, name: 'Division 2', parent: 1 },
                        { id: 6, name: 'Division 3', parent: 1 },
                        { id: 7, name: 'Division 4', parent: 1 },
                        { id: 8, name: 'Division 5', parent: 1 },
                        { id: 5, name: 'Sub Division', parent: 3 },
                    ];
                    
                    $( document ).ready(() => {
                        let org_chart=  $('#orgChart').orgChart( {
                            data: testData, // your data
                            showControls: false, // display add or remove node button.
                            allowEdit: false, // click the node's title to edit
                            onAddNode: function( node ) { 
                                org_chart.newNode(node.data.id); 
                            },
                            onDeleteNode: function( node ) { },
                            onClickNode: function( node ) { },
                            newNodeText: 'Add Child' // text of add button
                        } );
                    } );
    }

  constructor() { }

  ngOnInit() {
  }

}
