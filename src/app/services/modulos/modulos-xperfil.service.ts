import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulosXperfilService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerModulosXperfil(): Observable<any> {
    const url = `${this.baseUrl}obtenerModulosXperfil`;

    return this.httpClient.get<any>(url);
  }

  crearModuloXperfil(moduloxperfilData: any): Observable<any> {
    const url = `${this.baseUrl}crearModuloXperfil`;
    return this.httpClient.post<any>(url, moduloxperfilData);
  }


  editarModuloXperfil(idModulo: number, idPerfil: number, moduloxperfilData: any): Observable<any> {
    const url = `${this.baseUrl}editarModuloXperfil/${idModulo}/${idPerfil}`;
    return this.httpClient.put<any>(url, moduloxperfilData);
  }
  obtenerModulosPorPerfil(idperfil: number): Observable<any> {
    const url = `${this.baseUrl}obtenerModulosPorPerfil/${idperfil}`;
    return this.httpClient.get<any>(url);
  }
  
}
