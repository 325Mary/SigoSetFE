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
    const url = `${this.baseUrl}puestos`;
    return this.httpClient.get<any>(url);
  }

  obtenerPuestoPorId(idpuesto_vigilancia: number): Observable<any> {
    const url = `${this.baseUrl}puestos/${idpuesto_vigilancia}`;
    return this.httpClient.get<any>(url);
  }

  crearPuesto(puestoData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}crearPuesto`, puestoData);
  }

  editarPuesto(idpuesto_vigilancia: number, nuevoPuestoData: any): Observable<any> {
    const url = `${this.baseUrl}editarPuesto/${idpuesto_vigilancia}`;
    return this.httpClient.get<any>(url,nuevoPuestoData);  }

  eliminarPuesto(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}eliminarPuesto/${id}`);
  }
}
