import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/Servicios/cliente.service";
import { CuentaService } from "src/app/Servicios/cuenta.service";

@Component({
  selector: "app-retiros",
  templateUrl: "./retiros.component.html",
  styleUrls: ["./retiros.component.css"],
})
export class RetirosComponent {
  numeroCuenta: string = "";
  cuentaEncontrada: Cuenta | null = null;
  idCliente: any = this.cuentaEncontrada?.codCliente.toString;
  clienteEncontrado: Cliente | null = null;
  mensajeValidacion = "";
  dolar: number = 0;
  moneda: number = 0;

  constructor(
    private router: Router,
    private cuentaService: CuentaService,
    private clienteService: ClienteService
  ) {}

  limitarDigitos(event: any, maxLength: number): void {
    const inputValue = event.target.value;
    const currentLength = inputValue.length;
  
    if (currentLength >= maxLength) {
      event.preventDefault();
    }
  }

  validateFormat(event: KeyboardEvent | ClipboardEvent): void {
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

  validacionRet() {
    this.router.navigate(["retiros-validacion"]);
  }

  cancelar(): void {
    this.numeroCuenta = "";
    
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
