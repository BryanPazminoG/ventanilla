import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/Servicios/cliente.service";
import { CuentaService } from "src/app/Servicios/cuenta.service";

@Component({
  selector: "app-depositos",
  templateUrl: "./depositos.component.html",
  styleUrls: ["./depositos.component.css"],
})
export class DepositosComponent {
  numeroCuenta: string = "";
  idCliente: string = "";
  cuentaEncontrada: Cuenta | null = null;
  clienteEncontrado: Cliente | null = null;
  tipoIdentificacion: string = "0";
  dolar: number = 0;
  moneda: number = 0;
  

  mensajeValidacion = "";
  numeroIdentificacion: string = "";
  

  constructor(
    private router: Router,
    private cuentaService: CuentaService,
    private clienteService: ClienteService
  ) { }

  limitarDigitos(event: any, maxLength: number): void {
    const inputValue = event.target.value;
    const currentLength = inputValue.length;
  
    if (currentLength >= maxLength) {
      event.preventDefault();
    }
  }

  validateFormatCuenta(event: KeyboardEvent | ClipboardEvent): void {
    let key;
  
    if (event.type === 'paste') {
      key = (event as ClipboardEvent).clipboardData?.getData('text/plain') || '';
    } else {
      key = (event as KeyboardEvent).key || String.fromCharCode((event as KeyboardEvent).keyCode);
    }
  
    const regex = /[0-9]|\./;
  
    if (!regex.test(key)) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (event.returnValue !== undefined) {
        (event as any).returnValue = false;
      }
    }
  }

  validateFormatIdentificacion(event: KeyboardEvent | ClipboardEvent): void {
    let key;
  
    if (event.type === 'paste') {
      key = (event as ClipboardEvent).clipboardData?.getData('text/plain') || '';
    } else {
      key = (event as KeyboardEvent).key || String.fromCharCode((event as KeyboardEvent).keyCode);
    }
  
    const regexCedulaRUC = /[0-9]/; // Permitir solo números para Cédula y RUC
    const regexPasaporte = /[0-9a-zA-Z]/; // Permitir números y letras para Pasaporte
  
    let regex: RegExp;
  
    switch (this.tipoIdentificacion) {
      case '1': // Cédula
      case '3': // RUC
        regex = regexCedulaRUC;
        break;
      case '2': // Pasaporte
        regex = regexPasaporte;
        break;
      default:
        regex = /[0-9a-zA-Z]/; // Default: Permitir números y letras
    }
  
    if (!regex.test(key)) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (event.returnValue !== undefined) {
        (event as any).returnValue = false;
      }
    }
  }

  buscarCuenta(): void {
    this.cuentaService.buscarCuentaPorNumero(this.numeroCuenta)
      .subscribe((data) => {
        console.log(data);
        if(data){
          this.cuentaEncontrada = data;
          this.mensajeValidacion ="";
        }
        else{
          this.cuentaEncontrada = null;
          this.mensajeValidacion = "Numero de cuenta incorrecto";
        }
      });
  }

  buscarCliente(): void {
    this.clienteService.buscarClientePorId(this.idCliente).subscribe((data) => {
      console.log("Informacion cliente", data);
      this.clienteEncontrado = data;
    });
  }

  // TODO: get client id from cuentaService => (codCliente)
  validacionDep() {
    this.router.navigate(["depositos-validacion"]);
  }

getMaxLengthForTipoIdentificacion(): number {
  switch (this.tipoIdentificacion) {
    case '1': // Cedula
      return 10;
    case '2': // Pasaporte
      return 15; 
    case '3': // RUC
      return 13; 
    default:
      return 0; 
  }
}

  isInputEnabled(): boolean {
    return ['1', '2', '3'].includes(this.tipoIdentificacion);
  }

  cancelar(): void {
    this.numeroCuenta = "";
    this.idCliente = "";
    this.cuentaEncontrada = null;
    this.clienteEncontrado = null;
    this.tipoIdentificacion = "0";
    this.mensajeValidacion = "";
    this.numeroIdentificacion = "";
    this.dolar = 0;
    this.moneda = 0;
  }
}

export interface Cuenta {
  codCuenta: number;
  numeroCuenta: string;
  codTipoCuenta: string;
  codCliente: number;
  saldoContable: number;
  saldoDisponible: number;
  estado: string;
  fechaCreacion: string;
  fechaUltimoCambio: string;
  version: number;
}

export interface Cliente {
  codigo: number;
  tipoCliente: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  apellidos: string;
  nombres: string;
  fechaNacimiento: string;
  fechaConstitucion: string;
  razonSocial: string;
  nombreComercial: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  fechaModificacion: string;
  version: number;
}
