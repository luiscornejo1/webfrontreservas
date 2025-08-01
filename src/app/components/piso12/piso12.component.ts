import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-piso12',
  templateUrl: './piso12.component.html',
  styleUrls: ['./piso12.component.css']
})
export class Piso12Component {
  zonaSeleccionada: string | null = null;

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  mostrarZona(zona: string) {
    this.zonaSeleccionada = zona;
  }

  cerrarZoom() {
    this.zonaSeleccionada = null;
  }
}
