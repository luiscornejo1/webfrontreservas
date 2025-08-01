
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piso12-zona1',
  templateUrl: './piso12-zona1.component.html',
  styleUrls: ['./piso12-zona1.component.css']
})
export class Piso12Zona1Component implements OnInit {
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
    { codigo: 'DGP 10', nombre: null, estado: 'libre' },
    { codigo: 'DGP 11', nombre: null, estado: 'libre' },
    { codigo: 'DGP 12', nombre: null, estado: 'libre' },
    { codigo: 'DGP 13', nombre: null, estado: 'libre' },
    { codigo: 'DGP 14', nombre: null, estado: 'libre' },
    { codigo: 'DGP 15', nombre: null, estado: 'libre' },
    { codigo: 'DGP 16', nombre: null, estado: 'libre' },
    { codigo: 'DGP 17', nombre: null, estado: 'libre' },
    { codigo: 'DGP 18', nombre: null, estado: 'libre' },
    { codigo: 'DGP 19', nombre: null, estado: 'libre' },
    { codigo: 'DGP 20', nombre: null, estado: 'libre' },
    { codigo: 'DGP 21', nombre: null, estado: 'libre' },
    { codigo: 'DGP 22', nombre: null, estado: 'libre' },
    { codigo: 'DGP 23', nombre: null, estado: 'libre' },
    { codigo: 'DGP 24', nombre: null, estado: 'libre' },
    { codigo: 'DGP 25', nombre: null, estado: 'libre' },
    { codigo: 'DGP 26', nombre: null, estado: 'libre' },
    { codigo: 'DIE 11', nombre: null, estado: 'libre' },
    { codigo: 'DIE 12', nombre: null, estado: 'libre' },
    { codigo: 'DIE 13', nombre: null, estado: 'libre' },
    { codigo: 'DIE 14', nombre: null, estado: 'libre' },
    { codigo: 'DIE 15', nombre: null, estado: 'libre' },
    { codigo: 'DIE 16', nombre: null, estado: 'libre' },
    { codigo: 'DIE 17', nombre: null, estado: 'libre' },
    { codigo: 'DIE 18', nombre: null, estado: 'libre' },
    { codigo: 'DIE 19', nombre: null, estado: 'libre' },
    { codigo: 'DIE 20', nombre: null, estado: 'libre' },
    { codigo: 'DIE 21', nombre: null, estado: 'libre' },
    { codigo: 'DIE 22', nombre: null, estado: 'libre' },
    { codigo: 'DIE 23', nombre: null, estado: 'libre' },
    { codigo: 'DIE 24', nombre: null, estado: 'libre' },
    { codigo: 'DIE 25', nombre: null, estado: 'libre' },
    { codigo: 'DIE 197', nombre: null, estado: 'libre' },
    { codigo: 'DIE 198', nombre: null, estado: 'libre' },
    { codigo: 'DIE 199', nombre: null, estado: 'libre' },
    { codigo: 'DIE 200', nombre: null, estado: 'libre' },
    { codigo: 'DIE 201', nombre: null, estado: 'libre' },
    { codigo: 'DIE 202', nombre: null, estado: 'libre' }
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
