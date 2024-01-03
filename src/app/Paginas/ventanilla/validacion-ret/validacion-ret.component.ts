import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-validacion-ret',
  templateUrl: './validacion-ret.component.html',
  styleUrls: ['./validacion-ret.component.css']
})
export class ValidacionRetComponent {
  constructor(private router: Router) {}
  
  imprimirRet() {
    this.router.navigate(['retiros-comprobante']);
  }

  goToInicio() {
    this.router.navigate(['retiros'])
  }
}
