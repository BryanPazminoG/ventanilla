import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/Servicios/cliente.service";
import { CuentaService } from "src/app/Servicios/cuenta.service";
import { FlujoDatosService } from "src/app/Servicios/flujo-datos.service";
import { InfoDeposito, TransaccionService } from "src/app/Servicios/transaccion.service";

@Component({
  selector: "app-depositos",
  templateUrl: "./depositos.component.html",
  styleUrls: ["./depositos.component.css"],
})
export class DepositosComponent {
  numeroCuenta: string = "";
  idCliente: any = "";
  cuentaEncontrada: Cuenta | null = null;
  clienteEncontrado: Cliente | null = null;
  clienteDepositante: Cliente | null = null;
  dollars: number = 0;
  ctvs: number = 0;
  totalDollars: number = 0;
  numeroIdentificacion: string = "";
  tipoIdentificacion: string = "";
  infoDeposito: InfoDeposito= {
    fechaCreacion: new Date(),
    numeroCuenta: "",
    valorDebe: 0
  }
  depositoCreado: any = null;

  constructor(
    private router: Router,
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private flujoDatosService: FlujoDatosService,
    private transaccionService: TransaccionService
  ) {}

  goToValidacion() {
    this.buscarCuenta();
    // this.router.navigate(["depositos-validacion"]);
  }

  updateTotal(): void {
    this.totalDollars = this.dollars + this.ctvs / 100;
  }
  
  buscarCuenta(): void {
    this.cuentaService
      .buscarCuentaPorNumero(this.numeroCuenta)
      .subscribe((data) => {
        this.cuentaEncontrada = data;
        this.idCliente = this.cuentaEncontrada!.codCliente;
        this.buscarCliente();
        this.buscarClientePorIdentificacion();
        this.depositar();
      },
      (error) => {
        console.error("Error al encontrar la cuenta", error)
      }
      );
  }

  buscarCliente(): void {
    this.clienteService.buscarClientePorId(this.idCliente).subscribe((data) => {
      this.clienteEncontrado = data;
      this.flujoDatosService.setInfoTransaccion({
        fecha: new Date(),
        monto: this.totalDollars,
        nombreCliente: `${this.clienteEncontrado?.nombres} ${this.clienteEncontrado?.apellidos}`,
        numeroCuenta: this.numeroCuenta
      })
      
      // console.log("GET", this.flujoDatosService.getInfoTransaccion())
    },
    error => {
      console.error("CLIENTE NO ENCONTRADO", error)
    });
  }

  buscarClientePorIdentificacion(): void {
    this.clienteService.buscarClientePorIdentificacion(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (data) => {
        if(!data){
          alert('Cliente no encontrado. Verifica la información ingresada.');
        }else{
          this.clienteDepositante = data;
          this.flujoDatosService.setUsuarioDepositante({
            identificacion: this.numeroIdentificacion,
            nombreUsuario: `${this.clienteDepositante?.nombres} ${this.clienteDepositante?.apellidos}`
          })
          // console.log("GET", this.flujoDatosService.getUsuarioDepositante())
        }
      },
      (error) => {
        console.error('Error al buscar cliente: ', error);
      }
    );
  }

  depositar() {
    const infoTransaccion = this.flujoDatosService.getInfoTransaccion()
    this.infoDeposito = {
      fechaCreacion: infoTransaccion!.fecha,
      numeroCuenta: infoTransaccion!.numeroCuenta,
      valorDebe: infoTransaccion!.monto
    }
    this.transaccionService.depositar(this.infoDeposito).subscribe(
      data => {
        console.log(data);
        this.depositoCreado = data
        this.router.navigate(['depositos-comprobante']);
        alert("Se ha realizado el deposito");
      },
      error => {
        console.log("No se ha realizado el deposito", error)
      }
    ) 
  }

}

export interface Cuenta {
  codCuenta: any;
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
  codigo: any;
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
