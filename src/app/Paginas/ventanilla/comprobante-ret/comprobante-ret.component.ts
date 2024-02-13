import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared-data.service';


@Component({
  selector: 'app-comprobante-ret',
  templateUrl: './comprobante-ret.component.html',
  styleUrls: ['./comprobante-ret.component.css']
})
export class ComprobanteRetComponent implements OnInit{
  numeroCuenta: string = '';
  currentDate = new Date();

  clienteEncontrado: { nombres: string; apellidos: string } | null = null;
  totalDollars: number | null = null;
  router: any;

    constructor(
      private sharedDataService: SharedDataService) { }

    ngOnInit() {
      this.numeroCuenta = this.sharedDataService.getNumeroCuenta();
      this.clienteEncontrado = this.sharedDataService.getClienteEncontrado();
      this.totalDollars = this.sharedDataService.getTotalDollars();
  
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
        pdf.save('comprobante-retiro.pdf');
        
      });
    } else {
      console.error('El elemento especificado no se encontró o no es un HTMLElement.');
    }
  }
  goBack() {
    this.router.navigate(['retiros'])
  }

}
