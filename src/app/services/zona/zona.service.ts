import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getZona(): Observable<any> {
    const url = `${this.baseUrl}zonas`;
    return this.httpClient.get<any>(url);
  }

  crearZona(zonaData: any): Observable<any> {
    const url = `${this.baseUrl}zona`;
    return this.httpClient.post<any>(url, zonaData);
  }

  editarZona(idzona: number, zonaData: any): Observable<any> {
    const url = `${this.baseUrl}zona/${idzona}`;
    return this.httpClient.put<any>(url, zonaData);
  }

  eliminarZona(idzona: number): Observable<any> {
    const url = `${this.baseUrl}zona/${idzona}`; 
    return this.httpClient.delete<any>(url);
  }
  
 
}
