import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css']
})
export class DepositosComponent {

  constructor(private router: Router) {}

  validacionDep() {
    this.router.navigate(['depositos-validacion']);
  }

}
