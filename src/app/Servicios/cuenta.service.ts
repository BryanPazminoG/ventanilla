import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private buscarCuentaApi = "http://localhost:8080/api/v1/cuentas/numero"

  constructor(private http: HttpClient) { }

  buscarCuentaPorNumero(numeroCuenta: string): Observable<any> {
    let url = `${this.buscarCuentaApi}/${numeroCuenta}`;
    return this.http.get<any>(url);
  }
}
