import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CuentaService } from "src/app/Servicios/cuenta.service";

@Component({
  selector: "app-depositos",
  templateUrl: "./depositos.component.html",
  styleUrls: ["./depositos.component.css"],
})
export class DepositosComponent {
  numeroCuenta: string = "";
  cuentaEncontrada: Cuenta | null = null;

  constructor(private router: Router, private cuentaService: CuentaService) {}

  buscarCuenta(): void {
    this.cuentaService
      .buscarCuentaPorNumero(this.numeroCuenta)
      .subscribe((data) => {
        console.log(data);
        this.cuentaEncontrada = data;
      });
  }

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
