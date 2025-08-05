import { Asiento } from '../models/asiento.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AsientosService {
  private apiUrl = `${environment.apiUrl}/asientos`;

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