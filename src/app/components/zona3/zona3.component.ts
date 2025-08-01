import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zona3',
  templateUrl: './zona3.component.html',
  styleUrls: ['./zona3.component.css', './zona3.component.scss']
})
export class Zona3Component implements OnInit {
  // Helpers para la plantilla
  esNoDisponible(estado: string | undefined): boolean {
    return estado === 'no disponible';
  }
  esLibre(estado: string | undefined): boolean {
    return estado === 'libre';
  }
  esOcupado(estado: string | undefined): boolean {
    return estado === 'ocupado';
  }
  zoomActivo = false;
  lactario = {
    estado: 'ocupado',
    nombreCompleto: 'Carlos Ruiz'
  };
  mostrarModal = false;

  ngOnInit() {
    setTimeout(() => {
      this.zoomActivo = true;
    }, 100);
  }

  toggleEstado(): void {
    if (this.lactario.estado !== 'no disponible') {
      if (this.lactario.estado === 'ocupado') {
        this.lactario.estado = 'libre';
        this.lactario.nombreCompleto = '';
      } else {
        this.lactario.estado = 'ocupado';
        this.lactario.nombreCompleto = 'Reservado manualmente';
      }
    }
  }

  toggleNoDisponible(): void {
    if (this.lactario.estado === 'no disponible') {
      this.lactario.estado = 'libre';
    } else {
      this.lactario.estado = 'no disponible';
      this.lactario.nombreCompleto = '';
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}