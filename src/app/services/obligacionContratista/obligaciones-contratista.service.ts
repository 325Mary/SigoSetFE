import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObligacionesContratistaService {


  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  obtenerObligacionesContratista(): Observable<any> {
    const url = `${this.baseUrl}listObligacionesContratista`;
    return this.httpClient.get<any>(url);

  }

  obtenerObligacionContratistaC(idobligaciones_contratista: number): Observable<any> {
    const url = `${this.baseUrl}obtenerObligacionContratistaC/${idobligaciones_contratista}`;
    return this.httpClient.get(url); // Debes retornar el resultado de la llamada HTTP
  }


  crearObligacionContratista(nuevaObligacioncontratista: any): Observable<any> {
    const url = `${this.baseUrl}crearObligacionContratista`;
    return this.httpClient.post<any>(url, nuevaObligacioncontratista);

  }

  EditarObligacionContratista(idobligaciones_contratista: number, obligacionContratista: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}editObligacionContratista/${idobligaciones_contratista}`, obligacionContratista);
  }

  EliminarObligacionContratista(idobligaciones_contratista: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}EliminarObligacionContratista/${idobligaciones_contratista}`);
  }
}
