import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FlujoDatosService {
  private numeroIdentificacionSource = new BehaviorSubject<string>('');
  currentNumeroIdentificacion = this.numeroIdentificacionSource.asObservable();
  private transactionInfo = new BehaviorSubject<TransactionInfo>({});
  currentTransactionInfo = this.transactionInfo.asObservable();
  private clienteSource = new BehaviorSubject<ClienteData | null>(null);
  currentClienteData = this.clienteSource.asObservable();

  private usuarioLogin: Object = {
    nombre: "",
    usuario: ""
  }

   /******* LOGIN *********/
   private validacionLogin: boolean = false;
   private userLogin: string = "";
  constructor() { }

  changeNumeroIdentificacion(numero: string) {
    this.numeroIdentificacionSource.next(numero);
  }

  updateTransactionInfo(info: TransactionInfo) {
    this.transactionInfo.next(info);
  }
  
  updateClienteData(data: ClienteData) {
    this.clienteSource.next(data);
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
  public setValidacionLogin(userLogin: string) {
    localStorage.setItem("user", userLogin);
    this.userLogin = userLogin;
  }
  public getValidacionLogin(): string {
    return this.userLogin;
  }

  public closeSession(){
    localStorage.clear();
  }

}

export interface TransactionInfo {
  nombreUsuario?: string;
  numeroIdentificacion?: string;
  monto?: number;
  fecha?: string; 
  nombreCliente?: string;
  numeroCuenta?: string;
}

export interface Transaccion {
  numeroCuenta: string;
  nombreCliente: string;
  monto: number;
  fecha: Date;
}

export interface ClienteData {
  numeroCuenta: string;
  nombres: string;
  apellidos: string;
  dollars: number;
  ctvs: number;
  totalDollars: number;
}

export interface UsuarioDepositante {
  nombreUsuario: string;
  identificacion: string;
}
