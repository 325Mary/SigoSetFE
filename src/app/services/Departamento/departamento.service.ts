import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ListarDepartamentosComponent } from '../../views/Departamentos/listar-departamentos/listar-departamentos.component';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerDepartamentos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}listMDepartamento`);
  }

  crearDepartamento(departamentoData: any): Observable<any> {
    const url = `${this.baseUrl}crearDepartamento`;
    return this.httpClient.post<any>(url, departamentoData);
  }

  editarDepartamento(iddepartamento: number, DepartamentoData: ListarDepartamentosComponent): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}editDepartamento/${iddepartamento}`, DepartamentoData);

  }

  eliminarDepartamento(iddepartamento: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}EliminarDepartamento/${iddepartamento}`);
  }
  
}
