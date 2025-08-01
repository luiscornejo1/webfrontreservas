export interface Asiento {
  id: number;
  codigo: string;
  estado: 'ocupado' | 'libre' | 'no disponible';
  nombre?: string; // si guardas el nombre del usuario que reservó
}