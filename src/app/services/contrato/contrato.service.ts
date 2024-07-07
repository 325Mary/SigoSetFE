import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {  TokenValidationService} from "../../services/VertificacionUser/token-validation.service";

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private baseUrl = environment.apiUrl;


  private getHeaders(): HttpHeaders {
    const token = this.tokenValidationService.getToken(); // Obtén el token de autenticación
    console.log(token)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Agrega el token al encabezado de autorización
    });
  }
  constructor(private httpClient: HttpClient, private tokenValidationService: TokenValidationService) {}

  obtenerContratos(): Observable<any> {
    const url = `${this.baseUrl}listContratosEmpresas`;

    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  crearContrato(contratoData: any): Observable<any> {
    const url = `${this.baseUrl}crearContratoEmpresa`;
    return this.httpClient.post<any>(url, contratoData);
  }

  editarContrato(idContrato_empresa: number, nuevoContratoData: any): Observable<any> {
    const url = `${this.baseUrl}editContratoEmpresa/${idContrato_empresa}`;
    return this.httpClient.put<any>(url, nuevoContratoData);
  }

  eliminarContrato(idContrato_empresa: number): Observable<any> {
    const url = `${this.baseUrl}EliminarContratoEmpresa/${idContrato_empresa}`; 
    return this.httpClient.delete<any>(url);
  }

  obtenerURLPDF(contrato_pdf: string): Observable<Blob> {
    const url = `${this.baseUrl}uploadsPdf/${contrato_pdf}`;

    return this.httpClient.get(url, { responseType: 'blob' });
  }
  }
