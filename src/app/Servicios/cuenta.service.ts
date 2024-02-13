import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  
  private depositarApi = "http://35.192.152.130:8089/api/v1/transacciones/depositos";
  private retirarApi = "http://35.192.152.130:8089/api/v1/transacciones/retiros"
  private buscarCuentaApi = "http://35.192.152.130:8089/api/v1/cuentas/numero"
  private infoDepositoSource = new ReplaySubject<InfoDeposito>(1); 
  currentInfoDeposito = this.infoDepositoSource.asObservable();

  constructor(private http: HttpClient) { }

  depositar(infoDeposito: InfoDeposito): Observable<any> {
    return this.http.post<any>(this.depositarApi, infoDeposito);
  }

  retirar(infoRetirar: any): Observable<any> {
    return this.http.post<any>(this.retirarApi, infoRetirar)
  }

  buscarCuentaPorNumero(numeroCuenta: string): Observable<any> {
    let url = `${this.buscarCuentaApi}/${numeroCuenta}`;
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
  nombreCuenta: string;
  valorDebe: number;
  fechaCreacion: Date;
}
