import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AsientosService } from 'src/app/services/asientos.service';
import { Asiento } from 'src/app/models/asiento.model';

@Component({
  selector: 'app-piso19-zona1',
  templateUrl: './piso19-zona1.component.html',
  styleUrls: ['./piso19-zona1.component.css']
})
export class Piso19Zona1Component implements OnInit {
  zoomActivo = false;
  asientos: Asiento[] = [];
  mostrarModal = false;
  asientoSeleccionado: Asiento | null = null;
  nombreReserva = '';
  reservaExitosa = false;
  errorReserva = '';

  constructor(private asientosService: AsientosService, private cdr: ChangeDetectorRef) {}

  esNoDisponible(estado: string | undefined): boolean {
    return estado === 'no disponible';
  }
  esLibre(estado: string | undefined): boolean {
    return estado === 'libre';
  }
  esOcupado(estado: string | undefined): boolean {
    return estado === 'ocupado';
  }

  ngOnInit() {
    setTimeout(() => {
      this.zoomActivo = true;
    }, 100);
    this.cargarAsientos();
  }

  cargarAsientos() {
    this.asientosService.getAsientosPorZona('zona8').subscribe({
      next: (data) => this.asientos = data,
      error: (err) => console.error('Error cargando asientos', err)
    });
  }

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
    const asientoActualizado = {
      ...this.asientoSeleccionado,
      estado: 'ocupado',
      nombre: this.nombreReserva
    };
    this.asientosService.cambiarEstado(asientoActualizado).subscribe({
      next: () => {
        this.cargarAsientos();
        this.asientosService.getAsientoById(asientoActualizado.id).subscribe({
          next: (asientoActualizadoBackend) => {
            this.asientoSeleccionado = { ...asientoActualizadoBackend };
            this.reservaExitosa = true;
            this.errorReserva = '';
            this.cdr.detectChanges();
          },
          error: () => {
            const actualizado = this.asientos.find(a => a.id === asientoActualizado.id);
            if (actualizado) this.asientoSeleccionado = { ...actualizado };
            this.reservaExitosa = true;
            this.errorReserva = '';
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.errorReserva = 'Error al reservar el asiento.';
      }
    });
  }

  toggleEstado(): void {
    if (this.asientoSeleccionado && this.asientoSeleccionado.estado !== 'no disponible') {
      const nuevoEstado = this.asientoSeleccionado.estado === 'ocupado' ? 'libre' : 'ocupado';
      const asientoActualizado = {
        ...this.asientoSeleccionado,
        estado: nuevoEstado,
        nombre: nuevoEstado === 'ocupado' ? 'Reservado manualmente' : null
      };
      this.asientosService.cambiarEstado(asientoActualizado).subscribe({
        next: () => {
          this.cargarAsientos();
          this.asientosService.getAsientoById(asientoActualizado.id).subscribe({
            next: (asientoActualizadoBackend) => {
              this.asientoSeleccionado = { ...asientoActualizadoBackend };
              this.cdr.detectChanges();
            },
            error: () => {
              const actualizado = this.asientos.find(a => a.id === asientoActualizado.id);
              if (actualizado) this.asientoSeleccionado = { ...actualizado };
              this.cdr.detectChanges();
            }
          });
        },
        error: () => {/* opcional: manejar error */}
      });
    }
  }

  toggleNoDisponible(): void {
    if (this.asientoSeleccionado) {
      const nuevoEstado = this.asientoSeleccionado.estado === 'no disponible' ? 'libre' : 'no disponible';
      const asientoActualizado = { ...this.asientoSeleccionado, estado: nuevoEstado, nombre: null };
      this.asientosService.cambiarEstado(asientoActualizado).subscribe({
        next: () => {
          this.cargarAsientos();
          this.asientosService.getAsientoById(asientoActualizado.id).subscribe({
            next: (asientoActualizadoBackend) => {
              this.asientoSeleccionado = { ...asientoActualizadoBackend };
              this.cdr.detectChanges();
            },
            error: () => {
              const actualizado = this.asientos.find(a => a.id === asientoActualizado.id);
              if (actualizado) this.asientoSeleccionado = { ...actualizado };
              this.cdr.detectChanges();
            }
          });
        },
        error: () => {/* opcional: manejar error */}
      });
    }
  }
}
