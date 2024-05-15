import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

 
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerMnucipios(): Observable<any> {
    const url = `${this.baseUrl}listMunicipio`;

    return this.httpClient.get<any>(url);
  }

  crearMunicipio(municipioData: any): Observable<any> {
    const url = `${this.baseUrl}crearMunicipio`;
    return this.httpClient.post<any>(url, municipioData);
  }

  editarMunicipio(idmunicipio: number, nuevoMunicipioData: any): Observable<any> {
    const url = `${this.baseUrl}editMunicipio/${idmunicipio}`;
    return this.httpClient.put<any>(url, nuevoMunicipioData);
  }

  eliminarMunicipio(idmunicipio: number): Observable<any> {
    const url = `${this.baseUrl}EliminarMunicipio/${idmunicipio}`; 
    return this.httpClient.delete<any>(url);
  }
  
}
