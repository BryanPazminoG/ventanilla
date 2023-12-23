import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebarv',
  templateUrl: './sidebarv.component.html',
  styleUrls: ['./sidebarv.component.css']
})
export class SidebarvComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
  }
  
  activeLink: string = ''; // Variable para almacenar el enlace activo

  setActiveLink(link: string): void {
    this.activeLink = link; // Función para establecer el enlace activo
  }
}
