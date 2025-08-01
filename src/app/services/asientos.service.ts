import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsientosService {
  private apiUrl = 'http://localhost:8080/api/asientos'; // Cambia la URL si tu backend es diferente

  constructor(private http: HttpClient) {}

  getAsientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  reservarAsiento(asiento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservar`, asiento);
  }

  cambiarEstado(asientoId: number, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${asientoId}/estado`, { estado });
  }
}