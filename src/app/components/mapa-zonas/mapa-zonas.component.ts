
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa-zonas',
  templateUrl: './mapa-zonas.component.html',
  styleUrls: ['./mapa-zonas.component.css']
})

export class MapaZonasComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}