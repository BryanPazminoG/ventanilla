import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private depositarApi = "http://localhost:8080/api/v1/cuentas/depositar-monto";
  private retirarApi = "http://localhost:8080/api/v1/cuentas/retirar"
  private buscarCuentaApi = "http://localhost:8080/api/v1/cuentas/numero"

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
}

export interface InfoDeposito {
  numeroCuenta: string;
  valorDebe: number;
  fechaCreacion: Date;
}

export interface InfoRetirar {
  numeroCuenta: string;
  valorDebe: number;
  fechaCreacion: Date;
}
