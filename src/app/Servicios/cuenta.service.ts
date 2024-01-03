import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private buscarCuentaApi = "http://34.125.120.215:8080/cuenta/buscar"

  constructor(private http: HttpClient) { }

  buscarCuentaPorNumero(numeroCuenta: string): Observable<any> {
    let url = `${this.buscarCuentaApi}/${numeroCuenta}`;
    return this.http.get<any>(url);
  }
}
