import {SchedulerService} from "../../../../service/scheduler/scheduler.service";
import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css'],
  providers: [SchedulerService]
})
export class JobdetailComponent implements OnInit, AfterViewInit {
  
  availableJobClasses;
  
  ngAfterViewInit(): void {
    $(document).ready(() => {
      return $('.selectpicker').selectpicker();
    });
  }

  @Input() jobClassName: string;
  @Input() cornExpression: string;
  @Input() create: boolean;
  active: boolean;
  @Input() title:string;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private schedulerService: SchedulerService) {}

  ngOnInit() {
    this.availableJobClasses = this.schedulerService.getJobClasses();
    this.active = true;
  }

  onClick(value: any) {

    this.onSubmit.emit(
      {
        action: value,
        create: this.create,

        jobClassName: this.jobClassName,
        cornExpression: this.cornExpression,
        active: this.active
      });  // 传播事件   
  }
}
