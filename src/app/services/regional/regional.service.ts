import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionalComponent } from '../../components/regional/regional.component';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  private baseUrl = environment.apiUrl; 

  constructor(private httpClient: HttpClient) { }

  getAllRegionals(): Observable<RegionalComponent[]> {
    return this.httpClient.get<RegionalComponent[]>(`${this.baseUrl}/listAllRegional`);
  }

  getRegionalById(id: number): Observable<RegionalComponent> {
    return this.httpClient.get<RegionalComponent>(`${this.baseUrl}/listRegionalByid/${id}`);
  }

  createRegional(regionalData: RegionalComponent): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/createRegional`, regionalData);
  }

  updateRegional(id: number, regionalData: RegionalComponent): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/editRegionalByid/${id}`, regionalData);
  }

  deleteRegionalById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/deleteRegionalByid/${id}`);
  }
}
