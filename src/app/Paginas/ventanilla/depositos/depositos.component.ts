import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/Servicios/cliente.service";
import { CuentaService, InfoDeposito} from "src/app/Servicios/cuenta.service";
import { FlujoDatosService } from "src/app/Servicios/flujo-datos.service";

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
    nombreCuenta:"",
    valorDebe: 0
  }
  depositoCreado: any = null;
  errorCedula: string = '';
  errorMonto: string = '';


  constructor(
    private router: Router,
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private flujoDatosService: FlujoDatosService
  ) {}

  
  goToValidacion() {
    const esCedulaValida = this.validarCedula();
    const esMontoValido = this.validarMonto();
  
    if (!esCedulaValida || !esMontoValido) {
      return;
    }
    this.buscarCuenta();
    this.router.navigate(["/depositos-validacion"]);
  }
  
  validarCedula(): boolean {
    if (this.numeroIdentificacion.length !== 10 || !this.numeroIdentificacion.match(/^\d{10}$/)) {
      this.errorCedula = 'Cédula inválida. Debe tener 10 dígitos y solo contener números.';
      return false;
    }
    this.errorCedula = ''; 
    return true;
  }

  validarMonto(): boolean {
    if (this.totalDollars < 0) {
      this.errorMonto = 'Monto invalido (debe ser mayor a $0.00)';
      return false;
    }
    this.errorMonto = ''; 
    return true;
  }

  updateTotal(): void {
    this.totalDollars = this.dollars + this.ctvs / 100;
    const x: string = this.totalDollars.toString();
    localStorage.setItem("valorDebe",x);
  }
  
  updateNumeroIdentificacion() {
    this.flujoDatosService.changeNumeroIdentificacion(this.numeroIdentificacion);
  }

  buscarCuenta(): void {

    this.cuentaService
      .buscarCuentaPorNumero(this.numeroCuenta)
      .subscribe((data) => {
        this.cuentaEncontrada = data;
        
        this.idCliente = this.cuentaEncontrada!.codCliente;
        localStorage.setItem("codCuenta", this.cuentaEncontrada!.codCuenta);
        console.log("Numero cuenta metodo buscarcuenta", this.cuentaEncontrada!.codCuenta);
        this.buscarCliente(this.idCliente);
        this.buscarClientePorIdentificacion();
      },
      (error) => {
        console.error("Error al encontrar la cuenta", error)
        
      }
      );
  }

  buscarCliente(idCliente: string): void {
    console.log(idCliente);
    this.clienteService.buscarClientePorId(idCliente).subscribe((data) => {
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
      nombreCuenta: infoTransaccion!.nombreCliente,
      valorDebe: infoTransaccion!.monto
    }
    const codcuenta = localStorage.getItem("codCuenta");
    let depositoRegistro = {
      "codCuenta": codcuenta,
      "valorHaber": infoTransaccion!.monto,
      "canal": "VEN",
    };

    this.cuentaService.depositar(depositoRegistro).subscribe(
      data => {
        console.log(data);
        this.depositoCreado = data
        this.router.navigate(['/depositos-comprobante']);
        alert("Se ha realizado el deposito");
      },
      error => {
        console.log("No se ha realizado el deposito", error)
      }
    ) 
  }

  cancelar(): void {
    this.numeroCuenta = '';
    this.idCliente = '';
    this.cuentaEncontrada = null;
    this.clienteEncontrado = null;
    this.clienteDepositante = null;
    this.dollars = 0;
    this.ctvs = 0;
    this.totalDollars = 0;
    this.numeroIdentificacion = '';
    this.tipoIdentificacion = '';
    this.infoDeposito = {
      fechaCreacion: new Date(),
      numeroCuenta: '',
      nombreCuenta: '',
      valorDebe: 0
    };
    this.depositoCreado = null;
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

