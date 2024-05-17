import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuestosEXcentroService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerPuestosExCentro(idcentro_formacion: number): Observable<any> {
    const url = `${this.baseUrl}listPuestosEXcentro/${idcentro_formacion}`; // Agregar la barra inclinada

    return this.httpClient.get<any>(url);
  }

  crearPuestoVExCentro(puntosvelectronicaData: any): Observable<any> {
    const url = `${this.baseUrl}crearPVExCentro`;
    return this.httpClient.post<any>(url, puntosvelectronicaData);
  }

  editarPuestoVExCentro(idpuntosvelectronica: number, nuevoPuestoXcentroData: any): Observable<any> {
    const url = `${this.baseUrl}editPVEXcentro/${idpuntosvelectronica}`;
    return this.httpClient.put<any>(url, nuevoPuestoXcentroData);
  }

  eliminarPuestoVExCentro(idpuntosvelectronica: number): Observable<any> {
    const url = `${this.baseUrl}eliminarPVEXcentro/${idpuntosvelectronica}`; 
    return this.httpClient.delete<any>(url);
  }
}
