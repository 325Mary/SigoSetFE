
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerPerfiles(): Observable<any> {
    const url = `${this.baseUrl}listPerfil`;

    return this.httpClient.get<any>(url);
  }
}
