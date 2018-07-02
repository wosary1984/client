import { job } from "../../../../model/jobdata";
import { SchedulerService } from "../../../../service/scheduler/scheduler.service";
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import ActionPath from '../../../../common/constants/action.path';

declare var $: any;

@Component( {
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.css'],
    providers: [SchedulerService]
} )
export class JobComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        $( document ).ready(() => {
            return $( '.selectpicker' ).selectpicker();
        } );
    }

    jobs: job[];
    create = false;
    editScheduler: string;

    constructor( private schedulerService: SchedulerService, private router: Router ) { }

    ngOnInit() {
        this.refresh();
    }

    rowClicked( element: any ) {
        console.log( element );
    }

    refresh( element?: any ) {
        let actionUrl = ActionPath.cookie.jobs;
        //let actionUrl = 'api/queryJobs';
        this.schedulerService.query( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                let data = back.data;
                if ( data.code === 200 && data.success == true ) {
                    this.jobs = data.data;
                }
            }

        } );

        $( document ).ready(() => {
            $( '.box' ).boxWidget();
        } );
    }

    resumeJob( jobClassName: string ) {
        let actionUrl = ActionPath.cookie.resumejob;
        this.schedulerService.resumeJob( jobClassName, actionUrl ).then( back => {
            if ( back.code == 200 ) {
                let data = back.data;
                if ( data.code === 200 && data.success == true ) {
                    this.jobs = data.data;
                }
            }
        } );
    }

    pauseJob( jobClassName: string ) {
        let actionUrl = ActionPath.cookie.pausejob;
        this.schedulerService.pauseJob( jobClassName, actionUrl ).then( back => {
            if ( back.code == 200 ) {
                let data = back.data;
                if ( data.code === 200 && data.success == true ) {
                    this.jobs = data.data;
                }
            }
        } );
    }

    deleteJob( jobClassName: string ) {
        let actionUrl = ActionPath.cookie.deletejob;
        this.schedulerService.deleteJob( jobClassName, actionUrl ).then( back => {
            if ( back.code == 200 ) {
                let data = back.data;
                if ( data.code === 200 && data.success == true ) {
                    this.jobs = data.data;
                }
            }
        } );
    }

    createScheduler( jobClassName: string, cornExpression: string, active: boolean ) {
        let actionUrl = ActionPath.cookie.addjob;
        this.schedulerService.createScheduler( jobClassName, cornExpression, active, actionUrl ).then( back => {
            if ( back.code == 200 ) {
                let data = back.data;
                if ( data.code === 200 && data.success == true ) {
                    this.jobs = data.data;
                }
            }
        } );
    }

    add() {
        this.create = true;
        this.editScheduler = '';
    }

    editJob( jobClassName: string ) {
        this.editScheduler = jobClassName;
        this.create = false;
    }

    onSubmit( value: any ) {
        if ( value.action == 'cancel' ) {
            this.editScheduler = '';
        } else if ( value.action == 'delete' && value.jobClassName != undefined ) {
            this.editScheduler = '';
            this.deleteJob( value.jobClassName );
        } else if ( value.action == 'submit' && value.jobClassName != undefined && value.cornExpression != undefined ) {
            this.editScheduler = '';
            this.createScheduler( value.jobClassName, value.cornExpression, true );
        }
        if ( value.create == true ) {
            this.create = false;
        }

    }
}
