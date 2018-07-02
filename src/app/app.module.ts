import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CommonFunctionModule} from './common/common.function.module';
import {AuthGuardService} from './service/auth-guard.service';
import {AuthService} from './service/auth.service';
import {HttpxsrfinterceptorService} from "./service/httpxsrfinterceptor.service";
import {SpinnerComponent} from './shared/spinner.component';
import {LoginComponent} from './shared/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ErrorComponent} from './shared/error/error.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonFunctionModule,
    HttpClientModule 
  ],
  providers: [
    AuthGuardService, 
    {provide: 'auth', useClass: AuthService}, 
    {provide: HTTP_INTERCEPTORS, useClass: HttpxsrfinterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
