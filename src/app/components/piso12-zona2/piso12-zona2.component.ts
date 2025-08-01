
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piso12-zona2',
  templateUrl: './piso12-zona2.component.html',
  styleUrls: ['./piso12-zona2.component.css']
})
export class Piso12Zona2Component implements OnInit {
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
    { codigo: 'DGP 27', nombre: null, estado: 'libre' },
    { codigo: 'DGP 28', nombre: null, estado: 'libre' },
    { codigo: 'DGP 29', nombre: null, estado: 'libre' },
    { codigo: 'DGP 30', nombre: null, estado: 'libre' },
    { codigo: 'DGP 31', nombre: null, estado: 'libre' },
    { codigo: 'DGP 32', nombre: null, estado: 'libre' },
    { codigo: 'DGP 33', nombre: null, estado: 'libre' },
    { codigo: 'DGP 34', nombre: null, estado: 'libre' },
    { codigo: 'DGP 35', nombre: null, estado: 'libre' },
    { codigo: 'DGP 36', nombre: null, estado: 'libre' },
    { codigo: 'DGP 37', nombre: null, estado: 'libre' },
    { codigo: 'DGP 38', nombre: null, estado: 'libre' },
    { codigo: 'DGP 39', nombre: null, estado: 'libre' },
    { codigo: 'DGP 40', nombre: null, estado: 'libre' },
    { codigo: 'DGP 41', nombre: null, estado: 'libre' },
    { codigo: 'DGP 42', nombre: null, estado: 'libre' },
    { codigo: 'DGP 43', nombre: null, estado: 'libre' },
    { codigo: 'DIE 26', nombre: null, estado: 'libre' },
    { codigo: 'DIE 27', nombre: null, estado: 'libre' },
    { codigo: 'DIE 28', nombre: null, estado: 'libre' },
    { codigo: 'DIE 29', nombre: null, estado: 'libre' },
    { codigo: 'DIE 30', nombre: null, estado: 'libre' },
    { codigo: 'DIE 31', nombre: null, estado: 'libre' },
    { codigo: 'DIE 32', nombre: null, estado: 'libre' },
    { codigo: 'DIE 33', nombre: null, estado: 'libre' },
    { codigo: 'DIE 34', nombre: null, estado: 'libre' },
    { codigo: 'DIE 35', nombre: null, estado: 'libre' },
    { codigo: 'DIE 36', nombre: null, estado: 'libre' },
    { codigo: 'DIE 37', nombre: null, estado: 'libre' },
    { codigo: 'DIE 38', nombre: null, estado: 'libre' },
    { codigo: 'DIE 39', nombre: null, estado: 'libre' },
    { codigo: 'DIE 40', nombre: null, estado: 'libre' },
    { codigo: 'DIE 203', nombre: null, estado: 'libre' },
    { codigo: 'DIE 204', nombre: null, estado: 'libre' },
    { codigo: 'DIE 205', nombre: null, estado: 'libre' },
    { codigo: 'DIE 206', nombre: null, estado: 'libre' }
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
