import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

    title: string;
    message: string;

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.title = queryParams.title;
      this.message = queryParams.message;
    });
  }

  ngOnInit() {
    //this.title = "Service is not avaiable!"
  }

}
