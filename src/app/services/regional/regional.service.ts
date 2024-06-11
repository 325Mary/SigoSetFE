import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CrearRegionalComponent} from '../../views/Regionales/crear-regional/crear-regional.component'
import { AdministrarRegionalComponent } from '../../views/Regionales/administrar-regional/administrar-regional.component';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  private baseUrl = environment.apiUrl; 

  constructor(private httpClient: HttpClient) { }

  getAllRegionals(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}listAllRegional`);
  }

  getRegionalById(id: number): Observable<AdministrarRegionalComponent> {
    return this.httpClient.get<AdministrarRegionalComponent>(`${this.baseUrl}listRegionalByid/${id}`);
  }

  createRegional(regionalData: CrearRegionalComponent): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}createRegional`, regionalData);
  }

  updateRegional(id: number, regionalData: AdministrarRegionalComponent): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}editRegionalByid/${id}`, regionalData);
  }

  deleteRegionalById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}deleteRegionalByid/${id}`);
  }
}
