import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService, Transaccion, UsuarioDepositante } from 'src/app/Servicios/flujo-datos.service';
import { CuentaService, InfoDeposito} from 'src/app/Servicios/cuenta.service';

@Component({
  selector: 'app-validacion-dep',
  templateUrl: './validacion-dep.component.html',
  styleUrls: ['./validacion-dep.component.css']
})
export class ValidacionDepComponent implements OnInit, AfterViewInit {
  numeroIdentificacion: string="";

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
    /*this.infoDeposito = {
      fechaCreacion: this.infoTransaccion!.fecha,
      numeroCuenta: this.infoTransaccion!.numeroCuenta,
      nombreCuenta: this.infoTransaccion!.nombreCliente,
      valorDebe: this.infoTransaccion!.monto
    }
    this.cuentaService.depositar(this.infoDeposito).subscribe(
      data => {
        console.log(data);
        console.log('Datos establecidos en el servicio:', this.infoDeposito);*/
        this.router.navigate(['/depositos-comprobante']);
      /*  },
      error => {
        console.log("No se ha realizado el deposito", error)
      }
    )*/
  }
  

  goBack() {
    this.router.navigate(['depositos'])
  }
}
