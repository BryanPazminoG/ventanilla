import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private buscarClienteApi = "http://34.102.85.160:8080/cliente/buscar-cliente";

constructor(private http: HttpClient) { }

buscarClientePorId(id: string ): Observable<any> {
  let params = new HttpParams().set('id', id);
  return this.http.get<any>(this.buscarClienteApi, { params: params });
}

}
