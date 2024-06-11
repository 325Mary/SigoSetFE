import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObligacionesContratistaService {

  
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  obtenerObligacionesContratista(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}listObligacionesContratista`);
  }

  crearObligacionContratista(obligacionContratista: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}crearObligacionContratista`, obligacionContratista);
  }

  EditarObligacionContratista(idobligaciones_contratista: number, obligacionContratista: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}editObligacionContratista/${idobligaciones_contratista}`, obligacionContratista);
  }

  EliminarObligacionContratista(idobligaciones_contratista: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}EliminarObligacionContratista/${idobligaciones_contratista}`);
  }
}
