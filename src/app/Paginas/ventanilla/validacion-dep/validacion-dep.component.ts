import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validacion-dep',
  templateUrl: './validacion-dep.component.html',
  styleUrls: ['./validacion-dep.component.css']
})
export class ValidacionDepComponent {
  constructor(private router: Router) {}

  imprimirDep() {
    this.router.navigate(['depositos-comprobante']);
  }
}
