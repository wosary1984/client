import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;

@Component( {
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.css']
} )
export class OrganizationComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        $( document ).ready(() => {
          $( '#organization-chart' ).stiffChart( {
              lineColor: '#3498db',
              lineWidth: 2,
              lineShape: 'curved',
              enable: true,
              layoutType: 'vertical', // 'vertical' or 'horizontal'
              childCounter: true,
              activeClass: 'chart-active',
              bootstrapPopover: false // enable <a href="https://www.jqueryscript.net/tags.php?/Bootstrap/">Bootstrap</a> popover
          } );
      } );
  
    }
    constructor() { }

    ngOnInit() {
    }

}
