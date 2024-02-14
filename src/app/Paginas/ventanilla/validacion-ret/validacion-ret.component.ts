import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService, ClienteData, Transaccion } from "src/app/Servicios/flujo-datos.service";
import { CuentaService, InfoRetirar } from "src/app/Servicios/cuenta.service";
import { SharedDataService } from '../../../shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validacion-ret',
  templateUrl: './validacion-ret.component.html',
  styleUrls: ['./validacion-ret.component.css']
})
export class ValidacionRetComponent implements OnInit {
  numeroCuenta: string = '';
  currentDate = new Date();

  clienteEncontrado: { nombres: string; apellidos: string } | null = null;
  totalDollars: number | null = null;

  infoTransaccion: Transaccion = {
    fecha: new Date,
    monto: 0,
    nombreCliente: "",
    numeroCuenta: ""
  };

  infoRetirar: InfoRetirar = {
    numeroCuenta: '',
    valorHaber: 0
  };

  constructor(
    private router: Router,
    private flujoDatosService: FlujoDatosService,
    private sharedDataService: SharedDataService,
    private cuentaService: CuentaService) { }

  ngOnInit() {
    this.numeroCuenta = this.sharedDataService.getNumeroCuenta();
    this.clienteEncontrado = this.sharedDataService.getClienteEncontrado();
    this.totalDollars = this.sharedDataService.getTotalDollars();
    this.infoTransaccion = this.flujoDatosService.getInfoTransaccion();
    console.log("Info Transaccion:", this.flujoDatosService.getInfoTransaccion());
  }

  imprimirRet() {
    this.infoRetirar= {
      numeroCuenta: this.numeroCuenta, 
      valorHaber: this.totalDollars!

    }
    this.cuentaService.retirar(this.infoRetirar).subscribe(
      data => {
        Swal.fire({
          title: 'Retiro',
          text: ' Realizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
    this.router.navigate(['/retiros-comprobante']);
    },
    error => {
      console.log("No se ha realizado el retiro", error)
      Swal.fire({
        title: 'Retiro',
        text: ' No se pudo realizar el retiro',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  )
  }


  atras() {
    this.router.navigate(['/retiros']);
  }


}
