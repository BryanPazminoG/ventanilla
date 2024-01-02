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

  constructor(
    private router: Router,
    private cuentaService: CuentaService,
    private clienteService: ClienteService
  ) {}

  buscarCuenta(): void {
    this.cuentaService
      .buscarCuentaPorNumero(this.numeroCuenta)
      .subscribe((data) => {
        console.log(data);
        this.cuentaEncontrada = data;
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
