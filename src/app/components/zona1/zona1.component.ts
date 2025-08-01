import { Component, OnInit } from '@angular/core';
import { AsientosService } from 'src/app/services/asientos.service';
import { Asiento } from 'src/app/models/asiento.model'; 

@Component({
  selector: 'app-zona1',
  templateUrl: './zona1.component.html',
  styleUrls: ['./zona1.component.css', './zona1.component.scss']
})
export class Zona1Component implements OnInit {
  constructor(private asientosService: AsientosService) {}
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
  asientos: Asiento[] = [];
  ngOnInit() {
    setTimeout(() => {
      this.zoomActivo = true;
    }, 100);
    this.cargarAsientos();
  }

  cargarAsientos() {
    this.asientosService.getAsientos().subscribe({
      next: (data) => this.asientos = data,
      error: (err) => console.error('Error cargando asientos', err)
    });
  }
  mostrarModal = false;
  asientoSeleccionado: Asiento | null = null;
  nombreReserva = '';
  reservaExitosa = false;
  errorReserva = '';

  seleccionarAsiento(asiento: Asiento) {
    this.asientoSeleccionado = { ...asiento };
    this.mostrarModal = true;
    this.nombreReserva = '';
    this.reservaExitosa = false;
    this.errorReserva = '';
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.asientoSeleccionado = null;
    this.nombreReserva = '';
    this.reservaExitosa = false;
    this.errorReserva = '';
  }

  reservarAsiento() {
    if (!this.nombreReserva) {
      this.errorReserva = 'Debes ingresar tu nombre.';
      return;
    }
    if (!this.asientoSeleccionado) return;
    const reserva = {
      ...this.asientoSeleccionado,
      nombre: this.nombreReserva
    };
    this.asientosService.reservarAsiento(reserva).subscribe({
      next: (resp) => {
        this.reservaExitosa = true;
        this.errorReserva = '';
        this.cargarAsientos();
      },
      error: (err) => {
        this.errorReserva = 'Error al reservar asiento';
      }
    });
  }

// Método para alternar estado entre ocupado y libre (no permite si es 'no disponible')
toggleEstado(): void {
  if (this.asientoSeleccionado && this.asientoSeleccionado.estado !== 'no disponible') {
    const nuevoEstado = this.asientoSeleccionado.estado === 'ocupado' ? 'libre' : 'ocupado';
    this.asientosService.cambiarEstado(this.asientoSeleccionado.id, nuevoEstado).subscribe({
      next: () => this.cargarAsientos(),
      error: () => this.errorReserva = 'Error al cambiar estado'
    });
  }
}

// Método para marcar/desmarcar como no disponible
toggleNoDisponible(): void {
  if (this.asientoSeleccionado) {
    const nuevoEstado = this.asientoSeleccionado.estado === 'no disponible' ? 'libre' : 'no disponible';
    this.asientosService.cambiarEstado(this.asientoSeleccionado.id, nuevoEstado).subscribe({
      next: () => this.cargarAsientos(),
      error: () => this.errorReserva = 'Error al cambiar estado'
    });
  }
}
}