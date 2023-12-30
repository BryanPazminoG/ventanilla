import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/Servicios/cuenta.service';


@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css']
})
export class RetirosComponent {
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

  validacionRet() {
    this.router.navigate(['retiros-validacion']);
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


