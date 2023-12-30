import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private buscarCuentaApi = "http://localhost:8080/cuenta/buscar"

  constructor(private http: HttpClient) { }

  // buscarCuentaPorNumero(cuenta: string): Observable<any> {
  //   let params = new HttpParams().set('cuenta', cuenta);
  //   return this.http.get<any>(this.buscarCuentaApi, { params: params });
  // }

  buscarCuentaPorNumero(numeroCuenta: string): Observable<any> {
    let url = `${this.buscarCuentaApi}/${numeroCuenta}`;
    return this.http.get<any>(url);
  }
}
