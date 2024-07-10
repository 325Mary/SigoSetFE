
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {  TokenValidationService} from "../../services/VertificacionUser/token-validation.service";


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = environment.apiUrl;
  private getHeaders(): HttpHeaders {
    const token = this.tokenValidationService.getToken(); // Obtén el token de autenticación
    // console.log(token)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Agrega el token al encabezado de autorización
    });
  }
  constructor(private httpClient: HttpClient, private tokenValidationService: TokenValidationService) {}

  obtenerEmpresas(): Observable<any> {
    const url = `${this.baseUrl}listEmpresa`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  crearEmpresa(empresaData: any): Observable<any> {
    const url = `${this.baseUrl}crearEmpresa`;
    return this.httpClient.post<any>(url, empresaData);
  }

  editarEmpresa(idempresa: number, nuevaEmpresaData: any): Observable<any> {
    const url = `${this.baseUrl}editEmpresa/${idempresa}`;
    return this.httpClient.put<any>(url, nuevaEmpresaData);
  }

  eliminarEmpresa(idempresa: number): Observable<any> {
    const url = `${this.baseUrl}EliminarEmpresa/${idempresa}`; // Usar "EliminarEmpresa" en lugar de "EliminarPerfil"
    return this.httpClient.delete<any>(url);
  }
  
}
