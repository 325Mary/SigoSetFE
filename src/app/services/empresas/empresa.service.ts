
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerEmpresas(): Observable<any> {
    const url = `${this.baseUrl}listEmpresa`;

    return this.httpClient.get<any>(url);
  }

  crearEmpresa(empresaData: any): Observable<any> {
    const url = `${this.baseUrl}crearEmpresa`;
    return this.httpClient.post<any>(url, empresaData);
  }

  editarEmpresa(idempresa_vigilancia: number, nuevaEmpresaData: any): Observable<any> {
    const url = `${this.baseUrl}editEmpresa/${idempresa_vigilancia}`;
    return this.httpClient.put<any>(url, nuevaEmpresaData);
  }

  eliminarEmpresa(idempresa_vigilancia: number): Observable<any> {
    const url = `${this.baseUrl}EliminarEmpresa/${idempresa_vigilancia}`; // Usar "EliminarEmpresa" en lugar de "EliminarPerfil"
    return this.httpClient.delete<any>(url);
  }
  
}
