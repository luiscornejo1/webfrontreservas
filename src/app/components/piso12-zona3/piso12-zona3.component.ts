
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piso12-zona3',
  templateUrl: './piso12-zona3.component.html',
  styleUrls: ['./piso12-zona3.component.css']
})
export class Piso12Zona3Component implements OnInit {
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
    { codigo: 'DGP 44', nombre: null, estado: 'libre' },
    { codigo: 'DGP 45', nombre: null, estado: 'libre' },
    { codigo: 'DGP 46', nombre: null, estado: 'libre' },
    { codigo: 'DGP 47', nombre: null, estado: 'libre' },
    { codigo: 'DGP 48', nombre: null, estado: 'libre' },
    { codigo: 'DGP 49', nombre: null, estado: 'libre' },
    { codigo: 'DGP 50', nombre: null, estado: 'libre' },
    { codigo: 'DGP 51', nombre: null, estado: 'libre' },
    { codigo: 'DGP 52', nombre: null, estado: 'libre' },
    { codigo: 'DGP 53', nombre: null, estado: 'libre' },
    { codigo: 'DGP 54', nombre: null, estado: 'libre' },
    { codigo: 'DGP 55', nombre: null, estado: 'libre' },
    { codigo: 'DGP 56', nombre: null, estado: 'libre' },
    { codigo: 'DGP 57', nombre: null, estado: 'libre' },
    { codigo: 'DGP 58', nombre: null, estado: 'libre' },
    { codigo: 'DGP 59', nombre: null, estado: 'libre' },
    { codigo: 'DGP 60', nombre: null, estado: 'libre' },
    { codigo: 'DIE 41', nombre: null, estado: 'libre' },
    { codigo: 'DIE 42', nombre: null, estado: 'libre' },
    { codigo: 'DIE 43', nombre: null, estado: 'libre' },
    { codigo: 'DIE 44', nombre: null, estado: 'libre' },
    { codigo: 'DIE 45', nombre: null, estado: 'libre' },
    { codigo: 'DIE 46', nombre: null, estado: 'libre' },
    { codigo: 'DIE 47', nombre: null, estado: 'libre' },
    { codigo: 'DIE 48', nombre: null, estado: 'libre' },
    { codigo: 'DIE 49', nombre: null, estado: 'libre' },
    { codigo: 'DIE 50', nombre: null, estado: 'libre' },
    { codigo: 'DIE 51', nombre: null, estado: 'libre' },
    { codigo: 'DIE 52', nombre: null, estado: 'libre' },
    { codigo: 'DIE 53', nombre: null, estado: 'libre' },
    { codigo: 'DIE 54', nombre: null, estado: 'libre' },
    { codigo: 'DIE 207', nombre: null, estado: 'libre' },
    { codigo: 'DIE 208', nombre: null, estado: 'libre' },
    { codigo: 'DIE 209', nombre: null, estado: 'libre' },
    { codigo: 'DIE 210', nombre: null, estado: 'libre' }
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
