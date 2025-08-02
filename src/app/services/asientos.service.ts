import { Asiento } from '../models/asiento.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsientosService {
  private apiUrl = 'http://localhost:8080/api/asientos'; // Cambia la URL si tu backend es diferente

  constructor(private http: HttpClient) {}

  getAsientosPorZona(zona: string): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/zona/${zona}`);
  }

  getAsientoById(id: number): Observable<Asiento> {
    return this.http.get<Asiento>(`${this.apiUrl}/${id}`);
  }

  getAsientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  reservarAsiento(asiento: any): Observable<any> {
    return this.http.post(this.apiUrl, asiento);
  }

  cambiarEstado(asiento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${asiento.id}`, asiento);
  }
}