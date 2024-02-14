import { Component, OnInit } from '@angular/core';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-navbarv',
  templateUrl: './navbarv.component.html',
  styleUrls: ['./navbarv.component.css']
})
export class NavbarvComponent implements OnInit{
  usuario: string = "";

  constructor(
    private flujoDatosService: FlujoDatosService
  ) {

   }

  ngOnInit(): void {
    this.cargarDatosUsuario();
    const usuarioFromLocalStorage = localStorage.getItem("user");
    if (usuarioFromLocalStorage !== null) {
      this.usuario = usuarioFromLocalStorage;
    } else {
      this.usuario = "";
    }
  }

  cargarDatosUsuario(){
    this.usuario = <any> this.flujoDatosService.getUsuarioLogin();
  }
}

