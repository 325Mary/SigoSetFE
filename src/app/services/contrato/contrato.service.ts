import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private baseUrl = environment.apiUrl;



  constructor(private httpClient: HttpClient) {}

  obtenerContratos(): Observable<any> {
    const url = `${this.baseUrl}listContratosEmpresas`;

    return this.httpClient.get<any>(url);
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
    const url = `${this.baseUrl}EliminarContratoEmpresa/${idContrato_empresa}`; // Usar "EliminarEmpresa" en lugar de "EliminarPerfil"
    return this.httpClient.delete<any>(url);
  }
  }
