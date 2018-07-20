import { Injectable } from '@angular/core';
import { BaseService } from "../../common/services/base.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrgService extends BaseService {

    constructor( http: HttpClient ) {
        super( http );
        this.servicename = 'UserService-Orginazition 服务';
    }

    public createCompany( actionUrl: string, data: any ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, data, 'createCompany' );
    }
    
    public editCompany( actionUrl: string, data: any ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, data, 'editCompany' );
    }

    public getCompanies( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'getCompanies' );
    }
    
    public getCompanyLogo( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getBlobCommand( url, 'getCompanyLogo' );
    }

    public uploadCompanyLogo( actionUrl: string, data: any ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postBlobCommand( url, data, 'uploadCompanyLogo' );
    }

    public createDepartment( actionUrl: string, data: any ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, data, 'createDepartment' );
    }

}
