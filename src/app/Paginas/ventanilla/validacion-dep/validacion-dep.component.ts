import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService, Transaccion, UsuarioDepositante } from 'src/app/Servicios/flujo-datos.service';
import { InfoDeposito, TransaccionService } from 'src/app/Servicios/transaccion.service';

@Component({
  selector: 'app-validacion-dep',
  templateUrl: './validacion-dep.component.html',
  styleUrls: ['./validacion-dep.component.css']
})
export class ValidacionDepComponent implements OnInit, AfterViewInit {
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
  infoDeposito: InfoDeposito= {
    fechaCreacion: new Date(),
    numeroCuenta: "",
    valorDebe: 0
  }


  constructor(private router: Router,
    private flujoDatosService: FlujoDatosService,
    private transaccionService: TransaccionService  
  ) {}

  ngOnInit(): void {
    // this.infoTransaccion = ;
    // this.usuarioDepositante = ;
  
    console.log("Info Transaccion:", this.flujoDatosService.getInfoTransaccion());
    console.log("Usuario Depositante:", this.flujoDatosService.getUsuarioDepositante());
  }
  

  ngAfterViewInit(): void {
    
  }

  depositar() {
    this.infoDeposito = {
      fechaCreacion: this.infoTransaccion!.fecha,
      numeroCuenta: this.infoTransaccion!.numeroCuenta,
      valorDebe: this.infoTransaccion!.monto
    }
    this.transaccionService.depositar(this.infoDeposito).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['depositos-comprobante']);
      },
      error => {
        console.log("No se ha realizado el deposito", error)
      }
    ) 
  }

  goBack(){
    this.router.navigate(['depositos'])
  }
}
