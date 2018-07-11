import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var Treant: any;

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit,AfterViewInit{
    ngAfterViewInit(): void {
        var config = {
                container: "#basic-example",
                
                connectors: {
                    type: 'step'
                },
                node: {
                    HTMLclass: 'nodeExample1'
                }
            },
            ceo = {
                text: {
                    name: "Mark Hill",
                    title: "Chief executive officer",
                    contact: "Tel: 01 213 123 134",
                },
                image: "assets/img/user2-160x160.jpg"
            },

            cto = {
                parent: ceo,
                text:{
                    name: "Joe Linux",
                    title: "Chief Technology Officer",
                },
                stackChildren: true,
                image: "assets/img/user2-160x160.jpg"
            },
            cbo = {
                parent: ceo,
                stackChildren: true,
                text:{
                    name: "Linda May",
                    title: "Chief Business Officer",
                },
                image: "assets/img/user2-160x160.jpg"
            },
            cdo = {
                parent: ceo,
                text:{
                    name: "John Green",
                    title: "Chief accounting officer",
                    contact: "Tel: 01 213 123 134",
                },
                image: "assets/img/user2-160x160.jpg"
            },
            cio = {
                parent: cto,
                text:{
                    name: "Ron Blomquist",
                    title: "Chief Information Security Officer"
                },
                image: "assets/img/user2-160x160.jpg"
            },
            ciso = {
                parent: cto,
                text:{
                    name: "Michael Rubin",
                    title: "Chief Innovation Officer",
                    contact: {val: "we@aregreat.com", href: "mailto:we@aregreat.com"}
                },
                image: "assets/img/user2-160x160.jpg"
            },
            cio2 = {
                parent: cdo,
                text:{
                    name: "Erica Reel",
                    title: "Chief Customer Officer"
                },
                link: {
                    href: "http://www.google.com"
                },
                image: "assets/img/user2-160x160.jpg"
            },
            ciso2 = {
                parent: cbo,
                text:{
                    name: "Alice Lopez",
                    title: "Chief Communications Officer"
                },
                image: "assets/img/user2-160x160.jpg"
            },
            ciso3 = {
                parent: cbo,
                text:{
                    name: "Mary Johnson",
                    title: "Chief Brand Officer"
                },
                image: "assets/img/user2-160x160.jpg"
            },
            ciso4 = {
                parent: cbo,
                text:{
                    name: "Kirk Douglas",
                    title: "Chief Business Development Officer"
                },
                image: "assets/img/user2-160x160.jpg"
            }

           var chart_config = [
                config,
                ceo,
                cto,
                cbo,
                cdo,
                cio,
                ciso,
                cio2,
                ciso2,
                ciso3,
                ciso4
            ];
        var my_chart = new Treant(chart_config);
    }
    
  constructor() { } 

  ngOnInit() {
      
  }

}
