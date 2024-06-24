import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleContratoService {

  
 
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerDetallesContratos(): Observable<any> {
    const url = `${this.baseUrl}listDetalleContratos`;

    return this.httpClient.get<any>(url);
  }
  obtenerDetallesContratosPorNombre(nombreDetalleContrato: string): Observable<any> {
    const url = `${this.baseUrl}listDporNombre/${nombreDetalleContrato}`; // Ajuste aquí

    return this.httpClient.get<any>(url);
  }


  crearDetalleContrato(detalle_contratoData: any): Observable<any> {
    const url = `${this.baseUrl}crearDetalleContrato`;
    return this.httpClient.post<any>(url, detalle_contratoData);
  }

  editarDetalleContrato(iddetalle_contrato: number, nuevoDetalleContratoData: any): Observable<any> {
    const url = `${this.baseUrl}editDetalleContrato/${iddetalle_contrato}`;
    return this.httpClient.put<any>(url, nuevoDetalleContratoData);
  }

  eliminarDetalleContrato(iddetalle_contrato: number): Observable<any> {
    const url = `${this.baseUrl}EliminarDetalleContrato/${iddetalle_contrato}`; 
    return this.httpClient.delete<any>(url);
  }
  
  
}
