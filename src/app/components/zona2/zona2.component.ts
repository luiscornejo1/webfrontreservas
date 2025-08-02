import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AsientosService } from 'src/app/services/asientos.service';
import { Asiento } from 'src/app/models/asiento.model';

@Component({
  selector: 'app-zona2',
  templateUrl: './zona2.component.html',
  styleUrls: ['./zona2.component.css', './zona2.component.scss']
})
export class Zona2Component implements OnInit {
  zoomActivo = false;
  asientos: Asiento[] = [];
  mostrarModal = false;
  asientoSeleccionado: Asiento | null = null;
  nombreReserva = '';
  reservaExitosa = false;
  errorReserva = '';

  constructor(
    private asientosService: AsientosService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

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

  ngOnInit() {
    setTimeout(() => {
      this.zoomActivo = true;
    }, 100);
    this.cargarAsientos();
  }

  cargarAsientos() {
    this.asientosService.getAsientosPorZona('zona2').subscribe({
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Deseas reservar este asiento?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const reserva = {
          ...this.asientoSeleccionado!,
          nombre: this.nombreReserva,
          estado: 'ocupado'
        };
        this.asientosService.cambiarEstado(reserva).subscribe({
          next: () => {
            this.reservaExitosa = true;
            this.errorReserva = '';
            this.cargarAsientos();
            this.mostrarModal = false;
          },
          error: (err) => {
            this.errorReserva = 'Error al reservar asiento';
          }
        });
      }
    });
  }

  // Método para alternar estado entre ocupado y libre (con confirmación)
  toggleEstado(): void {
    if (this.asientoSeleccionado && this.asientoSeleccionado.estado !== 'no disponible') {
      const esOcupado = this.asientoSeleccionado.estado === 'ocupado';
      const mensaje = esOcupado
        ? '¿Estás seguro de liberar este asiento?'
        : '¿Deseas reservar este asiento?';
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: mensaje }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const nuevoEstado = esOcupado ? 'libre' : 'ocupado';
          const asientoActualizado = {
            ...this.asientoSeleccionado!,
            estado: nuevoEstado,
            nombre: nuevoEstado === 'libre' ? '' : this.asientoSeleccionado!.nombre || ''
          };
          this.asientosService.cambiarEstado(asientoActualizado).subscribe({
            next: () => {
              this.cargarAsientos();
              if (asientoActualizado.id !== undefined) {
                this.asientosService.getAsientoById(asientoActualizado.id as number).subscribe({
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
              }
              if (nuevoEstado === 'libre') {
                this.nombreReserva = '';
                this.reservaExitosa = false;
                this.errorReserva = '';
              }
            },
            error: () => this.errorReserva = 'Error al cambiar estado'
          });
        }
      });
    }
  }

  // Método para marcar/desmarcar como no disponible (con confirmación)
  toggleNoDisponible(): void {
    if (this.asientoSeleccionado) {
      const esNoDisponible = this.asientoSeleccionado.estado === 'no disponible';
      const mensaje = esNoDisponible
        ? '¿Deseas marcar este asiento como disponible?'
        : '¿Deseas marcar este asiento como NO DISPONIBLE?';
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: mensaje }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const nuevoEstado = esNoDisponible ? 'libre' : 'no disponible';
          const asientoActualizado = { ...this.asientoSeleccionado, estado: nuevoEstado };
          this.asientosService.cambiarEstado(asientoActualizado).subscribe({
            next: () => {
              this.cargarAsientos();
              if (asientoActualizado.id !== undefined) {
                this.asientosService.getAsientoById(asientoActualizado.id as number).subscribe({
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
              }
            },
            error: () => this.errorReserva = 'Error al cambiar estado'
          });
        }
      });
    }
  }
}