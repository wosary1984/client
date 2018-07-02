import { Injectable } from '@angular/core';
import { BaseService } from "../../common/services/base.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RoleService extends BaseService{

    constructor( http: HttpClient ) {
        super( http );
        this.servicename = 'RoleService-角色服务';
    }
    
    public getAllRoles( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'getAllRoles' );
    }
    
    public get( actionUrl: string ): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.getCommand( url, 'get' );
    }
    
    public updateRole(actionUrl: string, data: any): Promise<any> {
        const url = this.serviceUrl( actionUrl );
        return this.postCommand( url, JSON.stringify( data ), 'update role' );
    }

}
