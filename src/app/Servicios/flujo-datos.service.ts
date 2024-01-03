import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlujoDatosService {

  constructor() { }
  
  private infoTransaccion: Transaccion = {
    numeroCuenta: "",
    nombreCliente: "",
    monto: 0,
    fecha: new Date()
  }
  setInfoTransaccion(value: Transaccion){
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
  getUsuarioDepositante(){
    console.log('SERVICIO DEPOSITANTE', this.usuarioDepositante);
    return this.usuarioDepositante;
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
