import { HttpEvent } from "@angular/common/http";
import { HttpXsrfTokenExtractor } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";

@Injectable()
export class HttpxsrfinterceptorService implements HttpInterceptor {

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpResponse<any> | HttpEvent<any>> {
        const headerName = 'X-CSRF-TOKEN';

        if ( req.method == 'POST' || req.method == 'PUT' ) {
            if ( this.service.userAuth != null ) {
                let token = this.service.userAuth.xsrfToken;
                if ( token !== null && !req.headers.has( headerName ) ) {
                    req = req.clone( { headers: req.headers.set( headerName, token ) } );
                }
            }
        }
        return next
            .handle( req )
            .do(( event: HttpEvent<any> ) => {
                if ( event instanceof HttpResponse ) {
                    // do stuff with response if you want
                }
            }, ( err: any ) => {
                if ( err instanceof HttpErrorResponse ){
                    if ( err.status === 401 ) {
                        // redirect to the login route or show a modal
                        this.service.navigateToLogin(this.router,'/');
                    }
                    else if(err.status ===0){
                        // backend service is not avaiable
                        this.service.navigateToError(this.router,'Service is not avaiable', err.message)
                    }
                }
            } );
    }
    
    constructor( @Inject( 'auth' ) private service, private tokenExtractor: HttpXsrfTokenExtractor, private router: Router  ) { }

}
