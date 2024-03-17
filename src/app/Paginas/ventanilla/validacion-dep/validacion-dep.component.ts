import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService, Transaccion, UsuarioDepositante } from 'src/app/Servicios/flujo-datos.service';
import { CuentaService, InfoDeposito } from 'src/app/Servicios/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validacion-dep',
  templateUrl: './validacion-dep.component.html',
  styleUrls: ['./validacion-dep.component.css']
})
export class ValidacionDepComponent implements OnInit, AfterViewInit {
  numeroIdentificacion: string = "";

  infoTransaccion: Transaccion = {
    fecha: new Date,
    monto: 0,
    nombreCliente: "",
    numeroCuenta: ""
  };
  usuarioDepositante: UsuarioDepositante = {
    identificacion: "",
    nombreUsuario: ""
  };
  infoDeposito: InfoDeposito = {
    fechaCreacion: new Date(),
    numeroCuenta: "",
    nombreCuenta: "",
    valorDebe: 0
  }

  constructor(private router: Router,
    private flujoDatosService: FlujoDatosService,
    private cuentaService: CuentaService
  ) { }

  ngOnInit(): void {
    //this.infoTransaccion = "";
    //this.usuarioDepositante = "";
    this.flujoDatosService.currentNumeroIdentificacion.subscribe(numero => this.numeroIdentificacion = numero);
    this.infoTransaccion = this.flujoDatosService.getInfoTransaccion();
    this.usuarioDepositante = this.flujoDatosService.getUsuarioDepositante();
    console.log("Info Transaccion:", this.flujoDatosService.getInfoTransaccion());
    console.log("Usuario Depositante:", this.flujoDatosService.getUsuarioDepositante());
  }


  ngAfterViewInit(): void {

  }

  navegarConDatos() {
    const datosAEnviar = {
      fechaCreacion: this.infoTransaccion.fecha,
      numeroCuenta: this.infoTransaccion.numeroCuenta,
      nombreCuenta: this.infoTransaccion.nombreCliente,
      valorDebe: this.infoTransaccion.monto
    };

    this.router.navigate(['/ruta-del-componente-receptor'], {
      state: { datos: datosAEnviar }
    });
  }

  depositar() {
    const codcuenta = localStorage.getItem("codCuenta");
    const valorDebe =localStorage.getItem("valorDebe");

    if (codcuenta !== null && valorDebe!== null) {
      const codCuenta = parseInt(codcuenta);
      const valorD = parseInt(valorDebe);
      let depositoRegistro = {
        "codCuenta": codCuenta,
        "valorDebe": valorD,
        "canal": "VEN",
      };
      console.log("Los datos a depositar son:",depositoRegistro);
      this.cuentaService.depositar(depositoRegistro).subscribe(
        data => {
          Swal.fire({
            title: 'Deposito',
            text: ' Realizado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/depositos-comprobante']);
        },
        error => {
          console.log("No se ha realizado el deposito", error)
          Swal.fire({
            title: 'Deposito',
            text: ' No se pudo realizar el deposito',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      )
    } else {
      // Maneja el caso en el que no se encuentre "codCuenta" en el almacenamiento local
    }

  }


  goBack() {
    this.router.navigate(['depositos'])
  }
}
