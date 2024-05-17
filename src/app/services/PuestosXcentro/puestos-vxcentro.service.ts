import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuestosVXcentroService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerPuestosVxCentro(idcentro_formacion: number): Observable<any> {
    const url = `${this.baseUrl}listPuestosXcentro/${idcentro_formacion}`; // Agregar la barra inclinada

    return this.httpClient.get<any>(url);
  }
  crearPuestoVxCentro(puestosvigilanciaXcentroData: any): Observable<any> {
    const url = `${this.baseUrl}crearPVxCentro`;
    return this.httpClient.post<any>(url, puestosvigilanciaXcentroData);
  }

  editarPuestoVxCentro(idpuestosvxcentrof: number, nuevoPuestoXcentroData: any): Observable<any> {
    const url = `${this.baseUrl}editPVXcentro/${idpuestosvxcentrof}`;
    return this.httpClient.put<any>(url, nuevoPuestoXcentroData);
  }

  eliminarPuestoVxCentro(idpuestosvxcentrof: number): Observable<any> {
    const url = `${this.baseUrl}eliminarPVXcentro/${idpuestosvxcentrof}`; 
    return this.httpClient.delete<any>(url);
  }
}
