import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuestosVigilanciaService {

  private baseUrl = environment.apiUrl; 

  constructor(private httpClient: HttpClient) { }

  obtenerPuestos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/optenertodospuestosvig`);
  }

  obtenerPuestoPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/obtenerpuestovigporid/${id}`);
  }

  crearPuesto(puestoData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/crearpuestovig`, puestoData);
  }

  editarPuesto(id: number, nuevoPuestoData: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/editarpuestovig/${id}`, nuevoPuestoData);
  }

  eliminarPuesto(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/eliminarpuestovig/${id}`);
  }
}
