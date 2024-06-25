import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SedesService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerSedes(): Observable<any> {
    const url = `${this.baseUrl}sedesFormacion`;
    return this.httpClient.get<any>(url);
  }

  creaSede(sedeData: any): Observable<any> {
    const url = `${this.baseUrl}sedeFormacion`;
    return this.httpClient.post<any>(url, sedeData);
  }

  ObtenerSede(idSedeFormacion: number): Observable<any> {
    const url = `${this.baseUrl}sedeFormacion/${idSedeFormacion}`;
    return this.httpClient.get(url); 
  }


  editarSede(idSedeFormacion: number, nuevaSedeData: any): Observable<any> {
    const url = `${this.baseUrl}sedeFormacion/${idSedeFormacion}`;
    return this.httpClient.put<any>(url, nuevaSedeData);
  }

  eliminarSede(idsede_formacion: number): Observable<any> {
    const url = `${this.baseUrl}sedeFormacion/${idsede_formacion}`;
    return this.httpClient.delete<any>(url);
  }

  obtenerSedesPorCentroFormacion(idCentroFormacion: string): Observable<any> {
    const url = `${this.baseUrl}sedeXcentroFormacion/${idCentroFormacion}`;
    return this.httpClient.get<any>(url);
  }
}
