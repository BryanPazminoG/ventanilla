import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private buscarClienteApi = "http://localhost:8081/api/v1/clientes";
  private buscarClientePorIdentificacionApi = "http://localhost:8080/cliente/buscar";

  constructor(private http: HttpClient) { }

  buscarClientePorId(id: string ): Observable<any> {
    let url = `${this.buscarClienteApi}/${id}`;
    return this.http.get<any>(url);
  }

  buscarClientePorIdentificacion(tipo: string, numero: string): Observable<any> {
    let params = new HttpParams().set('tipo', tipo).set('numero', numero);
    return this.http.get<any>(this.buscarClientePorIdentificacionApi, { params: params });
  }

}
