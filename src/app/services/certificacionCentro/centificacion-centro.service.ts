import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentificacionCentroService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerCertificacionesCentro(): Observable<any> {
    const url = `${this.baseUrl}listCertificacionCentro`;

    return this.httpClient.get<any>(url);
  }

  crearCertificacionCentro(certificacionCentrofData: any): Observable<any> {
    const url = `${this.baseUrl}crearCertificacionCentro`;
    return this.httpClient.post<any>(url, certificacionCentrofData);
  }

  editarCertificacionCentro(idcertificacion_centrof: number, nuevocertificacionCentrofData: any): Observable<any> {
    const url = `${this.baseUrl}editCertificacionCentro/${idcertificacion_centrof}`;
    return this.httpClient.put<any>(url, nuevocertificacionCentrofData);
  }

  eliminarCertificacionCentro(idcertificacion_centrof: number): Observable<any> {
    const url = `${this.baseUrl}EliminarCertificacionCentro/${idcertificacion_centrof}`; 
    return this.httpClient.delete<any>(url);
  }
  
}
