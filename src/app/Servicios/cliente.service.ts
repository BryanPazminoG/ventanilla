import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //private buscarClienteApi = "http://localhost:8081/api/v1/clientes";
  
  private buscarClienteApi = "http://35.192.130.249:8081/api/v1/clientes";

  constructor(private http: HttpClient) { }

  buscarClientePorId(id: string): Observable<any> {
    let url = `${this.buscarClienteApi}/${id}`;
    return this.http.get<any>(url);
  }

  buscarClientePorIdentificacion(tipo: string, numero: string): Observable<any> {
    let url = `${this.buscarClienteApi}/${numero}`;
    return this.http.get<any>(url);
  }

}
