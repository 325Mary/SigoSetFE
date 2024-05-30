
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObligacionContractualService {

  

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerObligacionesContractuales(): Observable<any> {
    const url = `${this.baseUrl}vertodoObligacionesContractuales`;
    return this.http.get<any>(url);
  }

  obtenerObligacionContractualPorId(idobligaciones_contractuales: number): Observable<any> {
    const url = `${this.baseUrl}obligacionContractualPorId/${idobligaciones_contractuales}`;
    return this.http.get<any>(url);
  }

  crearObligacionContractual(nuevaObligacion: any): Observable<any> {
    const url = `${this.baseUrl}crearObligacionContractual`;
    return this.http.post<any>(url, nuevaObligacion);
  }

  actualizarObligacionContractualPorId(idobligaciones_contractuales: number, nuevaObligacion: any): Observable<any> {
    const url = `${this.baseUrl}editarObligacionContractual/${idobligaciones_contractuales}`;
    return this.http.put<any>(url, nuevaObligacion);
  }

  eliminarObligacionContractualPorId(idobligaciones_contractuales: number): Observable<any> {
    const url = `${this.baseUrl}eliminarObligacionContractual/${idobligaciones_contractuales}`;
    return this.http.delete<any>(url);
  }
}
