import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private depositarApi = "http://34.125.120.215:8080/transaccion/depositar-monto";
  private retirarApi = "http://34.125.120.215:8080/transaccion/retirar"

  constructor(private http: HttpClient) { }

  depositar(infoDeposito: InfoDeposito): Observable<any> {
    return this.http.post<any>(this.depositarApi, infoDeposito);
  }

  retirar(infoRetirar: any): Observable<any> {
    return this.http.post<any>(this.retirarApi, infoRetirar)
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
