import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPuestosService {

 

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenersolicitudes_puestoss(): Observable<any> {
    const url = `${this.baseUrl}listSolicitudes_puestos`;
    return this.http.get<any>(url);
  }

  obtenersolicitudes_puestoslPorCentro(idcentro_formacion: number): Observable<any> {
    const url = `${this.baseUrl}listSolicitudes_puestos/${idcentro_formacion}`;
    return this.http.get<any>(url);
  }

  crearsolicitudes_puestosl(solicitud_puestoData: any): Observable<any> {
    const url = `${this.baseUrl}crearSolicitudes_puestos`;
    return this.http.post<any>(url, solicitud_puestoData);
  }

  actualizarsolicitudes_puestoslPorId(idsolicitud_puesto: number, nuevosolicitud_puestoData: any): Observable<any> {
    const url = `${this.baseUrl}editSolicitudes_puestos/${idsolicitud_puesto}`;
    return this.http.put<any>(url, nuevosolicitud_puestoData);
  }

  eliminarsolicitudes_puestoslPorId(idsolicitud_puesto: number): Observable<any> {
    const url = `${this.baseUrl}EliminarSolicitudes_puestos/${idsolicitud_puesto}`;
    return this.http.delete<any>(url);
  }
}
