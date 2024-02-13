import { Component, OnInit } from '@angular/core';
import { SegUsuarioService } from 'src/app/Servicios/seg-usuario.service';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  private usuarioLogin: Object = {
    nombre: "",
    usuario: ""
  }
  credenciales = {
    "usuario": "",
    "clave": ""
  }
  primeraVisita = true;
  accesoValidacion = false;
/******* LOGIN *********/
private validacionLogin: boolean = false;
private userLogin: string = "";

  constructor(private segUsuarioService: SegUsuarioService, private router: Router, private flujoDatos: FlujoDatosService){}

  ngOnInit(): void {
    localStorage.clear();
  }

  loginUser(){
    if(this.credenciales.usuario != '' && this.credenciales.clave  != '')
    this.primeraVisita = false;
    this.accesoValidacion = true;

    console.log(this.credenciales);

    this.segUsuarioService.validarUsuarioLogin(this.credenciales).subscribe(
      (data) => {
        if(data){
          this.flujoDatos.setValidacionLogin(this.credenciales.usuario);
          this.router.navigate(["/clientes"]);
        }else{
          this.accesoValidacion = false;
        }

      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
        this.accesoValidacion = false;
      }
    );
  }

  /*************** SETTER AND GETTER DE LOGIN ******************/
  public setUsuarioLogin(usuario: object) {
    this.usuarioLogin = usuario;
  }
  public getUsuarioLogin(): object {
    return this.usuarioLogin;
  }
  public setValidacionLogin(userLogin: string) {
    localStorage.setItem("user", userLogin);
    this.userLogin = userLogin;
  }
  public getValidacionLogin(): string {
    return this.userLogin;
  }

  public closeSession(){
    localStorage.clear();
  }

}