import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css']
})
export class RetirosComponent {
  constructor(private router: Router) {}

  validacionRet() {
    this.router.navigate(['retiros-validacion']);
  }
}
