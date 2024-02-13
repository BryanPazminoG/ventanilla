import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaService, InfoDeposito} from 'src/app/Servicios/cuenta.service';
import { FlujoDatosService, Transaccion, UsuarioDepositante } from 'src/app/Servicios/flujo-datos.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-comprobante-dep',
  templateUrl: './comprobante-dep.component.html',
  styleUrls: ['./comprobante-dep.component.css']
})
export class ComprobanteDepComponent implements OnInit {
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
  datosRecibidos: any;
  
  constructor(
    private router: Router,
    private flujoDatosService: FlujoDatosService,
    private cuentaService: CuentaService) {}

    ngOnInit() {
      this.flujoDatosService.currentNumeroIdentificacion.subscribe(numero => this.numeroIdentificacion = numero);
    this.infoTransaccion = this.flujoDatosService.getInfoTransaccion();
    this.usuarioDepositante = this.flujoDatosService.getUsuarioDepositante();
    console.log("Info Transaccion:", this.flujoDatosService.getInfoTransaccion());
    console.log("Usuario Depositante:", this.flujoDatosService.getUsuarioDepositante());
      this.datosRecibidos = history.state.datos;   
    }

  generatePDF() {
    const content = document.querySelector('.imprimir');
  
    if (content instanceof HTMLElement) {
      html2canvas(content).then(canvas => {
        const imgWidth = 250;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        //Margenes
        const marginLeft = 20;
        const marginTop = 20; 

        const pageWidth = pdf.internal.pageSize.getWidth() - marginLeft * 2;
        const pageHeight = (imgHeight * pageWidth) / imgWidth;
        pdf.addImage(contentDataURL, 'PNG', marginLeft, marginTop, pageWidth, pageHeight);
        pdf.save('comprobante-deposito.pdf');

      });
    } else {
      console.error('El elemento especificado no se encontró o no es un HTMLElement.');
    }
  }

  goBack() {
    this.router.navigate(['depositos'])
  }
  
}
