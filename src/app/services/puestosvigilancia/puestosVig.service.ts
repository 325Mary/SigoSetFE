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
    return this.httpClient.get(`${this.baseUrl}puestos`);
  }

  obtenerPuestoPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}puestoporid/${id}`);
  }

  crearPuesto(puestoData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}crearPuesto`, puestoData);
  }

  editarPuesto(id: number, nuevoPuestoData: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}editarPuesto/${id}`, nuevoPuestoData);
  }

  eliminarPuesto(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}eliminarPuesto/${id}`);
  }

  calcularTotal(tarifa: number): number {
      const ays = tarifa *  0.08;
      const iva = (tarifa + ays )* 0.19;
      const total = tarifa + iva + ays;
      return total;
    }
    


}
