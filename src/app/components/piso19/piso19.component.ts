import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-piso19',
  templateUrl: './piso19.component.html',
  styleUrls: ['./piso19.component.css']
})
export class Piso19Component {
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
