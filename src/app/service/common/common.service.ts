import { Injectable } from '@angular/core';
import { BaseService } from "../../common/services/base.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CommonService extends BaseService {

    constructor( http: HttpClient ) {
        super( http );
        this.servicename = 'UserService-Common 服务';
    }

    public getAllPerson( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'getAllPerson' );
    }

    public createPerson( actionUrl: string, data: any ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, data, 'createPerson' );
    }

    public getPerson( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'getPerson' );
    }

    public updatePerson( actionUrl: string, data: any ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, JSON.stringify( data ), 'updatePerson' );
    }

    public get( actionUrl: string, name: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, name );
    }

    public post( actionUrl: string, data: any, name: string ) {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, data, name );
    }

}
