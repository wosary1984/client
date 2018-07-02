import {BaseService} from "../../common/services/base.service";
import {JobBackMessage} from "../../model/jobdata";
import ConstantsList from '../../common/constants/config';
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';


@Injectable()
export class SchedulerService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.servicename = 'SchedulerService-定时任务服务';
  }

  public query(actionUrl: string): Promise<any> {
    const url = this.serviceUrl(actionUrl);
    return this.getCommand(url, 'query');
  }

  public resumeJob(jobClassName: string, actionUrl: string): Promise<any> {
    const url = this.serviceUrl(actionUrl);
    let data = {
      "jobClassName": jobClassName
    };
    return this.postCommand(url, JSON.stringify(data), 'resumeJob');
  }

  public pauseJob(jobClassName: string, actionUrl: string): Promise<any> {
    const url = this.serviceUrl(actionUrl);
    let data = {
      "jobClassName": jobClassName
    };

    return this.postCommand(url, JSON.stringify(data), 'pauseJob');
  }

  public deleteJob(jobClassName: string, actionUrl: string): Promise<any> {
    const url = this.serviceUrl(actionUrl);
    let data = {
      "jobClassName": jobClassName
    };

    return this.postCommand(url, JSON.stringify(data), 'deleteJob');
  }

  public createScheduler(jobClassName: string, cornExpression: string, active: boolean, actionUrl: string): Promise<any> {
    const url = this.serviceUrl(actionUrl);
    let data = {
      "jobClassName": jobClassName,
      "cronExpression": cornExpression,
      "active": active 
    };

    return this.postCommand(url, JSON.stringify(data), 'addJob');
  }

  public getJobClasses() {
    const jobClasses = [
      {shortName: 'good', fullName: 'feng.sport.service.jobs.HelloJob'}
    ];
    return jobClasses;

  }



}
