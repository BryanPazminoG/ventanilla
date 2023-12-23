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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
