import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { OrgService } from "../../../../../service/org/org.service";
import ActionPath from '../../../../../common/constants/action.path';
declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [OrgService]
})
export class DetailComponent implements OnInit {

    ngAfterViewInit(): void {
//      $( document ).ready(() => {
//          return $( '.selectpicker' ).selectpicker();
//      } );
  }

  private comes = '';
  employee = {
      firstname: '',
      lastname: '',
      employeeid: 0,
      nickname:'',
      email:'',
      phonenumber:'',
      nationality:'',
      status:''
  };
  @Input() action: string;

  constructor( private orgService: OrgService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router ) {
      activatedRoute.queryParams.subscribe( queryParams => {
          this.action = queryParams.action;
          this.comes = queryParams.comes;
          this.employee.employeeid = queryParams.employeeid

          if ( this.action !== 'create' ) {
              this.getEmployee( this.employee.employeeid );
          }

      } )
  }

  ngOnInit() {
      $( '.selectpicker' ).selectpicker();
//      $( document ).ready(() => {
//          return $( '.selectpicker' ).selectpicker();
//      } );
  }

  onCancel() {
      this.navBack();
  }

  navBack() {
      if ( this.comes ) {
          this.router.navigate( [this.comes] );
      }
  }

  navView( employeeid ) {
      this.router.navigate( ['/org/employee'], {
          queryParams: {
              action: 'view',
              employeeid: employeeid,
              comes: this.comes
          }
      } );
  }

  onSave() {
      const data = {
          action: this.action,
          employee: this.employee
      }

      if ( this.action == 'create' ) {
          let actionUrl = ActionPath.org.employees;
          var employee = this.orgService.createEmplyee( actionUrl, data ).then( back => {
              if ( back.code == 200 ) {
                  this.employee = back.data;
                  this.navView( this.employee.employeeid );
              }
          } );
      } else if ( this.action == 'edit' ) {
      }
  }

  onEdit() {
      this.action = 'edit';
  }
  /**************************************************************************************************************/

  getEmployee( employeeid ) {
      let actionUrl = ActionPath.org.employees + '/' + employeeid;
      var employee = this.orgService.getEmployee( actionUrl ).then( back => {
          if ( back.code == 200 ) {
              this.employee = back.data;
          }
      } );
  }

}
