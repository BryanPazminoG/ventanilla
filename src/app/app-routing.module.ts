import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Paginas/error/error.component';
import { DepositosComponent } from './Paginas/ventanilla/depositos/depositos.component';
import { RetirosComponent } from './Paginas/ventanilla/retiros/retiros.component';
import { ValidacionDepComponent } from './Paginas/ventanilla/validacion-dep/validacion-dep.component';
import { ComprobanteDepComponent } from './Paginas/ventanilla/comprobante-dep/comprobante-dep.component';
import { ValidacionRetComponent } from './Paginas/ventanilla/validacion-ret/validacion-ret.component';
import { ComprobanteRetComponent } from './Paginas/ventanilla/comprobante-ret/comprobante-ret.component';
import { LoginComponent } from './Paginas/ventanilla/login/login.component';


const routes: Routes = [
  //{ path:'' , component: HomeComponent, pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'depositos', component: DepositosComponent },
  { path: 'depositos-validacion', component: ValidacionDepComponent },
  { path: 'depositos-comprobante', component: ComprobanteDepComponent },
  { path: 'retiros', component: RetirosComponent },
  { path: 'retiros-validacion', component: ValidacionRetComponent },
  { path: 'retiros-comprobante', component: ComprobanteRetComponent },
  { path: '**', component: ErrorComponent },

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
