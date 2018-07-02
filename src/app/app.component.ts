import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
//import 'admin-lte';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe(queryParams => {
      const path = queryParams.path;
      const navigateTo = '/' + path;
      if (path) {
      this.router.navigate([navigateTo]);
    }
    });
  }
  ngOnInit(): void {
    
  }
  title = 'app';
}
