import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObligacionesContratoService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  obtenerObligacionesContrato(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}obtenerObligacionesContrato`);
  }

  crearObligacionContrato(obligacionContrato: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}crearObligacion`, obligacionContrato);
  }

  EditarObligacionContrato(idobligaciones_contrato: number, obligacionContrato: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}actualizarObligacion/${idobligaciones_contrato}`, obligacionContrato);
  }

  EliminarObligacionContrato(idobligaciones_contrato: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}eliminarObligacion/${idobligaciones_contrato}`);
  }
}
