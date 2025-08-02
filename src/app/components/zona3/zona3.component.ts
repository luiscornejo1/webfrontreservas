import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AsientosService } from 'src/app/services/asientos.service';
import { Asiento } from 'src/app/models/asiento.model';

@Component({
  selector: 'app-zona3',
  templateUrl: './zona3.component.html',
  styleUrls: ['./zona3.component.css', './zona3.component.scss']
})
export class Zona3Component implements OnInit {
  zoomActivo = false;
  asientos: Asiento[] = [];
  mostrarModal = false;
  asientoSeleccionado: Asiento | null = null;

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
    this.asientosService.getAsientosPorZona('zona3').subscribe({
      next: (data) => this.asientos = data,
      error: (err) => console.error('Error cargando asientos', err)
    });
  }

  seleccionarAsiento(asiento: Asiento) {
    this.asientoSeleccionado = { ...asiento };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.asientoSeleccionado = null;
  }

  // Alternar estado entre ocupado y libre (con confirmación)
  toggleEstado(): void {
    if (this.asientoSeleccionado && this.asientoSeleccionado.estado !== 'no disponible') {
      const esOcupado = this.asientoSeleccionado.estado === 'ocupado';
      const mensaje = esOcupado
        ? '¿Estás seguro de liberar este espacio?'
        : '¿Deseas ocupar este espacio?';
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: mensaje }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const nuevoEstado = esOcupado ? 'libre' : 'ocupado';
          const asientoActualizado = {
            ...this.asientoSeleccionado!,
            estado: nuevoEstado
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
            },
            error: () => {/* opcional: manejar error */}
          });
        }
      });
    }
  }

  // Alternar estado no disponible (con confirmación)
  toggleNoDisponible(): void {
    if (this.asientoSeleccionado) {
      const esNoDisponible = this.asientoSeleccionado.estado === 'no disponible';
      const mensaje = esNoDisponible
        ? '¿Deseas marcar este espacio como disponible?'
        : '¿Deseas marcar este espacio como NO DISPONIBLE?';
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
            error: () => {/* opcional: manejar error */}
          });
        }
      });
    }
  }
}