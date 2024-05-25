import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerObliXcentro(idempresa: number): Observable<any> {
    const url = `${this.baseUrl}listObligacionesxCentro/${idempresa}`;
    return this.httpClient.get<any>(url);
  }

}
