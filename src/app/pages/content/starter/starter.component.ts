import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit,AfterViewInit {
    ngAfterViewInit(): void {
        
    }

  constructor() { }

  ngOnInit() {
  }

}
