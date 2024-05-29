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

  obtenerMunicipios(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}obtenerMunicipios`);
  }

  obtenerMunicipioPorId(idmunicipio: number): Observable<any> {
    const url = `${this.baseUrl}obtenerMunicipio/${idmunicipio}`;
    return this.httpClient.get<any>(url);
  }

  crearMunicipio(municipioData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}crearMunicipio`, municipioData);
  }

  editarMunicipio(idmunicipio: number, nuevoMunicipioData: any): Observable<any> {
    const url = `${this.baseUrl}editarMunicipio/${idmunicipio}`;
    return this.httpClient.put<any>(url, nuevoMunicipioData);
  }

  eliminarMunicipio(idmunicipio: number): Observable<any> {
    const url = `${this.baseUrl}eliminarMunicipio/${idmunicipio}`; 
    return this.httpClient.delete<any>(url);
  }

  buscarMunicipioPorNombre(nombre: string): Observable<any> {
    const url = `${this.baseUrl}buscarMunicipio?nombre=${nombre}`;
    return this.httpClient.get<any>(url);
  }
}
