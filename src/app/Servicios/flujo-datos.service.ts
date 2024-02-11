import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FlujoDatosService {
  private numeroIdentificacionSource = new BehaviorSubject<string>('');
  currentNumeroIdentificacion = this.numeroIdentificacionSource.asObservable();

  constructor() { }

  changeNumeroIdentificacion(numero: string) {
    this.numeroIdentificacionSource.next(numero);
  }
  
  private usuarioLogin: Object = {
    nombre: "",
    usuario: ""
  }

  private infoTransaccion: Transaccion = {
    numeroCuenta: "",
    nombreCliente: "",
    monto: 0,
    fecha: new Date()
  }
  setInfoTransaccion(value: Transaccion) {
    this.infoTransaccion = value;
  }
  getInfoTransaccion() {
    console.log('SERVICIO TRANSACCION:', this.infoTransaccion);
    return this.infoTransaccion;
  }

  private usuarioDepositante: UsuarioDepositante = {
    nombreUsuario: "",
    identificacion: ""
  }
  setUsuarioDepositante(value: UsuarioDepositante) {
    this.usuarioDepositante = value;
  }
  getUsuarioDepositante() {
    console.log('SERVICIO DEPOSITANTE', this.usuarioDepositante);
    return this.usuarioDepositante;
  }

  /*************** SETTER AND GETTER DE LOGIN ******************/
  public setUsuarioLogin(usuario: object) {
    this.usuarioLogin = usuario;
  }
  public getUsuarioLogin(): object {
    return this.usuarioLogin;
  }

}



export interface Transaccion {
  numeroCuenta: string;
  nombreCliente: string;
  monto: number;
  fecha: Date;
}

export interface UsuarioDepositante {
  nombreUsuario: string;
  identificacion: string;
}
