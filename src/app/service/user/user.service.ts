import { Injectable } from '@angular/core';
import { BaseService } from "../../common/services/base.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService extends BaseService {

    constructor( http: HttpClient ) {
        super( http );
        this.servicename = 'UserService-用户服务';
    }

    public getAllUsers( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'getAllUsers' );
    }

    public getAllViews( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'getAllViews' );
    }

    public get( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'get' );
    }

    public updateUser( actionUrl: string, data: any): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, JSON.stringify( data ), 'updateUser' );
    }

}
