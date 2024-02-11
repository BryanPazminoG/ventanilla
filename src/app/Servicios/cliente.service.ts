import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private buscarClienteApi = "http://localost:8080/cliente/buscar-cliente";
  private buscarClientePorIdentificacionApi = "http://localhost:8080/cliente/buscar";

  constructor(private http: HttpClient) { }

  buscarClientePorId(id: string ): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get<any>(this.buscarClienteApi, { params: params });
  }

  buscarClientePorIdentificacion(tipo: string, numero: string): Observable<any> {
    let params = new HttpParams().set('tipo', tipo).set('numero', numero);
    return this.http.get<any>(this.buscarClientePorIdentificacionApi, { params: params });
  }

}
