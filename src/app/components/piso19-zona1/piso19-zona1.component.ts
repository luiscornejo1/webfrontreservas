import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piso19-zona1',
  templateUrl: './piso19-zona1.component.html',
  styleUrls: ['./piso19-zona1.component.css']
})
export class Piso19Zona1Component implements OnInit {
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
  ngOnInit() {
    setTimeout(() => {
      this.zoomActivo = true;
    }, 100);
  }
  asientos: { codigo: string, nombre: string | null, estado: 'ocupado' | 'libre' | 'no disponible' }[] = [
    { codigo: 'DIE 99', nombre: null, estado: 'libre' },
    { codigo: 'DIE 100', nombre: null, estado: 'libre' }
  ];
  mostrarModal = false;
  asientoSeleccionado: { codigo: string, nombre: string | null, estado: 'ocupado' | 'libre' | 'no disponible' } | null = null;
  nombreReserva = '';
  reservaExitosa = false;
  errorReserva = '';

  seleccionarAsiento(asiento: any) {
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
    const idx = this.asientos.findIndex(a => a.codigo === this.asientoSeleccionado?.codigo);
    if (idx !== -1 && this.asientos[idx].estado === 'libre') {
      this.asientos[idx].estado = 'ocupado';
      this.asientos[idx].nombre = this.nombreReserva;
      if (this.asientoSeleccionado) {
        this.asientoSeleccionado.estado = 'ocupado';
        this.asientoSeleccionado.nombre = this.nombreReserva;
      }
      this.reservaExitosa = true;
      this.errorReserva = '';
    } else if (idx !== -1 && this.asientos[idx].estado === 'no disponible') {
      this.errorReserva = 'El asiento está marcado como NO DISPONIBLE.';
    } else {
      this.errorReserva = 'El asiento ya está ocupado.';
    }
  }

  toggleEstado(): void {
    if (this.asientoSeleccionado && this.asientoSeleccionado.estado !== 'no disponible') {
      const idx = this.asientos.findIndex((a: any) => a.codigo === this.asientoSeleccionado!.codigo);
      if (this.asientoSeleccionado.estado === 'ocupado') {
        this.asientoSeleccionado.estado = 'libre';
        this.asientoSeleccionado.nombre = null;
        if (idx !== -1) {
          this.asientos[idx].estado = 'libre';
          this.asientos[idx].nombre = null;
        }
      } else {
        this.asientoSeleccionado.estado = 'ocupado';
        this.asientoSeleccionado.nombre = 'Reservado manualmente';
        if (idx !== -1) {
          this.asientos[idx].estado = 'ocupado';
          this.asientos[idx].nombre = 'Reservado manualmente';
        }
      }
    }
  }

  toggleNoDisponible(): void {
    if (this.asientoSeleccionado) {
      const idx = this.asientos.findIndex((a: any) => a.codigo === this.asientoSeleccionado!.codigo);
      if (this.asientoSeleccionado.estado === 'no disponible') {
        this.asientoSeleccionado.estado = 'libre';
        if (idx !== -1) this.asientos[idx].estado = 'libre';
      } else {
        this.asientoSeleccionado.estado = 'no disponible';
        this.asientoSeleccionado.nombre = null;
        if (idx !== -1) {
          this.asientos[idx].estado = 'no disponible';
          this.asientos[idx].nombre = null;
        }
      }
    }
  }
}
