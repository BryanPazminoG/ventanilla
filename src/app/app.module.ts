import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ErrorComponent } from './Paginas/error/error.component';
import { NavbarvComponent } from './Bloques/ventanilla/navbarv/navbarv.component';
import { SidebarvComponent } from './Bloques/ventanilla/sidebarv/sidebarv.component';
import { DepositosComponent } from './Paginas/ventanilla/depositos/depositos.component';
import { RetirosComponent } from './Paginas/ventanilla/retiros/retiros.component';
import { ValidacionDepComponent } from './Paginas/ventanilla/validacion-dep/validacion-dep.component';
import { ComprobanteDepComponent } from './Paginas/ventanilla/comprobante-dep/comprobante-dep.component';
import { ValidacionRetComponent } from './Paginas/ventanilla/validacion-ret/validacion-ret.component';
import { ComprobanteRetComponent } from './Paginas/ventanilla/comprobante-ret/comprobante-ret.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Paginas/ventanilla/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NavbarvComponent,
    SidebarvComponent,
    DepositosComponent,
    RetirosComponent,
    ValidacionDepComponent,
    ComprobanteDepComponent,
    ValidacionRetComponent,
    ComprobanteRetComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
