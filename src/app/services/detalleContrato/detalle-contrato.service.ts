import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {  TokenValidationService} from "../../services/VertificacionUser/token-validation.service";

@Injectable({
  providedIn: 'root'
})
export class DetalleContratoService {

  
  private getHeaders(): HttpHeaders {
    const token = this.tokenValidationService.getToken(); // Obtén el token de autenticación
    console.log(token)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Agrega el token al encabezado de autorización
    });
  }
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private tokenValidationService: TokenValidationService) {}

  obtenerDetallesContratos(): Observable<any> {
    const url = `${this.baseUrl}listDetalleContratos`;

    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
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
