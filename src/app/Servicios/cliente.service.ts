import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //private buscarClienteApi = "http://localhost:8081/api/v1/clientes";

  //private buscarClienteApi = "http://35.192.130.249:8081/api/v1/clientes";
  private clienteByIdApi = 'http://34.123.168.16:8080/api/v1/clientes/naturales/';
  private buscarClienteApi = "http://34.123.168.16:8080/api/v1/clientes/naturales/";

  

  constructor(private http: HttpClient) { }

  buscarClientePorId(id: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id);
    return this.http.get<any>(this.clienteByIdApi + id);
  }

  buscarClientePorIdentificacion(tipo: string, numero: string): Observable<any> {
    let url = `${this.buscarClienteApi}${numero}`;
    return this.http.get<any>(url);
  }

  buscarClientePorParametros(tipo: string, numero: string): Observable<any> {
    return this.http.get<any>(this.buscarClienteApi + tipo + "/" + numero);
  }

}
