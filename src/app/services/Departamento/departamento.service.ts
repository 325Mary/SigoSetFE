import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerDepartamentos(): Observable<any> {
    const url = `${this.baseUrl}listMDepartamento`;

    return this.httpClient.get<any>(url);
  }

  crearDepartamento(departamentoData: any): Observable<any> {
    const url = `${this.baseUrl}crearDepartamento`;
    return this.httpClient.post<any>(url, departamentoData);
  }

  editarDepartamento(iddepartamento: number, nuevoDepartamentoData: any): Observable<any> {
    const url = `${this.baseUrl}editDepartamento/${iddepartamento}`;
    return this.httpClient.put<any>(url, nuevoDepartamentoData);
  }

  eliminarDepartamento(iddepartamento: number): Observable<any> {
    const url = `${this.baseUrl}EliminarDepartamento/${iddepartamento}`; 
    return this.httpClient.delete<any>(url);
  }
  
}
