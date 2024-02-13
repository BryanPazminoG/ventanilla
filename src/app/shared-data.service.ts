import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private numeroCuenta: string = '';
  private clienteEncontrado: { nombres: string; apellidos: string } | null = null;
  private totalDollars: number | null = null;

  constructor() {}

  setDatosRetiro(numeroCuenta: string, clienteEncontrado: { nombres: string; apellidos: string }, totalDollars: number) {
    this.numeroCuenta = numeroCuenta;
    this.clienteEncontrado = clienteEncontrado;
    this.totalDollars = totalDollars;
  }

  getNumeroCuenta(): string {
    return this.numeroCuenta;
  }

  getClienteEncontrado(): { nombres: string; apellidos: string } | null {
    return this.clienteEncontrado;
  }

  getTotalDollars(): number | null {
    return this.totalDollars;
  }
}
