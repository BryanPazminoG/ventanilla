import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-comprobante-dep',
  templateUrl: './comprobante-dep.component.html',
  styleUrls: ['./comprobante-dep.component.css']
})
export class ComprobanteDepComponent {
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
  
}
