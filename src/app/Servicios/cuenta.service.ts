import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  
  //private depositarApi = "http://localhost:8080/api/v1/transacciones/depositos";
  //private retirarApi = "http://localhost:8080/api/v1/transacciones/retiros"
  //private buscarCuentaApi = "http://localhost:8080/api/v1/cuentas/numero"

  private depositarApi = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/transacciones/depositos";
  private retirarApi = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/transacciones/retiros";
 private buscarCuentaApi = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentas";

 private infoDepositoSource = new ReplaySubject<InfoDeposito>(1); 
  currentInfoDeposito = this.infoDepositoSource.asObservable();

  constructor(private http: HttpClient) { }

  depositar(depositoRegistro: any): Observable<any> {
    console.log("infodeposito metodo",depositoRegistro);
  
    return this.http.post<any>(this.depositarApi, depositoRegistro);
  }



  retirar(infoRetirar: any): Observable<any> {
    console.log("info retiro metodo",infoRetirar);
  
    return this.http.post<any>(this.retirarApi, infoRetirar)
  }

  buscarCuentaPorNumero(numeroCuenta: string): Observable<any> {
    let url = `${this.buscarCuentaApi}/?numeroCuenta=${numeroCuenta}`;
    return this.http.get<any>(url);
  }

  changeInfoDeposito(infoDeposito: InfoDeposito) {
    this.infoDepositoSource.next(infoDeposito);
  }

}

export interface InfoDeposito {
  nombreCuenta: string;
  numeroCuenta: string;
  valorDebe: number;
  fechaCreacion: Date;
}

export interface InfoRetirar {
  numeroCuenta: string;
  valorHaber: number;
}
