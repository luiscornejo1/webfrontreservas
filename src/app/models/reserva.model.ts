export interface Reserva {
  id: number;
  codigoAsiento: string;
  nombreUsuario: string;
  fechaReserva?: string; // opcional si no lo usas aún
  estado?: 'ocupado' | 'libre' | 'no disponible';
}