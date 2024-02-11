import { Component, OnInit } from '@angular/core';
import { SegUsuarioService } from 'src/app/Servicios/seg-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credenciales = {
    usuario: '',
    clave: ''
  }
  primeraVisita = true;
  accesoValidacion = false;

  constructor(private segUsuarioService: SegUsuarioService, private router: Router){}

  ngOnInit(): void {
  }

  loginUser(){
    this.segUsuarioService.loguearUsuarioAPI(this.credenciales.usuario, this.credenciales.clave).subscribe( 
      (data) => {
        this.router.navigate(["/depositos"]);
        this.accesoValidacion = true;
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
    this.primeraVisita = false;
    this.accesoValidacion = false;
    this.router.navigate(["/depositos"]);
  }
}
