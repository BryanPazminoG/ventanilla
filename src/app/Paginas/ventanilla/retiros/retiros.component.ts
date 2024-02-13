import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/Servicios/cliente.service";
import { CuentaService, InfoRetirar } from "src/app/Servicios/cuenta.service";
import { FlujoDatosService, ClienteData } from "src/app/Servicios/flujo-datos.service";
import { SharedDataService } from '../../../shared-data.service';
import { ValidacionRetComponent } from "../validacion-ret/validacion-ret.component";

@Component({
  selector: "app-retiros",
  templateUrl: "./retiros.component.html",
  styleUrls: ["./retiros.component.css"],
})
export class RetirosComponent {
  numeroCuenta: string = "";
  idCliente: any = "";
  nombres: string ="";
  apellidos: string="";
  cuentaEncontrada: Cuenta | null = null;
  clienteEncontrado = { nombres: '', apellidos: '' };
  totalDollars: number = 0;
  clienteDepositante: Cliente | null = null;
  dollars: number = 0;
  ctvs: number = 0;
  numeroIdentificacion: string = "";
  tipoIdentificacion: string = "";
  infoRetirar: InfoRetirar= {
    fechaCreacion: new Date(),
    numeroCuenta: "",
    nombreCuenta: "",
    valorDebe: 0
  }
  depositoCreado: any = null;
  errorMonto: string = '';
  mensajeError: string = '';
  
  constructor(
    private router: Router,
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private sharedDataService: SharedDataService,
    private flujoDatosService: FlujoDatosService
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
        this.retirar();
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

  retirar() {
    const infoTransaccion = this.flujoDatosService.getInfoTransaccion()
    this.infoRetirar = {
      fechaCreacion: infoTransaccion!.fecha,
      numeroCuenta: infoTransaccion!.numeroCuenta,
      nombreCuenta: infoTransaccion!.numeroCuenta,
      valorDebe: infoTransaccion!.monto
    }
    this.cuentaService.retirar(this.infoRetirar).subscribe(
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
  validacionRet() {
    this.guardarDatos();
    const esMontoValido = this.validarMonto();
    if ( !esMontoValido) {
      return;
    }
    this.router.navigate(["/retiros-validacion"]);
  }

  validarCamposYContinuar() {
    if (this.numeroCuenta && (this.dollars !== null && this.dollars > 0) && (this.ctvs !== null && this.ctvs >= 0)) {
      this.validacionRet();
    }else{
      this.mensajeError = 'Ingrese todos los datos';
    }
  }

  validarMonto(): boolean {
    if (this.totalDollars < 0) {
      this.errorMonto = 'Monto invalido (debe ser mayor a $0.00)';
      return false;
    }
    this.errorMonto = ''; 
    return true;
  }

  enviarDatos() {
    const data: ClienteData = {
      numeroCuenta: this.numeroCuenta,
      nombres: this.nombres,
      apellidos: this.apellidos,
      dollars: this.dollars,
      ctvs: this.ctvs,
      totalDollars: this.totalDollars,
    };

    this.flujoDatosService.updateClienteData(data);
  }

  cancelar(): void {
    this.numeroCuenta = "";
    this.idCliente = "";
    this.cuentaEncontrada = null;
    this.clienteDepositante = null;
    this.dollars = 0;
    this.ctvs = 0;
    this.totalDollars = 0;
    this.numeroIdentificacion = "";
    this.tipoIdentificacion = "";
    this.infoRetirar = {
      fechaCreacion: new Date(),
      numeroCuenta: "",
      nombreCuenta: "",
      valorDebe: 0
    };
    this.depositoCreado = null;
  }
  
  guardarDatos() {
    this.sharedDataService.setDatosRetiro(this.numeroCuenta, this.clienteEncontrado, this.totalDollars);
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
