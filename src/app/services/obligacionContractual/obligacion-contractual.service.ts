
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
    const url = `${this.baseUrl}verobligacionContractuales`;
    return this.http.get<any>(url);
  }

  obtenerObligacionContractualPorId(id: number): Observable<any> {
    const url = `${this.baseUrl}obligacionContractualPorId/${id}`;
    return this.http.get<any>(url);
  }

  crearObligacionContractual(obligacionData: any): Observable<any> {
    const url = `${this.baseUrl}crearObligacionContractual`;
    return this.http.post<any>(url, obligacionData);
  }

  actualizarObligacionContractualPorId(id: number, obligacionData: any): Observable<any> {
    const url = `${this.baseUrl}editarObligacionContractual/${id}`;
    return this.http.put<any>(url, obligacionData);
  }

  eliminarObligacionContractualPorId(id: number): Observable<any> {
    const url = `${this.baseUrl}eliminarObligacionContractual/${id}`;
    return this.http.delete<any>(url);
  }
}
