import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

        //let result: boolean = false;

        return this.service.checkSession()
            .then( auth => {
                if ( auth && !auth.hasError && auth.isLogged ) {

                    let url: string = state.url.split( '?', 1 )[0];
                    let result = false;
                    if ( url == '/login' || url == '/' ) {
                        result = true;
                    }
                    for ( let ref of auth.user.userPermissions ) {

                        for ( let r of ref.split( ';' ) ) {
                            if ( r == url ) {
                                result = true;
                                break;
                            }
                        }
//                        if ( ref.search( url ) != -1 ) {
//                            console.log( ref );
//                            result = true;
//                        }
                    }

                    if ( !result ) {
                        this.service.navigateToError( this.router, 'The path is not avaiable', url )
                    }
                    return result;
                } else {

                    this.service.navigateToLogin( this.router, '/' );

                    return false;
                }
            } )
            .catch(( error: any ) => {
                return false;
            } );
    }


    constructor( @Inject( 'auth' ) private service, private router: Router ) { }
}
