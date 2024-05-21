
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
    return this.http.get(this.baseUrl);
  }

  obtenerObligacionContractualPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/obligacionContractualPorId/${id}`);
  }

  crearObligacionContractual(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crearObligacionContractual`, data);
  }

  actualizarObligacionContractualPorId(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editarObligacionContractual/${id}`, data);
  }

  eliminarObligacionContractualPorId(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminarObligacionContractual/${id}`);
  }
}